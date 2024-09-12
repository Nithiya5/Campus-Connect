// CartPage.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './cart.css';
import Navbar2 from './Navbar2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  const [cartProducts, setCartProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        if (!userId) return;

        const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/cart?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart products');
        }
        const cartData = await response.json();

        const products = await Promise.all(cartData.map(async (cartItem) => {
          try {
            const productResponse = await fetch(`https://uniswap-backend-gj25.onrender.com/api/products2?productId=${cartItem._id}`);
            if (!productResponse.ok) {
              throw new Error('Failed to fetch product');
            }
            return productResponse.json();
          } catch (error) {
            console.error(`Error fetching product with ID ${cartItem._id}:`, error);
            return null;
          }
        }));

        setCartProducts(products.filter(product => product !== null));
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    fetchCartProducts();
  }, [userId]);

  const handleProductSelection = (productId) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: !prevSelectedProducts[productId]
    }));
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/removecart/${userId}/${productId}`, { method: 'DELETE' });
      if (!response.ok) {
        toast.error("Failed to remove product from cart");
      } else {
        toast.success("Product removed successfully!");
        setCartProducts(cartProducts.filter(product => product._id !== productId));
        const newSelectedProducts = { ...selectedProducts };
        delete newSelectedProducts[productId];
        setSelectedProducts(newSelectedProducts);
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const checkoutSelected = async () => {
    const selectedProductIds = Object.keys(selectedProducts).filter(productId => selectedProducts[productId]);
    if (selectedProductIds.length === 0) {
      toast.error('No products selected for checkout');
      return;
    }

    const selectedProductsData = cartProducts.filter(product => selectedProducts[product._id]);

    // Group selected products by sellerId
    const productsBySeller = selectedProductsData.reduce((acc, product) => {
      if (!acc[product.userId]) {
        acc[product.userId] = [];
      }
      acc[product.userId].push({
        productId: product._id,
        adTitle: product.productName,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.photos[0]
      });
      return acc;
    }, {});

    try {
      for (const [sellerId, products] of Object.entries(productsBySeller)) {
        const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/createorders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            userId, 
            sellerId,
            products 
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to proceed to checkout');
        }
      }

      toast.success('Checkout successful!');
      setCartProducts(cartProducts.filter(product => !selectedProductIds.includes(product._id)));
      setSelectedProducts({});
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error(error.message);
    }
  };

  const totalSelectedPrice = cartProducts
    .filter(product => selectedProducts[product._id])
    .reduce((total, product) => total + product.price, 0);

  return (
    <>
      <Navbar2 />
      <ToastContainer autoClose={2000} />
      <div>
        <h1 className='cart-heading'>Cart</h1>
        {cartProducts.length === 0 ? (
          <div className="empty-cart-message">
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart now!</p>
          </div>
        ) : (
          <div className="cart-container">
            {cartProducts.map(product => (
              // CartPage.js

// Inside the cart item div:
<div key={product._id} className="cart-item">
  <div className="cart-item-details">
    <div className="cart-details">
      <h3>{product.productName}</h3>
      <p>Quantity: {product.quantity}</p>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => removeFromCart(product._id)} className='remove-btn'><FaTrash className="remove-icon" /> Remove</button>
    </div>
    <div className="cart-item-checkbox">
      <input
        type="checkbox"
        id={`productCheckbox-${product._id}`}
        checked={!!selectedProducts[product._id]}
        onChange={() => handleProductSelection(product._id)}
      />
      <label htmlFor={`productCheckbox-${product._id}`}>Select for Checkout</label>
    </div>
  </div>
  <div className="cart-item-img">
    <img src={product.photos[0]} alt={product.productName} />
  </div>
</div>

            ))}
            <div className="cart-footer">
              <p>Total Price: ${totalSelectedPrice.toFixed(2)}</p>
              <button className='checkout-btn' onClick={checkoutSelected}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
