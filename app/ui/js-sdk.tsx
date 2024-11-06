"use client";
import { Button } from '@/app/ui/button';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../lib/api-request';
export function JsSdk() {
  useQuery({
    queryKey: ['JsSdk'],
    queryFn: () => {
      return apiRequest.get('/api/js-sdk')
    }
  })
  return (
    <Button>JsSdk</Button>
  )
}
