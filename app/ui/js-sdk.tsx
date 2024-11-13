
"use client";
import { useQuery } from '@tanstack/react-query';
import { ApiError, apiRequest, } from '@/app/lib/api-request';
import { useEffect } from 'react';
import wx from 'weixin-js-sdk';
import { WxConfigOptions } from '@/app/types/wx';


export function JsSdk() {
  const { data: wxConfigOptions } = useQuery<WxConfigOptions, ApiError>({
    queryKey: ['JsSdk'],
    queryFn: async () => {
      const response = await apiRequest.get<{ data: WxConfigOptions }>('/api/js-sdk')
      return response.data.data
    },
  })
  useEffect(() => {
    let isConfiguring = false

    if (!isConfiguring && wxConfigOptions) {
      isConfiguring = true
      const _wxConfigOptions: WxConfigOptions = {
        ...wxConfigOptions,
        jsApiList: [
          'chooseImage'
        ]
      }
      console.log(_wxConfigOptions)
      wx.config({
        appId: wxConfigOptions.appId,
        timestamp: Number(wxConfigOptions.timestamp),
        nonceStr: wxConfigOptions.nonceStr,
        signature: wxConfigOptions.signature,
        jsApiList: ["chooseImage"]
      })
      wx.error(function (res) {
        console.log(res)
      })
      wx.ready(() => {
        console.log('ready')
      })
    }
    return () => {
      isConfiguring = true
    }
  }, [wxConfigOptions])

  return ('JsSdk')
}
