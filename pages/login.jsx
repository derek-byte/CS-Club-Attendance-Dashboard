import React, { useState } from "react";
import { useRouter } from "next/router";

import axios from 'axios';
import "tailwindcss/tailwind.css";

import { AiOutlineWarning } from 'react-icons/ai';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [grade, setGrade] = useState("");

    const [logIn, setLogin] = useState(true);

    const [alert, setAlert] = useState(['', '', <></>]); // argument one is text, argument two is className (warning/success/error), argument three is icon

    const router = useRouter();
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = { email, password };

        if (parseInt(grade) < 9 || parseInt(grade) > 13) { 
            setAlert(['Grade must be between 9 and 13', 'error', <AiOutlineWarning />]);
            return
        }

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
        <div className='max-w-[35rem] min-h-[35rem]'>

            <div className='flex'>
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
                    type='text'
                    placeholder="first name"
                    className='w-full mt-8'
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                    required
                />
                <input 
                    type='text'
                    placeholder="last name"
                    className='w-full mt-2'
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                    required
                />
                <input 
                    type='number'
                    placeholder="grade"
                    className='w-full mt-2'
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                />
                <input 
                    type='email'
                    placeholder="email"
                    className='w-full mt-2'
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                />
                <input 
                    type='password'
                    placeholder="password"
                    className='w-full mt-2'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <button className='w-full mt-8' type='submit'>
                    Register
                </button>
                {(alert[0] !== '' && alert[1] !== '') && (
                    <div
                        className={`${alert[1]} p-2 rounded-md mt-2 flex items-center gap-2`}
                    >
                        {alert[2]}
                        {alert[0]}
                    </div>
                )}
            </form>
            }
        </div>
    </div>
    );
}