"use client";
import { useSearchParams, } from "next/navigation";
import { Button } from "./button"
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { WxUserInfo } from "../api/auth/route";
import { apiRequest } from "../api/api-request";


export function AuthButton() {
  const searchParams = useSearchParams()

  function handleClick() {
    const appId = process.env.NEXT_PUBLIC_WX_APP_ID
    const redirect_uri = encodeURIComponent('http://127.0.0.1:3000')
    const scope = 'snsapi_userinfo'
    const href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
    window.location.href = href
  }

  const code = useMemo(() => {
    const param = new URLSearchParams(searchParams)
    return param.get('code')
  }, [searchParams])
  const { error, data } = useQuery({
    queryKey: ['auth', code],
    queryFn: () => {
      return apiRequest.post<WxUserInfo>('/api/auth', {
        code
      })
    },
    enabled: !!code
  })
  if (error) {
    return <Button onClick={handleClick}>客户端授权</Button>
  }
  return <div>
    <Button onClick={handleClick}>客户端授权</Button>
    <pre className="w-[100vw] whitespace-pre-wrap">
      <code lang="json">{data && JSON.stringify(data, null, 2)}</code>
    </pre>
  </div>
}
