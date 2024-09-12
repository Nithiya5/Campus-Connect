import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar2 from './Navbar2';

// Custom hook to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const query = useQuery();
  const userId = query.get('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/getbuyerorders?userId=${userId}`);
        const data = await response.json();
        
        const sortedOrders = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <>
      <NavBar2 />
      <style>
        {`
          .order-history-container {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .order-history-title {
            width: 100%;
            text-align: center;
            font-size: 2.5rem;
            font-family: 'Alegreya', serif;
            font-weight: bold;
            color: #000000;
            margin-top: 20px;
            margin-bottom: 40px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          .order {
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 20px;
      width: 40%; /* Increase the width */
      margin-bottom: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

          .order:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }

          .product-details {
            flex: 1;
            padding-left: 20px;
          }

          .product-details h3 {
            margin-top: 0;
            font-size: 1.5rem;
            color: #2c3e50;
          }

          .product-details p {
            margin: 5px 0;
            font-size: 1rem;
            color: #555;
          }

          .product-img {
      max-width: 200px; /* Adjust the maximum width of the image */
      max-height: 200px; /* Adjust the maximum height of the image */
      border-radius: 5px;
    }

          .no-orders {
            text-align: center;
            font-size: 1.2rem;
            color: #555;
            margin-top: 40px;
            width: 100%;
          }
        `}
      </style>
      <div className="order-history-container">
        <h1 className="order-history-title">Order History</h1>
        {orders.length === 0 ? (
          <p className="no-orders">No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order">
              <img src={order.products[0].imageUrl} alt={order.products[0].adTitle} className="product-img" />
              <div className="product-details">
                <h3>{order.products[0].adTitle}</h3>
                <p>{order.products[0].description}</p>
                <p>Price: ${order.products[0].price}</p>
                <p>Category: {order.products[0].category}</p>
                <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OrderHistory;
