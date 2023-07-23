import Head from 'next/head'
import { useEffect, useState } from 'react'
import clientPromise from '../lib/mongodb'
import axios from 'axios';
import { useRouter } from 'next/navigation';
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

  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post("/api/auth/login", {
          email, password
        })
        console.log(data)
        handleGetUser();
        if (data.data && !props?.query?.logout) 
          // setIsLoggedIn(true);
          push({
            pathname: '/home',
            query: { name: data }
          }, "/home")
      } catch (err) {
        console.log(err);
      }
    }

    const handleGetUser = async () => {
      const user = await axios.get("/api/user");
  
      console.log("HI", user);
    };

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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    );
  }

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

      <style jsx>{`
        // .container {
        //   min-height: 100vh;
        //   padding: 0 0.5rem;
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: center;
        //   align-items: center;
        // }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // background-color: red;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        
      `}</style>

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
