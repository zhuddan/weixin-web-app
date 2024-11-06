import type wx from 'weixin-js-sdk';

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


export interface WxConfigOptions {
  debug?: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: string; // 必填，公众号的唯一标识
  timestamp: number; // 必填，生成签名的时间戳
  nonceStr: string; // 必填，生成签名的随机串
  signature: string; // 必填，签名，见附录1
  jsApiList?: wx.jsApiList; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  openTagList?: wx.openTagList;
}
