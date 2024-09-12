import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import Modal from 'react-modal';
import NavBar2 from './Navbar2';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Products.css';  // Create this CSS file to style your components

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const userId = params.get('userId');  // Retrieve the userId from query parameters

  useEffect(() => {
    // Fetch products for the selected category from backend
    axios.get(`https://uniswap-backend-gj25.onrender.com/api/products?category=${category}&userIdToExclude=${userId}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [category]);

  const openModal = (images) => {
    setSelectedImages(images);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImages([]);
  };

  const handleAddToCart = (productId,sellerId) => {
    axios.post('https://uniswap-backend-gj25.onrender.com/api/addToCart', {
      productId,
      userId,
      addedBy: sellerId
    })
    .then(response => {
      alert('Product added to cart successfully');
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    });
  };

  const handleAddToWishlist = (productId,sellerId) => {
    axios.post('https://uniswap-backend-gj25.onrender.com/api/addToWishlist', {
      productId,
      userId,
      addedBy: sellerId
    })
    .then(response => {
      alert('Product added to wishlist successfully');
    })
    .catch(error => {
      console.error('Error adding product to wishlist:', error);
      alert('Failed to add product to wishlist');
    });
  };

  const NextArrow = ({ onClick }) => (
    <div className="slick-arrow slick-next" onClick={onClick}>
      &gt;
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      &lt;
    </div>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <>
      <NavBar2 />
      <div className="Products">
        <h1>Products in {category}</h1>
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="product">
                <img src={product.photos[0]} alt={product.adTitle} onClick={() => openModal(product.photos)} />
                <h2>{product.adTitle}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleAddToCart(product._id, product.userId)}>Add to Cart</button>
                <button onClick={() => handleAddToWishlist(product._id, product.userId)}>Add to Wishlist</button>
              </div>
            ))
          ) : (
            <p>No products available in this category.</p>
          )}
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Image Slider" ariaHideApp={false}>
        <button onClick={closeModal}>Close</button>
        <Slider {...sliderSettings}>
          {selectedImages.map((image, index) => (
            <div key={index} className="slider-image">
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </Slider>
      </Modal>
    </>
  );
};

export default Products;



