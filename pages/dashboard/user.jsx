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
      const result = await axios.post("/api/attendance");
      console.log("RESULT", result)
    };

    return (
      <div>
        <button onClick={handleAttendanceSubmit}> Add Attendance </button>
        <button onClick={() => handleLogOut()}> Logout </button>
        <h1>
          {data.role === "admin" ? <div>Admin</div> : null}
            Sensitive Data
        </h1>
      </div>
    );
}