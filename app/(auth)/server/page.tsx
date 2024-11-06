import { getWXOauth2Url, getWxUserinfoByCode } from '@/app/lib/wx';
import { UserInfo } from '@/app/ui/userinfo';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '服务端授权'
}

export default async function Page(props: {
  searchParams?: Promise<{
    code?: string;
  }>;
}) {
  const searchParams = await props.searchParams
  if (!searchParams?.code) {
    const oauth2Url = getWXOauth2Url('http://127.0.0.1:3000/server')
    return redirect(oauth2Url.href)
  }
  const data = await getWxUserinfoByCode(searchParams?.code)
  return <>
    <UserInfo data={data} />
  </>
}
