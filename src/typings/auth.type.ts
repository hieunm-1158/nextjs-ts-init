import { SuccessResponse } from './axios.type';
import { IUser } from './user.type';

export type AuthResponse = SuccessResponse<{
  access_token: string;
  refresh_token: string;
  expires_refresh_token: number;
  expires: number;
  user: IUser;
}>;

export type RefreshTokenReponse = SuccessResponse<{ access_token: string }>;
