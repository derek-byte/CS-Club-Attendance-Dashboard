import axios from 'axios';
  
export default function Navbar() {

  const handleLogout = async () => {
    const user = await axios.get("/api/auth/logout");

    console.log(user);
  };

  return (
    <nav className="w-full flex justify-center absolute top-0 bg-background border-b-2 border-b-slate-700">
      <div className="max-w-6xl w-full px-4 py-6 flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">CS Club Attendance</h1>
        <div>
          <button className="">
            Login
          </button>
          <button onClick={() => {handleLogout();}} className="">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  )
}
