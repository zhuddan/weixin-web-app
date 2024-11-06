import { AuthButton } from './ui/auth-button';
export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}) {
  const searchParams = await props.searchParams
  console.log(searchParams)
  return (
    <div className='flex items-center justify-center h-[100vh]'>
      <AuthButton />
    </div>
  );
}

