interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Owner', 'Team Member', 'Administrator', 'End Customer', 'Guest User'],
  tenantName: 'Organization',
  applicationName: 'authrisation api ',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read user information',
    'Read organization information',
    'Read profile information',
    'Read error responses',
  ],
  ownerAbilities: [
    'Manage users',
    'Manage organizations',
    'Manage profiles',
    'Manage authentication and error responses',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/486ff858-e1ad-457e-8d21-cbe6d975ff84',
};
