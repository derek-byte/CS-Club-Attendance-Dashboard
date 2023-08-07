import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

export default function User({ctx}) {
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
    };

    const handleLogOut = async () => {
      const user = await axios.get("/api/auth/logout");
      router.push("/login");
    }

    useEffect(() => {
        console.log(displayUsers());
        // handleGetUser();
        // console.log("DATA", data)
    }, []);

    const handleAttendanceSubmit = async () => {
      try {
        const options = {
          email: data.email,
          inputtedCode: code
        };
        const result = await axios.post("/api/verifyAttendance", options);
        console.log("RESULT", result)
      } catch (e) {
        console.log(e);
      }
    };

    const createAttendanceCode = () => {
      setCode(Math.floor(100000 + Math.random() * 900000).toString());
    }

    const handleCreateAttendance = async () => {
      createAttendanceCode();
      const result = await axios.post("/api/createAttendance", {attendanceCode: code});
      console.log("RESULT", result)
    };

    return (
      <div className="flex">
        <div className="flex items-center">
          <div className="p-8 mx-5 max-w-md w-full min-h-screen border-r-2 border-blue-600">
            <h2 className="text-2xl font-semibold mb-4">Welcome {data.first_name} {data.last_name}</h2>
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
        <div className="p-8">
          <button onClick={handleAttendanceSubmit}> Add Attendance </button>
          <button onClick={() => handleLogOut()}> Logout </button>
          <button onClick={handleCreateAttendance}> Create Attendance </button>
          <h1>
            {data.role === "admin" ? <div>Admin</div> : null}
              Sensitive Data
          </h1>
        </div>
      </div>
    );
}