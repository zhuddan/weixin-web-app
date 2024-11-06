/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWxUserinfoByCode } from "@/app/lib/wx";
import { createErrorResponse } from "../utils";

export async function POST(request: Request) {
  const { code } = await request.json();
  try {
    const userInfo = await getWxUserinfoByCode(code)
    return Response.json(userInfo);

  } catch (error) {
    console.error('WeChat authorization error:', error);
    return createErrorResponse((error as any).message, 401);
  }
}

