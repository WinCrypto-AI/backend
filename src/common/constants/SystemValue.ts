import { NSAccount, NSChatGroup } from '../enums';

const GROUP_CODES = {
  group_free: 'group_free',
  group_200u: 'group_200u',
  group_2000u: 'group_2000u',
  chanel_og: 'chanel_og',
  channel_broker: 'channel_broker',
  group_free_vn: 'group_free_vn',
  group_200u_vn: 'group_200u_vn',
  group_2000u_vn: 'group_2000u_vn',
  chanel_og_vn: 'chanel_og_vn',
  channel_broker_vn: 'channel_broker_vn',
};

export const SystemValue = {
  GROUP_CODES,
  LIST_GROUP: [
    { code: GROUP_CODES.group_free, name: 'GROUP FREE GLOBAL', type: NSChatGroup.EType.GLOBAL },
    { code: GROUP_CODES.group_200u, name: 'GROUP 200U GLOBAL', type: NSChatGroup.EType.GLOBAL },
    { code: GROUP_CODES.group_2000u, name: 'GROUP 2000U GLOBAL', type: NSChatGroup.EType.GLOBAL },
    { code: GROUP_CODES.chanel_og, name: 'CHANEL OG GLOBAL', type: NSChatGroup.EType.GLOBAL },
    {
      code: GROUP_CODES.channel_broker,
      name: 'CHANNEL BROKER GLOBAL',
      type: NSChatGroup.EType.GLOBAL,
    },
    { code: GROUP_CODES.group_free_vn, name: 'GROUP FREE VN', type: NSChatGroup.EType.VN },
    { code: GROUP_CODES.group_200u_vn, name: 'GROUP 200U VN', type: NSChatGroup.EType.VN },
    { code: GROUP_CODES.group_2000u_vn, name: 'GROUP 2000U VN', type: NSChatGroup.EType.VN },
    { code: GROUP_CODES.chanel_og_vn, name: 'CHANEL OG VN', type: NSChatGroup.EType.VN },
    { code: GROUP_CODES.channel_broker_vn, name: 'CHANNEL BROKER VN', type: NSChatGroup.EType.VN },
  ],
  PAYMENT_CONFIG: {
    // [NSAccount.EType.FREE]: 0,
    [NSAccount.EType.PAID_200]: 0.1,
    [NSAccount.EType.PAID_2000]: 0.2,
  },
};
