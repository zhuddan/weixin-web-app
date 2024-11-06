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
    appId: process.env.NEXT_PUBLIC_WX_APP_ID!,
    appSecret: process.env.NEXT_PUBLIC_WX_APP_SECRET!,
  };
}

export async function fetchAuthAccessToken(
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


export async function getWxUserinfoByCode(code: string) {
  if (!code) {
    throw new Error('Missing code parameter')
  }
  // 2. 验证环境变量
  const { appId, appSecret } = getWxConfig();

  const accessTokenData = await fetchAuthAccessToken(appId, appSecret, code);
  if ('errcode' in accessTokenData) {
    throw new Error('[Failed to get access token]: ' + accessTokenData.errmsg);
  }
  // 4. 获取用户信息
  const userInfo = await fetchUserInfo(accessTokenData);
  if ('errcode' in userInfo) {
    throw new Error('[Failed to get user info]: ' + userInfo.errmsg,);
  }
  return userInfo
}


/**
 * @see https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
 */
export async function fetchBaseAccessToken() {
  const { appId, appSecret } = getWxConfig();
  const url = new URL('https://api.weixin.qq.com/cgi-bin/token')
  url.searchParams.set('grant_type', 'client_credential')
  url.searchParams.set('appid', appId)
  url.searchParams.set('secret', appSecret)
  const data = await (await fetch(url)).json()
  return data as {
    access_token: string;
    expires_in: number;
  }
}


export async function getJsApiTicket(access_token: string) {
  const url = new URL('https://api.weixin.qq.com/cgi-bin/ticket/getticket')
  url.searchParams.set('access_token', access_token)
  url.searchParams.set('type', 'jsapi')
  const data = await (await fetch(url)).json()
  return data as {
    errcode: number;
    errmsg: string;
    ticket: string;
    expires_in: number;
  }
}
