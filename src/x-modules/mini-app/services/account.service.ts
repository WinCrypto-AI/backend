import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { MoreThan } from 'typeorm';
import { BindRepo } from '~/@core/decorator';
import { BusinessException } from '~/@systems/exceptions';
import { I18nTranslations } from '~/assets/i18n.generated';
import { AccountRepo, CheckInRepo } from '~/repositories/primary';

@Injectable()
export class AccountService {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @BindRepo(AccountRepo)
  private accountRepo: AccountRepo;
  @BindRepo(CheckInRepo)
  private checkInRepo: CheckInRepo;

  async dailyCheckIn(accountId: string) {
    const now = new Date();
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Kiểm tra user đã check-in trong vòng 24h chưa
    const existingCheckIn = await this.checkInRepo.findOne({
      where: {
        accountId: accountId,
        checkInDate: MoreThan(twentyFourHoursAgo),
      },
    });

    if (existingCheckIn) {
      throw new BusinessException('You have already checked in within the last 24 hours');
    }

    // Lấy tài khoản
    const account = await this.accountRepo.findOne({ where: { id: accountId } });
    if (!account) {
      throw new BusinessException('Account not existed');
    }

    // Cộng điểm check-in
    account.balancePoint += 10;
    await this.accountRepo.save(account);

    // Lưu lịch sử check-in
    const newCheckIn = this.checkInRepo.create({
      accountId: accountId,
      checkInDate: now,
    });
    await this.checkInRepo.save(newCheckIn);

    return { message: 'Check-in successful', balancePoint: account.balancePoint };
  }

  async canCheckIn(accountId: string) {
    const now = new Date();
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Kiểm tra xem tài khoản có tồn tại không
    const account = await this.accountRepo.findOne({ where: { id: accountId } });
    if (!account) {
      throw new BusinessException('Account not existed');
    }

    // Kiểm tra user đã check-in trong vòng 24h chưa
    const existingCheckIn = await this.checkInRepo.findOne({
      where: {
        accountId: accountId,
        checkInDate: MoreThan(twentyFourHoursAgo),
      },
    });

    return {
      canCheckIn: !existingCheckIn, // Nếu không có bản ghi check-in trong 24h => có thể check-in
      message: existingCheckIn
        ? 'You have already checked in within the last 24 hours'
        : 'You can check in now',
    };
  }
}
