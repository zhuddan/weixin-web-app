import { generateRandomString } from "@/app/lib/data";
import { fetchBaseAccessToken, getJsApiTicket, getWxConfig } from "@/app/lib/wx";
import { WxConfigOptions } from "@/app/types/wx";
import crypto from 'crypto';
import { NextRequest } from "next/server";
let access_token: string | undefined = undefined
let jsapi_ticket: string | undefined = undefined
// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const slug = (await params).id ?? 'no-id'
  const searchParams = request.nextUrl.searchParams
  console.log(searchParams)
  access_token ??= (await fetchBaseAccessToken())?.access_token
  jsapi_ticket ??= (await getJsApiTicket(access_token))?.ticket
  const noncestr = generateRandomString(16)
  const timestamp = Math.floor(Date.now() / 1000)
  const url = 'http://dev.local/js-sdk'
  const sortedParams = ([
    ['jsapi_ticket', jsapi_ticket],
    ['timestamp', timestamp + ''],
    ['url', url],
    ['noncestr', noncestr],
  ]).sort((a, b) => a[0].localeCompare(b[0]))


  const signatureString = decodeURIComponent(new URLSearchParams(sortedParams).toString())

  const signature = crypto.createHash('sha1').update(signatureString).digest('hex');
  const { appId } = getWxConfig()
  const _wxConfigOptions: WxConfigOptions = {
    debug: true,
    signature,
    nonceStr: noncestr,
    timestamp,
    appId,
    jsApiList: [],
  }


  return Response.json({
    data: _wxConfigOptions,
    urls: sortedParams,
    signatureString,
    slug

  })
}

