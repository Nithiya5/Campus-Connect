// import React from 'react';
// import { Link } from 'react-router-dom';

// function NavBar2() {
//   return (
//     <nav className="NavBar">
//       <ul className="NavList">
//       <li><Link to="/home">Home</Link></li>
//       <li><Link to="/addproduct">Add Product</Link></li>
//       </ul>
//     </nav>
//   );
// }

// export default NavBar2;

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';

// function NavBar2() {
//   const [userId, setUserId] = useState('');
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userIdFromParams = searchParams.get('userId');
//     if (userIdFromParams) {
//       // Update local storage
//       localStorage.setItem('userId', userIdFromParams);
//       // Update state
//       setUserId(userIdFromParams);
//     } else {
//       // Get userId from local storage
//       const storedUserId = localStorage.getItem('userId');
//       if (storedUserId) {
//         // Update state with stored userId
//         setUserId(storedUserId);
//       }
//     }
//   }, [searchParams]);

//   return (
//     <nav className="NavBar">
//       <ul className="NavList">
//         <li>
//           <Link to={`/home?userId=${userId}`}>Home</Link>
//         </li>
//         <li>
//           <Link to={`/addproduct?userId=${userId}`}>Add Product</Link>
//         </li>
//         <li>
//           <Link to={`/addproduct?userId=${userId}`}>Cart</Link>
//         </li>
//         <li>
//           <button
//             className="btn btn-link nav-link"
//             onClick={() => {
//               // Clear userId from local storage and state on logout
//               localStorage.removeItem('userId');
//               setUserId('');
//               // Navigate to login or home page
//               navigate('/');
//             }}
//           >
//             Log Out
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default NavBar2;

// 

// import { styled } from '@mui/material';
// import { fontGrid } from '@mui/material/styles/cssUtils';
// import React, { useState, useEffect } from 'react';
// import { Link, useSearchParams, useNavigate } from 'react-router-dom';

// function NavBar2() {
//   const [userId, setUserId] = useState('');
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userIdFromParams = searchParams.get('userId');
//     if (userIdFromParams) {
//       // Update local storage
//       localStorage.setItem('userId', userIdFromParams);
//       // Update state
//       setUserId(userIdFromParams);
//     } else {
//       // Get userId from local storage
//       const storedUserId = localStorage.getItem('userId');
//       if (storedUserId) {
//         // Update state with stored userId
//         setUserId(storedUserId);
//       }
//     }
//   }, [searchParams]);

//   const styles = {
//     navBar: {
//       backgroundColor: 'black',
//       padding: '1rem',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     },
//     navList: {
//       listStyleType: 'none',
//       margin: 0,
//       padding: 0,
//       display: 'flex',
//       gap: '1rem',
//       alignItems: 'center'
//     },
//     navItem: {
//       fontSize: '1.25rem',
//       color: 'white',
//       textDecoration: 'none',
//       padding: '0.5rem 1rem'
//     },
//     brand: {
//       fontSize: '1.5rem',
//       color: 'white',
//       textDecoration: 'none',
//       fontStyle: 'italic'
      
//     },
//     button: {
//       fontSize: '1.25rem',
//       color: 'white',
//       background: 'none',
//       border: 'none',
//       padding: '0.5rem 1rem',
//       cursor: 'pointer',
//       textDecoration: 'none',
//       display: 'flex',
//       alignItems: 'center'
//     }
//   };

//   return (
//     <nav style={styles.navBar}>
//       <Link to={`/home?userId=${userId}`} style={styles.brand}>
//         Campus Connect
//       </Link>
//       <ul style={styles.navList}>
//         <li>
//           <Link to={`/home?userId=${userId}`} style={styles.navItem}>
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to={`/addproduct?userId=${userId}`} style={styles.navItem}>
//             Add Product
//           </Link>
//         </li>
//         <li>
//           <Link to={`/cart?userId=${userId}`} style={styles.navItem}>
//             Cart
//           </Link>
//         </li>
//         <li>
//           <button
//             style={styles.button}
//             onClick={() => {
//               // Clear userId from local storage and state on logout
//               localStorage.removeItem('userId');
//               setUserId('');
//               // Navigate to login or home page
//               navigate('/');
//             }}
//           >
//             Log Out
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default NavBar2;

import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

function NavBar2() {
  const [userId, setUserId] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromParams = searchParams.get('userId');
    if (userIdFromParams) {
      localStorage.setItem('userId', userIdFromParams);
      setUserId(userIdFromParams);
    } else {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [searchParams]);

  const logout = () => {
    localStorage.removeItem('userId');
    setUserId('');
    navigate('/');
  };

  const styles = {
    navBar: {
      backgroundColor:'#000026',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    navList: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    navItem: {
      fontSize: '1.25rem',
      color: 'white',
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      position: 'relative'
    },
    brand: {
      fontSize: '1.5rem',
      color: 'white',
      textDecoration: 'none',
      fontStyle: 'italic'
    },
    button: {
      fontSize: '1.25rem',
      color: 'white',
      background: 'none',
      border: 'none',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center'
    },
    dropdownContent: {
      display: 'none',
      position: 'absolute',
      backgroundColor: '#f9f9f9',
      minWidth: '160px',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: 1
    },
    dropdownItem: {
      padding: '12px 16px',
      textDecoration: 'none',
      display: 'block',
      cursor: 'pointer',
      color: 'black'
    },
    dropdownItemHover: {
      backgroundColor: '#f1f1f1'
    }
  };

  const handleDropdownClick = (event) => {
    event.preventDefault();
    const dropdownContent = event.currentTarget.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  };

  return (
    <nav style={styles.navBar}>
      <Link to={`/home?userId=${userId}`} style={styles.brand}>
        Campus Connect
      </Link>
      <ul style={styles.navList}>
        <li>
          <Link to={`/home?userId=${userId}`} style={styles.navItem}>
            Home
          </Link>
        </li>
        <li className="dropdown" style={{ ...styles.navItem }}>
          <a href="#" onClick={handleDropdownClick} style={styles.navItem}>
            Seller
          </a>
          <div className="dropdown-content" style={styles.dropdownContent}>
            <Link to={`/addproduct?userId=${userId}`} style={styles.dropdownItem}>
              Add Product
            </Link>
            <Link to={`/viewproducts?userId=${userId}`} style={styles.dropdownItem}>
              View Products
            </Link>
            <Link to={`/vieworders?userId=${userId}`} style={styles.dropdownItem}>
              View Orders
            </Link>
          </div>
        </li>
        <li className="dropdown" style={{ ...styles.navItem }}>
          <a href="#" onClick={handleDropdownClick} style={styles.navItem}>
            Buyer
          </a>
          <div className="dropdown-content" style={styles.dropdownContent}>
            <Link to={`/cart?userId=${userId}`} style={styles.dropdownItem}>
              Cart
            </Link>
            <Link to={`/wishlist?userId=${userId}`} style={styles.dropdownItem}>
              Wishlist
            </Link>
            <Link to={`/orderhistory?userId=${userId}`} style={styles.dropdownItem}>
              Order History
            </Link>
          </div>
        </li>
        <li>
          <button style={styles.button} onClick={logout}>
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar2;

