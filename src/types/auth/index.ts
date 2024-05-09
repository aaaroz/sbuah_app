import type { TGenericResponse } from "../common";

export type TRegisterRequest = {
  username: string;
  password: string;
  confirm_password: string;
};

export type TLoginRequest = {
  username: string;
  password: string;
};

export type TRegisterResponse = TGenericResponse<
  string,
  {
    id: string;
    username: string;
  }
>;

export type TLoginResponse = TGenericResponse<
  string,
  {
    user: {
      id: string;
      username: string;
    };
    token: string;
  }
>;
