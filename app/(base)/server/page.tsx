import { getWXOauth2Url } from '@/app/lib/wx';
import { redirect } from 'next/navigation';

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
  return <> {searchParams.code}</>
}
