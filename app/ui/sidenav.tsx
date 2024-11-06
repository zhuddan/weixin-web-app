'use client'
import { ServerIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const items = [
  {
    href: '/client',
    label: '客户端授权',
    icon: ComputerDesktopIcon,
  },
  {
    href: '/server',
    label: '服务端授权',
    icon: ServerIcon,
  }
]

export function Sidenav() {
  const pathname = usePathname()
  return <nav className='grid grid-cols-2 gap-x-2 px-2 justify-center'>{
    items.map(item => {
      return (
        <Link href={item.href} key={item.href} className={
          clsx('bg-gray-100 flex-1 flex items-center rounded-md',
            pathname === item.href ? 'bg-blue-400 text-white' : ''
          )
        }>
          <item.icon className='size-9 p-2 '></item.icon>
          <span>{item.label}</span>
        </Link>
      )
    })
  }</nav>
}
