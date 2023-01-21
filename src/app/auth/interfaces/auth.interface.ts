export interface IAuthResponse {
  ok: boolean;
  uid?: string;
  name?: string;
  token?: string;
  msg?: string;
}

export interface IUsuario{
  uid: string;
  name: string;
}
