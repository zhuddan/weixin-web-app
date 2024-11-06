
export interface WxAccessTokenResponse {
  access_token: string;
  openid: string;
  errcode?: number;
  errmsg?: string;
}

export interface WxUserInfo {
  openid: string;
  nickname: string;
  sex: number;
  headimgurl: string;
  errcode?: number;
  errmsg?: string;
}
