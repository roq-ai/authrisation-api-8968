import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PasswordManagementInterface {
  id?: string;
  user_id: string;
  password_reset_token?: string;
  password_reset_expires?: any;
  password_updated_at?: any;
  passwordless_token?: string;
  multi_factor_auth_token?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PasswordManagementGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  password_reset_token?: string;
  passwordless_token?: string;
  multi_factor_auth_token?: string;
}
