import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="NavBar">
      <ul className="NavList">
      <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li> 
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="#help">Help</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;

// import React from 'react';
// import { Link } from 'react-router-dom';

// function NavBar() {
//   return (
//     <nav className="NavBar">
//       <ul className="NavList">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/aboutus">About</Link></li>
//         <li><Link to="/login">Login</Link></li>
//         <li><Link to="/register">Register</Link></li>
//         <li><Link to="#help">Help</Link></li>
//       </ul>
//     </nav>
//   );
// }

// export default NavBar;
