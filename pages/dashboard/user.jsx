import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

export default function User({ctx}) {
    const router = useRouter();
    console.log("ROUTER", router)
    // const data = ctx.res.getHeader('X-HEADER');
    // ctx.res.removeHeader('X-HEADER');

    console.log("DATA", ctx)

    const displayUsers = async () => {
        try {
          console.log('FETCHING DOCUMENTS');
          const fetchedUsers = await fetch('/api/user').then((res) =>
            res.json()
          );
          console.log('FETCHED DOCUMENTS');
          
        //   setUsersResults(fetchedUsers);
          console.log(fetchedUsers)
      
        } catch (error) {
          console.log(error);
        }
    };

    const handleGetUser = async () => {
        const user = await axios.get("/api/user");
    
        console.log("HI", user);
    };

    useEffect(() => {
        console.log(displayUsers());
        // handleGetUser();
        // console.log("DATA", data)
    }, [])

    return (
        <h1>
            Sensitive Data
        </h1>
    );
}