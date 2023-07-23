import axios from 'axios';
  
export default function Navbar() {

  const handleLogout = async () => {
    const user = await axios.get("/api/auth/logout");

    console.log(user);
  };

  return (
    <nav className="w-full bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <span className="text-white text-2xl font-semibold">CS Club Attendance</span>
        <div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-4 transition-colors duration-300">
            Login
          </button>
          <button onClick={() => {handleLogout();}} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  )
}
