import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from './App'

function Nav() {
  const userData = useContext(UserContext);

  const handleLogout = () => {
    userData.setcurrUser({});
    sessionStorage.removeItem('loggedInUser');
    alert("You Have Logged Out");
  }

  return (
    <React.Fragment>
      <header>
        <nav id="navbar">
          <div className="nav-left">
            <Link to='/'>Brendr</Link>
          </div>
          <div className="mobile-hamburger">
            <i className="fas fa-bars"></i>
          </div>
          <div className="nav-right">
            <Link to='/'>Home</Link>
            <Link to='/lend'>Lend</Link>
            <Link to='/borrow'>Borrow</Link>
            {userData.currUser && userData.currUser.success?<Link to='/' onClick = {handleLogout}>Logout</Link>:<Link to='/login'>Login</Link>}
            {userData.currUser && userData.currUser.success?<Link to='/user'>Welcome {userData.currUser.user.firstname}!</Link>:<Link to='/signup'>Sign Up</Link>}
          </div>
        </nav>

        <div className="mobile-nav">
          <div className="mobile-close">
            <i className="fas fa-times"></i>
          </div>
          <ul>
            <li className="active">
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Lend</a>
            </li>
            <li>
              <a href="#">Borrow</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Sign Up</a>
            </li>
          </ul>
        </div>
      </header>
      
    </React.Fragment>
  );
}

export default Nav;
