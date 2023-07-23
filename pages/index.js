import Head from 'next/head'
import { useEffect, useState } from 'react'
import clientPromise from '../lib/mongodb'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Login from './login';
import "tailwindcss/tailwind.css";

// import './globals.css'

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
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js with MongoDB!</a>
      </h1>

      <h2 className="subtitle">You are connected to MongoDB</h2>

      <div className="grid">
        <a href="https://nextjs.org/docs" className="card">
          <h3>Documentation &rarr;</h3>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>
      </div>
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

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx global>{`
        html,
        #__next {
          width: 100%;
          // background-color: #1a202c;
          margin: 0;
          padding: 0;
        }
        body {
          padding: 0;
          margin: 0;
          // background-color: #1a202c;
          background-color: rgb(38 38 38);
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
