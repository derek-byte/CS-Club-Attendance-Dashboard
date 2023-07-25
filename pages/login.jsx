import React, {useState} from "react";
import { useRouter } from "next/router";

import axios from 'axios';
import "tailwindcss/tailwind.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
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
        <div className="flex justify-center items-center h-screen">
        <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
            Email:
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
            />
        </div>
        <div className="mb-6">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
            Password:
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
            />
        </div>
        <div className="flex items-center justify-center">
            <button
                type="submit"
            >
            Submit
            </button>
        </div>
        </form>
    </div>
    );
}