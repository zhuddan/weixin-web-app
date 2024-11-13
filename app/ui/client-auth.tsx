"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "@/app/ui/button"
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiError, apiRequest } from "@/app/lib/api-request";
import { UserInfo } from "@/app/ui/userinfo";
import { ApiErrorMessage } from "@/app/ui/api-error-message";
import { } from '@heroicons/react/24/outline';
import { getWXOauth2Url } from "@/app/lib/wx";
import { WxUserInfo } from "@/app/types/wx";

export function ClientAuth() {
  const searchParams = useSearchParams()
  function handleClick() {
    window.location.replace(getWXOauth2Url(location.href).href)
  }
  const code = useMemo(() => {
    const param = new URLSearchParams(searchParams)
    return param.get('code')
  }, [searchParams])

  const { error, data } = useQuery<WxUserInfo, ApiError>({
    queryKey: ['auth', code],
    queryFn: async () => {
      const response = await apiRequest.post<WxUserInfo>('/api/auth', { code })
      return response.data
    },
    enabled: !!code
  })

  return (
    <div className="">
      <Button className="w-full" onClick={handleClick}>微信授权</Button>
      <ApiErrorMessage error={error} />
      <UserInfo data={data} />
    </div>
  )
}
