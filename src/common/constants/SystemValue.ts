import { NSAccount } from '../enums';

export const SystemValue = {
  GROUP_CODES: [
    { code: 'group_free', name: 'GROUP FREE' },
    { code: 'group_200u', name: 'GROUP 200U' },
    { code: 'chanel_og', name: 'CHANEL OG' },
    { code: 'channel_broker', name: 'CHANNEL BROKER' },
  ],
  PAYMENT_CONFIG: {
    // [NSAccount.EType.FREE]: 0,
    [NSAccount.EType.PAID_200]: 0.1,
    [NSAccount.EType.PAID_2000]: 0.2,
  },
};
