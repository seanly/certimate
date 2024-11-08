export type Setting<T> = {
  id?: string;
  name?: string;
  content?: T;
};

export type EmailsSetting = {
  emails: string[];
};

export type NotifyTemplates = {
  notifyTemplates: NotifyTemplate[];
};

export type NotifyTemplate = {
  title: string;
  content: string;
};

export type NotifyChannels = {
  dingtalk?: NotifyChannel;
  lark?: NotifyChannel;
  telegram?: NotifyChannel;
  webhook?: NotifyChannel;
  serverchan?: NotifyChannel;
  mail?: NotifyChannelMail;
  bark?: NotifyChannelBark;
};

export type NotifyChannel =
  | NotifyChannelDingTalk
  | NotifyChannelLark
  | NotifyChannelTelegram
  | NotifyChannelWebhook
  | NotifyChannelServerChan
  | NotifyChannelMail
  | NotifyChannelBark;

export type NotifyChannelDingTalk = {
  accessToken: string;
  secret: string;
  enabled: boolean;
};

export type NotifyChannelLark = {
  webhookUrl: string;
  enabled: boolean;
};

export type NotifyChannelTelegram = {
  apiToken: string;
  chatId: string;
  enabled: boolean;
};

export type NotifyChannelWebhook = {
  url: string;
  enabled: boolean;
};

export type NotifyChannelServerChan = {
  url: string;
  enabled: boolean;
};

export type NotifyChannelMail = {
  senderAddress: string;
  receiverAddresses: string;
  smtpHostAddr: string;
  smtpHostPort: string;
  username: string;
  password: string;
  enabled: boolean;
};

export type NotifyChannelBark = {
  deviceKey: string;
  serverUrl: string;
  enabled: boolean;
};

export const defaultNotifyTemplate: NotifyTemplate = {
  title: "您有 {COUNT} 张证书即将过期",
  content: "有 {COUNT} 张证书即将过期，域名分别为 {DOMAINS}，请保持关注！",
};

export type SSLProvider = "letsencrypt" | "zerossl" | "gts";

export type SSLProviderSetting = {
  provider: SSLProvider;
  config: {
    [key: string]: {
      [key: string]: string;
    };
  };
};
