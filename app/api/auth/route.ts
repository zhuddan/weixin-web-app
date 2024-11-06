import { fetchAccessToken, fetchUserInfo, getWxConfig } from "@/app/lib/wx";
import { createErrorResponse } from "../utils";

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
      return createErrorResponse('[Failed to get access token]: ' + accessTokenData.errmsg, 401);
    }

    // 4. 获取用户信息
    const userInfo = await fetchUserInfo(accessTokenData);
    if ('errcode' in userInfo) {
      return createErrorResponse('[Failed to get user info]: ' + userInfo.errmsg, 500);
    }

    // 5. 返回用户信息
    return Response.json(userInfo);

  } catch (error) {
    console.error('WeChat authorization error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

