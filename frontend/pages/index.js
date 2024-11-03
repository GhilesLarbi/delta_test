import { useRouter } from 'next/router';

export default function Home({}) {
  const router = useRouter();
  router.push('/home');
  return <div className="w-[100%] h-[100vh] "></div>;
}  