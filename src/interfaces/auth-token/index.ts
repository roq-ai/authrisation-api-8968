import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AuthTokenInterface {
  id?: string;
  user_id: string;
  jwt_token: string;
  expires_at: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface AuthTokenGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  jwt_token?: string;
}
