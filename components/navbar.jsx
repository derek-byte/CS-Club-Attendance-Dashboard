import axios from 'axios';
import { useRouter } from 'next/router';

export default function Navbar() {

  const handleLogout = async () => {
    const user = await axios.get("/api/auth/logout");
    router.push("/login");
  };

  const router = useRouter();

  return (
    <nav className="w-full flex justify-center sticky top-0 bg-background border-b-2 border-b-slate-700">
      <div className="max-w-6xl w-full px-4 py-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">CS Club Attendance</h1>
        <div className='flex items-center gap-2'>
          {router.pathname !== "/dashboard/user" ? 
            <button onClick={() => router.push('/login')}>
              Log In
            </button> : 
            <button onClick={handleLogout}>
              Log Out
            </button>
          }
        </div>
      </div>
    </nav>
  )
}
