import { Injectable } from '@nestjs/common';
import { Address, CommonMessageInfoInternal, fromNano, TonClient, Transaction } from '@ton/ton';
import { configEnv } from '~/@config/env';
import { BindRepo, DefTransaction } from '~/@core/decorator';
import { BusinessException } from '~/@systems/exceptions';
import { SystemValue } from '~/common/constants';
import { NSAccount } from '~/common/enums';
import { AccountRepo, PaymentTransactionRepo } from '~/repositories/primary';

class TxOnChainInput {
  txHash: string;
  // deposit: fromAddress = user wallet, withdraw: fromAddress = GAME_WALLET
  fromAddress: string;
  // deposit: toAddress = GAME_WALLET, withdraw: toAddress = user wallet
  toAddress: string;
  value: number;
  token: string;
  decimal: number;
  onChainTimestamp: number;
}
const { TON_CHAIN_CONFIG } = configEnv();
const { apiKey, endpoint, ROOT_WALLET } = TON_CHAIN_CONFIG;
const MULTIPLIER_VALUE = 100;

const floorValue = (value: number) => {
  return Math.round(value * MULTIPLIER_VALUE) / MULTIPLIER_VALUE;
};
const tonClient = new TonClient({
  endpoint,
  apiKey,
});
const pipeTonTxOnChain = (rawTx: Transaction): TxOnChainInput => {
  const { type, ihrFee, value, src, dest, createdAt, createdLt } = rawTx.inMessage
    ?.info as CommonMessageInfoInternal;
  return {
    txHash: rawTx.hash().toString('hex'),
    fromAddress: src.toRawString(),
    toAddress: dest.toRawString(),
    value: floorValue(Number(fromNano(value.coins))),
    token: 'TON',
    decimal: 9,
    onChainTimestamp: createdAt,
  };
};

@Injectable()
export class PaymentService {
  @BindRepo(AccountRepo)
  private accountRepo: AccountRepo;

  @BindRepo(PaymentTransactionRepo)
  private paymentTransactionRepo: PaymentTransactionRepo;

  async listenDepositTon(limit = 100) {
    const rawTxs = await tonClient.getTransactions(Address.parse(ROOT_WALLET), {
      limit,
      archival: true,
    });
    const inboundTxs = rawTxs
      .filter(v => v.inMessage?.info?.type === 'internal')
      .map(pipeTonTxOnChain)
      .filter(v => v.value > 0);
    for (const tx of inboundTxs) {
      this.depositOnChain(tx).catch(err => console.error(err));
    }
    return inboundTxs;
  }

  @DefTransaction()
  async depositOnChain(input: TxOnChainInput) {
    const { txHash, fromAddress, toAddress, value, token, decimal, onChainTimestamp } = input;
    if (!txHash) {
      throw new BusinessException('Empty txHash');
    }
    if (value <= 0) {
      throw new BusinessException('Empty value');
    }
    if (toAddress !== Address.parse(ROOT_WALLET).toRawString()) {
      throw new BusinessException('Input not found');
    }
    const paymentTx = await this.paymentTransactionRepo.findOne({
      where: {
        txHash,
      },
    });
    if (paymentTx) {
      throw new BusinessException(`The txHash: ${txHash}  already exists`);
    }

    const account = await this.accountRepo.findOne({
      walletAddress: fromAddress,
    });

    if (!account) {
      throw new BusinessException(
        `Account not existed system ,fromAddress: ${fromAddress}, value: ${value}`,
      );
    }

    const tx = await this.paymentTransactionRepo.save({
      accountId: account.id,
      txHash,
      fromAddress,
      toAddress,
      value,
      token,
      decimal,
      onChainTimestamp,
    });

    if (account.type === NSAccount.EType.PAID_2000) {
      return tx;
    }
    if (account.type === NSAccount.EType.PAID_200) {
      const { PAYMENT_CONFIG } = SystemValue;
      if (value <= PAYMENT_CONFIG[NSAccount.EType.PAID_200]) {
        return tx;
      }
      if (value === PAYMENT_CONFIG[NSAccount.EType.PAID_2000]) {
        account.type = NSAccount.EType.PAID_2000;
        await this.accountRepo.save(account);
        return tx;
      }
    }
    const { PAYMENT_CONFIG } = SystemValue;
    if (value === PAYMENT_CONFIG[NSAccount.EType.PAID_200]) {
      account.type = NSAccount.EType.PAID_200;
      await this.accountRepo.save(account);
      return tx;
    }
    if (value === PAYMENT_CONFIG[NSAccount.EType.PAID_2000]) {
      account.type = NSAccount.EType.PAID_2000;
      await this.accountRepo.save(account);
      return tx;
    }
    return tx;
  }
  @DefTransaction()
  async depositOnChainByHash({ txHash }: { txHash: string }) {
    const rawTxs = await tonClient.getTransactions(Address.parse(ROOT_WALLET), {
      limit: 100,
      archival: true,
      hash: txHash,
    });
    if (!rawTxs || rawTxs.length <= 0) {
      throw new BusinessException('Empty tx');
    }
    const rawTx = rawTxs[0];
    const tx = await this.depositOnChain(pipeTonTxOnChain(rawTx));
    return tx;
  }
}
