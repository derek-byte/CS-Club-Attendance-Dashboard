import { withRouter, useRouter } from 'next/router'
import { useState, useEffect } from "react";
import axios from 'axios';

function Home({ctx}) {
    const router = useRouter();

    const [data, setData] = useState({});
    const [code, setCode] = useState("");
    const [adminAlert, setAdminAlert] = useState(['', '']); 
    const [alert, setAlert] = useState(['', '']); 

    const [inputCode, setInputCode] = useState("")

    const displayUsers = async () => {
        try {
          const fetchedUsers = await fetch('/api/user').then((res) =>
            res.json()
          );
          
        //   setUsersResults(fetchedUsers);
          console.log(fetchedUsers)
          setData(fetchedUsers)
      
        } catch (error) {
          console.log(error);
        }
    };

    const handleGetUser = async () => {
        const user = await axios.get("/api/user");
  
        setData(user.data);
        // setCode(user?.data?.currAttendanceCode)
    };

    const handleLogOut = async () => {
      const user = await axios.get("/api/auth/logout");
      router.push("/login");
    }

    useEffect(() => {
      handleGetUser();
    }, [alert, adminAlert]);

    const handleAttendanceSubmit = async (e) => {
      e.preventDefault();
      try {
        const options = {
          email: data?.email,
          inputtedCode: inputCode
        };
        const result = await axios.post("/api/attendance/verifyAttendance", options);
        setAlert(["Success", 'success']);
      } catch (e) {
        console.log(e);
        setAlert([e?.response?.data?.message, 'error'])
      }
    };

    const handleCreateRandomAttendanceCode = async (e) => {
      try {
        e.preventDefault();
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCode(newCode);
        const result = await axios.post("/api/attendance/createAttendance", {attendanceCode: newCode});
        setAdminAlert(["Success", 'success']);
      } catch (e) {
        setAdminAlert([e?.response?.data?.message, 'error'])
      }
    }

    const handleCreateAttendanceCode = async (e) => {
      try {
        e.preventDefault();
        const result = await axios.post("/api/attendance/createAttendance", {attendanceCode: code});
        setAdminAlert(["Success", 'success']);
      } catch (e) {
        setAdminAlert([e?.response?.data?.message, 'error'])
      }
    };

    return (
      <div className="flex flex-wrap">
        <div className="flex md:w-1/4 sm:min-h-screen md:border-r-2 md:border-slate-700">
          <div className="p-8 mx-1 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Welcome {data?.first_name} {data?.last_name} 👋</h2>
            <div className="space-y-4">
              <p>
                <strong>Email:</strong> {data?.email}
              </p>
              <p>
                <strong>Grade:</strong> {data?.grade}
              </p>
              <p>
                <strong>Attendance Score:</strong> {data?.attendance}
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-3/4">
          {data.role === 'student' || data.role === 'admin' ?
          <div className='p-8'>
            <p>Hello. You are a student. Welcome to CS Club! Here's where you'll be inputting the attendance code each week after the club meeting.</p>
            <h2 className='mt-8 text-xl font-bold'>Input Attendance Code</h2>
            <form onSubmit={handleAttendanceSubmit} className='mt-4'>
              <input type='number' placeholder='code' value={inputCode} onChange={e => setInputCode(parseInt(e.target.value))} required></input><br/>
              <button className='mt-2' type='submit'> Submit attendance </button>
            </form>
            {(alert[0] !== '' && alert[1] !== '') && (
                <div
                    className={`${alert[1]} p-2 rounded-md mt-2 flex items-center gap-2 w-fit	`}
                >
                    {alert[0]}
                </div>
            )}
          </div> : null}
          {data.role === 'admin' && 
            <div className="p-8 border-t-2 border-slate-700">
              <p>Hello. You are an admin, which means you have the ability to edit the attendance code.</p>
              <h1 className="mt-8 text-2xl font-bold">Edit Attendance</h1>
              <br/><p>The current attendance code is: {data.attendanceCode}</p>
              <h2 className='mt-8 text-xl font-bold'>Random Attendance Code</h2>
              <button onClick={handleCreateRandomAttendanceCode} className="mt-4"> Create randomly generated attendance code </button>
              <h2 className='mt-8 text-xl font-bold'>Custom Attendance Code</h2>
              <form onSubmit={handleCreateAttendanceCode} className='mt-4'>
                <input type='number' placeholder='code' value={code} onChange={e => setCode(parseInt(e.target.value))} required></input><br/>
                {(adminAlert[0] !== '' && adminAlert[1] !== '') && (
                    <div
                        className={`${adminAlert[1]} p-2 rounded-md mt-2 flex items-center gap-2 w-fit	`}
                    >
                        {adminAlert[0]}
                    </div>
                )}
                <button className='mt-2' type='submit'> Add custom attendance code </button>
              </form>
            </div>
          }
        </div>
      </div>
    );
}
export default withRouter(Home)
