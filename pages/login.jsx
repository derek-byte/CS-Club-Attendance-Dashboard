import React, {useState} from "react";
import { useRouter } from "next/router";

import axios from 'axios';
import "tailwindcss/tailwind.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [logIn, setLogin] = useState(true);

    const router = useRouter();
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        console.log("SUBMIT")
        e.preventDefault();

        const credentials = { email, password };

        try {
            const { data } = await axios.post("/api/auth/login", credentials)
            console.log(data.status);

            if (data.status === 200) {
                router.push("/dashboard/user");
            }
            // handleGetUser();
        } catch (err) {
            console.log(err);
        }
    }

    return (
    <div className="height-full flex justify-center items-center flex-col">
        <div className='min-w-[30rem]'>

            <div className='min-w-[30rem] flex'>
                <button className={`flex-1 !rounded-b-none !rounded-tr-none rounded-tl-md ${logIn ? "" : "contrast"}`} onClick={() => setLogin(true)}>Log In</button>
                <button className={`flex-1 !rounded-b-none !rounded-tl-none rounded-tr-md ${logIn ? "contrast" : ""}`} onClick={() => setLogin(false)}>Register</button>
            </div>

            {logIn ? <form className="border-2 border-backgroundaccent rounded-md p-12 border-t-transparent rounded-t-none" onSubmit={handleSubmit}>
                <h2 className='text-2xl'>Welcome back</h2>
                <p className='text-gray-400 mt-2'>Log in to your account</p>

                <input 
                    type='email'
                    placeholder="email"
                    className='w-full mt-8'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type='password'
                    placeholder="password"
                    className='w-full mt-2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className='w-full mt-8' type='submit'>
                    Log In
                </button>
            </form> : 
            
            <form className="border-2 border-backgroundaccent rounded-md p-12 border-t-transparent rounded-t-none" onSubmit={handleSubmit}>
                <h2 className='text-2xl'>Welcome to CS Club</h2>
                <p className='text-gray-400 mt-2'>Register a new account</p>

                <input 
                    type='email'
                    placeholder="email"
                    className='w-full mt-8'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type='password'
                    placeholder="password"
                    className='w-full mt-2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className='w-full mt-8' type='submit'>
                    Register
                </button>
            </form>
            }
        </div>
    </div>
    );
}