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
        <nav className={userData.currUser && userData.currUser.user && userData.currUser.user.admin === true?"navbar-admin":"navbar-user"}>
          <div className="nav-left">
            <Link to='/'>Brendr</Link>
          </div>
          <div className="mobile-hamburger">
            <i className="fas fa-bars"></i>
          </div>
          <div className="nav-right">
            {userData.currUser && userData.currUser.success ?
              userData.currUser.user.admin === false ?<Link to='/lend'>Lend</Link>:<span></span>:<Link to='/lend'>Lend</Link>}
            {userData.currUser && userData.currUser.success ?
              userData.currUser.user.admin === false ?<Link to='/borrow'>Borrow</Link>:<span></span>:<Link to='/borrow'>Borrow</Link>}
            <Link to='/'>Home</Link>
            {userData.currUser && userData.currUser.success?<Link to='/' onClick = {handleLogout}>Logout</Link>:<Link to='/login'>Login</Link>}
            {userData.currUser && userData.currUser.success?
              userData.currUser.user.admin === false ? <Link to='/user'>Welcome {userData.currUser.user.firstname}!</Link>
              : <Link to='/admin'>Welcome {userData.currUser.user.firstname}! <p><b>(Admin)</b></p></Link>
              :<Link to='/signup'>Sign Up</Link>}
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
