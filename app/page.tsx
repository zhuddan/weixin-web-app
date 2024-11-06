import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: '微信web应用',
  description: '微信web应用',
}

export default function Page() {
  return (
    <div className='w-full'>
      <Link className={`w-full  p-2 border-b  border-t items-center flex justify-between`} href={'./client'}>
        <span>客户端授权</span>
        <ChevronRightIcon className="size-6 text-gray-500" />
      </Link>
    </div>
  );
}

