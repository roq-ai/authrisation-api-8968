import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ErrorResponseInterface {
  id?: string;
  user_id: string;
  error_code: number;
  error_message: string;
  occurred_at?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ErrorResponseGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  error_message?: string;
}
