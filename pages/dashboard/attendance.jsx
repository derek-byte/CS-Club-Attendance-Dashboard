import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

export default function Attendance({ctx}) {
    const router = useRouter();
    console.log("ROUTER", router)
    // const data = ctx.res.getHeader('X-HEADER');
    // ctx.res.removeHeader('X-HEADER');

    console.log("DATA", ctx)
    const [data, setData] = useState({});
    const [code, setCode] = useState("");

    const displayUsers = async () => {
        try {
          console.log('FETCHING DOCUMENTS');
          const fetchedUsers = await fetch('/api/user').then((res) =>
            res.json()
          );
          console.log('FETCHED DOCUMENTS');
          
        //   setUsersResults(fetchedUsers);
          console.log(fetchedUsers)
          setData(fetchedUsers)
      
        } catch (error) {
          console.log(error);
        }
    };

    const handleGetUser = async () => {
        const user = await axios.get("/api/user");
    
        console.log("HI", user);

        setData(user.data);
    };

    const handleLogOut = async () => {
      const user = await axios.get("/api/auth/logout");
      router.push("/login");
    }

    useEffect(() => {
      handleGetUser();
    }, []);

    const handleAttendanceSubmit = async () => {
      try {
        const options = {
          email: data.email,
          inputtedCode: code
        };
        const result = await axios.post("/api/attendance/verifyAttendance", options);
        console.log("RESULT", result)
      } catch (e) {
        console.log(e);
      }
    };

    const handleCreateRandomAttendanceCode = async (e) => {
      e.preventDefault();
      setCode(Math.floor(100000 + Math.random() * 900000).toString());
      const result = await axios.post("/api/attendance/createAttendance", {attendanceCode: code});
      console.log("RESULT", result)
    }

    const handleCreateAttendanceCode = async (e) => {
      e.preventDefault();
      const result = await axios.post("/api/attendance/createAttendance", {attendanceCode: code});
      console.log("RESULT", result)
    };

    console.log(data.role, data.role === 'admin')

    return (
      <div className="flex">
        <div className="flex items-center">
          <div className="p-8 mx-1 max-w-md w-full min-h-screen border-r-2 border-slate-700">
            <h2 className="text-2xl font-semibold mb-4">Welcome {data.first_name} {data.last_name} 👋</h2>
            <div className="space-y-4">
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Grade:</strong> {data.grade}
              </p>
              <p>
                <strong>Attendance Score:</strong> {data.attendance}
              </p>
            </div>
          </div>
        </div>
        {data.role === 'admin' && 
        <div className="p-8">
          <p>Hello. You are an admin, which means you have the ability to edit the attendance code.</p>
          <h1 className="mt-8 text-2xl font-bold">Edit Attendance</h1>
          <br/><p>The current attendance code is: {code}</p>
          <h2 className='mt-8 text-xl font-bold'>Random Attendance Code</h2>
          <button onClick={handleCreateRandomAttendanceCode} className="mt-4"> Create randomly generated attendance code </button>
          <h2 className='mt-8 text-xl font-bold'>Custom Attendance Code</h2>
          <form onSubmit={handleCreateAttendanceCode} className='mt-4'>
            <input type='number' placeholder='code' value={code} onChange={e => setCode(parseInt(e.target.value))} required></input><br/>
            <button onClick={handleAttendanceSubmit} className='mt-2' type='submit'> Add custom attendance code </button>
          </form>
          <button onClick={() => handleLogOut()} className='mt-8'> Logout </button>
        </div>
        }
      </div>
    );
}