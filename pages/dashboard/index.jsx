import { withRouter } from 'next/router'
import axios from 'axios';
import Link from 'next/link';

function Home(props) {
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/logout", {
        email, password
      })
      // if (data.data) 
        // setIsLoggedIn(true);
        push({
          pathname: '/',
          query: { logout: true }
        }, "/")
    } catch (err) {
      console.log(err);
    }
  }
  console.log("USER", props)
  return (
    <div className='text-text'>
      <div>Home</div>
      <button onClick={handleLogout}>Logout</button>
      <Link href='/dashboard/attendance'>Attendance</Link>
    </div>
  );
}

export default withRouter(Home)
