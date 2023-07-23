import Head from 'next/head'
import { useEffect, useState } from 'react'
import clientPromise from '../lib/mongodb'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Login from './login';

export default function Home(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { push } = useRouter();

  const handleLoginSubmit = () => {
    axios.post('http://localhost:3000/api/auth/login')
    .then(response => {
      setIsLoggedIn(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  // useEffect(() => {
  //   // push({
  //   //   pathname: '/home',
  //   //   query: { name: 'Someone' }
  //   // })
  //   if (props?.query?.logout)
      
  // }, [props.query]);

  const handleLogout = async () => {
    const user = await axios.get("/api/auth/logout");

    console.log(user);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

      <Login/>
      {/* <div>
        <h1> Registraion </h1>
        <form action="/api/register" method="post">
          <label>
            EMail Address
          </label>
          <input type='email' name='email' placeholder='Type your email'></input>
          <label>
            Pasword
          </label>
          <input type='password' name='password' placeholder='Type your password'></input>
          <input type='submit' value='Register'></input>

        </form>

        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit} method="post">
          <label>
            EMail Address
          </label>
          <input type='email' name='email' placeholder='Type your email'></input>
          <label>
            Pasword
          </label>
          <input type='password' name='password' placeholder='Type your password'></input>
          <input type='submit' value='Login'></input>

        </form>
      </div> */}

    </div>
  )
}
