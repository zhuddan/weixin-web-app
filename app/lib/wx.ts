import { WxAccessTokenResponse, WxUserInfo } from "../types/wx"

export function getWXOauth2Url(redirect_uri: string) {
  const appId = process.env.NEXT_PUBLIC_WX_APP_ID
  const scope = 'snsapi_userinfo'
  const oauth2Url = new URL('https://open.weixin.qq.com/connect/oauth2/authorize')
  oauth2Url.searchParams.set('appid', appId!)
  oauth2Url.searchParams.set('redirect_uri', redirect_uri)
  oauth2Url.searchParams.set('response_type', 'code')
  oauth2Url.searchParams.set('scope', scope)
  oauth2Url.searchParams.set('state', "zddz")
  oauth2Url.hash = '#wechat_redirect'
  return oauth2Url
}



export function getWxConfig() {
  return {
    appId: process.env.NEXT_PUBLIC_WX_APP_ID,
    appSecret: process.env.NEXT_PUBLIC_WX_APP_SECRET,
  };
}

export async function fetchAccessToken(
  appId: string,
  appSecret: string,
  code: string
): Promise<WxAccessTokenResponse> {
  const accessTokenUrl = new URL('https://api.weixin.qq.com/sns/oauth2/access_token');
  accessTokenUrl.searchParams.set('appid', appId);
  accessTokenUrl.searchParams.set('secret', appSecret);
  accessTokenUrl.searchParams.set('code', code);
  accessTokenUrl.searchParams.set('grant_type', 'authorization_code');
  const response = await fetch(accessTokenUrl.toString());
  return response.json();
}

export async function fetchUserInfo(
  { access_token, openid }: WxAccessTokenResponse
): Promise<WxUserInfo> {
  const userInfoUrl = new URL('https://api.weixin.qq.com/sns/userinfo');
  userInfoUrl.searchParams.set('access_token', access_token);
  userInfoUrl.searchParams.set('openid', openid);
  userInfoUrl.searchParams.set('lang', 'zh_CN');

  const response = await fetch(userInfoUrl.toString());
  return response.json();
}

