export function UserInfo({ data }: { data?: object }) {
  if (!data) return null
  return <>
    <p className="my-2">用户信息</p>
    <pre className="w-full whitespace-pre-wrap border box-border rounded p-2">
      <code lang="json" className="break-all">{data && JSON.stringify(data, null, 2)}</code>
    </pre>
  </>
}
