// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Register from './Register';
// import Login from './Login';
// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" component={Register} />
//           <Route path="/login" component={Login} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register'; // Adjust the import path as needed
import Login from './Login'; // Adjust the import path as needed
 import './App.css';
import HomePage from './HomePage';
import AboutUs from './Aboutus';
import AddProduct from './Addproduct';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Cart from './Cart';
import Products from './Products';
import WishlistPage from './Wishlist';
import ViewProductsPage from './ViewProducts';
import CartPage from './Cart';
import OrderHistory from './OrderHistory';
import ViewOrders from './ViewOrders';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/viewproducts" element={<ViewProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/vieworders" element={<ViewOrders />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;





