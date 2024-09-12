import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import './Wishlist.css';
import Navbar2 from './Navbar2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        if (!userId) return;

        const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/wishlist?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist products');
        }
        const wishlistData = await response.json();

        const products = await Promise.all(wishlistData.map(async (wishlistItem) => {
          try {
            const productResponse = await fetch(`https://uniswap-backend-gj25.onrender.com/api/products2?productId=${wishlistItem._id}`);
            if (!productResponse.ok) {
              throw new Error('Failed to fetch product');
            }
            return productResponse.json();
          } catch (error) {
            console.error(`Error fetching product with ID ${wishlistItem._id}:`, error);
            return null;
          }
        }));

        setWishlistProducts(products.filter(product => product !== null));
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      }
    };

    fetchWishlistProducts();
  }, [userId]);

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/removewishlist/${userId}/${productId}`, { method: 'DELETE' });
      if (!response.ok) {
        toast.error("Failed to remove product from wishlist");
      } else {
        toast.success("Product removed successfully!");
        setWishlistProducts(wishlistProducts.filter(product => product._id !== productId));
      }
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  const addToCart = async (productId, sellerId) => {
    try {
      const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/addToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId, addedBy: sellerId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add product to Cart');
      }

      toast.success('Product added to Cart!');
    } catch (error) {
      console.error('Error adding product to Cart:', error);
      toast.error(error);
    }
  };

  // Group the products by category
  const groupedProducts = wishlistProducts.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <>
      <Navbar2 />
      <ToastContainer autoClose={2000} />
      <div>
        <h1 className="wishlist-heading">Wishlist</h1>
        {Object.keys(groupedProducts).length === 0 ? (
          <div className="empty-wishlist-message">
            <h2>Your wishlist is empty</h2>
            <p>Add some products to your wishlist now!</p>
          </div>
        ) : (
          Object.keys(groupedProducts).map(category => (
            <div key={category}>
              <h2 className='category'>{category}</h2>
              <div className="wishlist-container">
                {groupedProducts[category].map(product => (
                  <div key={product._id} className="wishlist-item">
                    <img src={product.photos[0]} alt={product.productName} />
                    <div className="wishlist-details">
                      <h3>{product.productName}</h3>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: ${product.price}</p>
                      <p>Description: {product.description}</p>
                      <div className="buttons">
                        <button onClick={() => removeFromWishlist(product._id)} className='remove-btn'><FaTrash className="remove-icon" /> Remove</button>
                        <button className='add-to-cart-btn' onClick={() => addToCart(product._id, product.userId)}><FaShoppingCart className="cart-icon" /> Add to Cart</button>
                      </div>
                    </div>
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

export default WishlistPage;
