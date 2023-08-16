export enum AccountType {
  CLIENT = 'client',
  TG_BOT = 'tg_bot',
  SHOP = 'shop',
}

export const AccountTypeLabels = {
  [AccountType.CLIENT]: 'Client',
  [AccountType.SHOP]: 'Shop',
  [AccountType.TG_BOT]: 'Bot'
}