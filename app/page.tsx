import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { getUserTest } from "./lib/data";

export const metadata = {
  title: '微信web应用',
  description: '微信web应用',
}

const links = [
  {
    label: '微信授权',
    href: '/client'
  },
  {
    label: '微信js-sdk',
    href: '/js-sdk'
  },
]

export default async function Page() {
  const user = await getUserTest()
  return (
    <>
      <div className='w-full'>
        {
          links.map(e => {
            return <Link
              key={e.href}
              className={`w-full  p-2 border-b  border-t items-center flex justify-between`} href={e.href}
            >
              <span>{e.label}</span> <ChevronRightIcon className="size-4 text-gray-400" />
            </Link>
          })
        }
      </div>

      <pre>
        <code>
          {JSON.stringify(user, null, 2)}
        </code>
      </pre>
    </>
  );
}
