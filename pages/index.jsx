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


  return (
    <div>

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
