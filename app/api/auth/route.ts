interface WxAccessTokenResponse {
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

export async function POST(request: Request) {

  const { code } = await request.json();

  try {
    // 1. 获取并验证请求参数
    if (!code) {
      return createErrorResponse('Missing code parameter', 400);
    }

    // 2. 验证环境变量
    const { appId, appSecret } = getWxConfig();
    if (!appId || !appSecret) {
      return createErrorResponse('Missing WeChat configuration', 500);
    }

    // 3. 获取访问令牌
    const accessTokenData = await fetchAccessToken(appId, appSecret, code);
    if ('errcode' in accessTokenData) {
      return createErrorResponse(accessTokenData.errmsg || 'Failed to get access token', 401);
    }

    // const ticket = await fetchJsApiTicket(accessTokenData.access_token);
    // if (ticket.errcode) {
    //   return createErrorResponse(accessTokenData.errmsg || 'Failed to get access token', 401);
    // }


    // 4. 获取用户信息
    const userInfo = await fetchUserInfo(accessTokenData);
    if ('errcode' in userInfo) {
      return createErrorResponse(userInfo.errmsg || 'Failed to get user info', 401);
    }

    // 5. 返回用户信息
    return Response.json(userInfo);

  } catch (error) {
    console.error('WeChat authorization error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}


function getWxConfig() {
  return {
    appId: process.env.NEXT_PUBLIC_WX_APP_ID,
    appSecret: process.env.NEXT_PUBLIC_WX_APP_SECRET,
  };
}

async function fetchAccessToken(
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

async function fetchUserInfo(
  { access_token, openid }: WxAccessTokenResponse
): Promise<WxUserInfo> {
  const userInfoUrl = new URL('https://api.weixin.qq.com/sns/userinfo');
  userInfoUrl.searchParams.set('access_token', access_token);
  userInfoUrl.searchParams.set('openid', openid);
  userInfoUrl.searchParams.set('lang', 'zh_CN');

  const response = await fetch(userInfoUrl.toString());
  return response.json();
}


// interface RootObject {
//   errcode: number;
//   errmsg: string;
//   ticket: string;
//   expires_in: number;
// }

// async function fetchJsApiTicket(access_token: string): Promise<RootObject> {
//   const userInfoUrl = new URL('https://api.weixin.qq.com/cgi-bin/ticket/getticket');
//   userInfoUrl.searchParams.set('access_token', access_token);
//   userInfoUrl.searchParams.set('type', 'jsapi');
//   const response = await fetch(userInfoUrl.toString());
//   return response.json();
// }

function createErrorResponse(message: string, status: number) {
  return Response.json(
    { error: message },
    { status }
  );
}
