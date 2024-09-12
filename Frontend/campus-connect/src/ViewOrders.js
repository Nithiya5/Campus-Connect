import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar2 from './Navbar2';

// Custom hook to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const query = useQuery();
  const userId = query.get('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/getbuyerorders?sellerId=${userId}`);
        const data = await response.json();
        
        // Sort orders from newest to oldest based on orderDate
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
      <div>
        <h1>Order History</h1>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order">
              <div className="products">
                {order.products.map((product) => (
                  <div key={product.productId} className="product">
                    <h3>{product.adTitle}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                    <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    <img src={product.imageUrl} alt={product.adTitle} style={{ width: '100px' }} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ViewOrders;
