import { withRouter } from 'next/router'
import axios from 'axios';

function Home(props){
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
    <div>
      <div>Hi</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default withRouter(Home)
