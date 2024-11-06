import { Sidenav } from '../ui/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidenav></Sidenav>
      </div>
      <div className="flex-grow p-2 md:overflow-y-auto ">
        <div className="bg-gray-50 size-full p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
