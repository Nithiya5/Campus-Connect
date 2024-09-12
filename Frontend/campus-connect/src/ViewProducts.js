// import React, { useState, useEffect } from 'react';
// import NavBar2 from './Navbar2';
// import { useLocation } from 'react-router-dom';
// import './Viewproducts.css';

// const ViewProductsPage = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get('userId');

//   const [products, setProducts] = useState([]);
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     adTitle: '',
//     description: '',
//     price: '',
//     category: '',
//   });

//   const [shouldReload, setShouldReload] = useState(false); // State to track reload

//   useEffect(() => {
//     if (!userId) return;

//     fetchProducts();
//   }, [userId, shouldReload]); // Adding shouldReload as a dependency

//   const fetchProducts = () => {
//     fetch(`https://uniswap-backend-gj25.onrender.com/api/products3/${userId}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setProducts(data);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   };

//   const handleEditProduct = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       adTitle: product.adTitle,
//       description: product.description,
//       price: product.price,
//       category: product.category,
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/editproduct/${editingProduct._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update product');
//       }

//       const updatedProduct = await response.json();
//       setProducts(prevProducts => prevProducts.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
//       setEditingProduct(null);
//       setShouldReload(!shouldReload); // Toggle shouldReload to trigger reload
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/deleteproduct/${productId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete product');
//       }

//       setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const openSlideshow = (product) => {
//     setSelectedProduct(product);
//     setCurrentSlideIndex(0);
//   };

//   const closeSlideshow = () => {
//     setSelectedProduct(null);
//   };

//   const prevSlide = () => {
//     setCurrentSlideIndex(prevIndex => (prevIndex === 0 ? selectedProduct.photos.length - 1 : prevIndex - 1));
//   };

//   const nextSlide = () => {
//     setCurrentSlideIndex(prevIndex => (prevIndex === selectedProduct.photos.length - 1 ? 0 : prevIndex + 1));
//   };

//   const groupedProducts = products.reduce((acc, product) => {
//     const category = product.category;
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(product);
//     return acc;
//   }, {});

//   return (
//     <>
//       <NavBar2 />
//       <div className="view-products-container">
//         <h1>View Products</h1>
//         {Object.keys(groupedProducts).length === 0 ? (
//           <p>No products found</p>
//         ) : (
//           Object.keys(groupedProducts).map(category => (
//             <div key={category} className="product-category">
//               <h2>{category}</h2>
//               <ul className="product-list">
//                 {groupedProducts[category].map(product => (
//                   <li key={product._id} className="product-item">
//                     <div>
//                       <h3>{product.adTitle}</h3>
//                       <img 
//                         src={product.photos[0]} 
//                         alt={`Product ${product.adTitle}`} 
//                         className="product-thumbnail"
//                       />
//                       <p>Price: ${product.price}</p>
//                       <p>Description: {product.description}</p>
//                       <button onClick={() => handleEditProduct(product)}>Edit</button>
//                       <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
//                       <button onClick={() => openSlideshow(product)}>View Photos</button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         )}

//         {selectedProduct && (
//           <div className="slideshow">
//             <span className="close" onClick={closeSlideshow}>&times;</span>
//             <div className="slides">
//               {selectedProduct.photos.map((photo, index) => (
//                 <div
//                   className="slide"
//                   key={index}
//                   style={{ display: index === currentSlideIndex ? 'block' : 'none' }}
//                 >
//                   <img src={photo} alt={`Product ${index + 1}`} />
//                 </div>
//               ))}
//             </div>
//             <button className="prev" onClick={prevSlide}>&#10094;</button>
//             <button className="next" onClick={nextSlide}>&#10095;</button>
//           </div>
//         )}

//         {editingProduct && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <span className="modal-close" onClick={() => setEditingProduct(null)}>&times;</span>
//               <div className="edit-product-form">
//                 <h2>Edit Product</h2>
//                 <form onSubmit={handleFormSubmit}>
//                   <div>
//                     <label>Title:</label>
//                     <input type="text" name="adTitle" value={formData.adTitle} onChange={handleFormChange} />
//                   </div>
//                   <div>
//                     <label>Description:</label>
//                     <textarea name="description" value={formData.description} onChange={handleFormChange}></textarea>
//                   </div>
//                   <div>
//                     <label>Price:</label>
//                     <input type="number" name="price" value={formData.price} onChange={handleFormChange} />
//                   </div>
//                   <div>
//                     <label>Category:</label>
//                     <input type="text" name="category" value={formData.category} onChange={handleFormChange} />
//                   </div>
//                   <button type="submit">Save Changes</button>
//                   <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ViewProductsPage;


// import React, { useState, useEffect } from 'react';
// import NavBar2 from './Navbar2';
// import { useLocation } from 'react-router-dom';
// import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

// const ViewProductsPage = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get('userId');

//   const [products, setProducts] = useState([]);
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     adTitle: '',
//     description: '',
//     price: '',
//     category: '',
//   });

//   const [shouldReload, setShouldReload] = useState(false); // State to track reload

//   useEffect(() => {
//     if (!userId) return;

//     fetchProducts();
//   }, [userId, shouldReload]); // Adding shouldReload as a dependency

//   const fetchProducts = () => {
//     fetch(`https://uniswap-backend-gj25.onrender.com/api/products3/${userId}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setProducts(data);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   };

//   const handleEditProduct = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       adTitle: product.adTitle,
//       description: product.description,
//       price: product.price,
//       category: product.category,
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/editproduct/${editingProduct._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update product');
//       }

//       const updatedProduct = await response.json();
//       setProducts(prevProducts => prevProducts.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
//       setEditingProduct(null);
//       setShouldReload(!shouldReload); // Toggle shouldReload to trigger reload
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/deleteproduct/${productId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete product');
//       }

//       setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const openSlideshow = (product) => {
//     setSelectedProduct(product);
//     setCurrentSlideIndex(0);
//   };

//   const closeSlideshow = () => {
//     setSelectedProduct(null);
//   };

//   const prevSlide = () => {
//     setCurrentSlideIndex(prevIndex => (prevIndex === 0 ? selectedProduct.photos.length - 1 : prevIndex - 1));
//   };

//   const nextSlide = () => {
//     setCurrentSlideIndex(prevIndex => (prevIndex === selectedProduct.photos.length - 1 ? 0 : prevIndex + 1));
//   };

//   const groupedProducts = products.reduce((acc, product) => {
//     const category = product.category;
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(product);
//     return acc;
//   }, {});

//   return (
//     <>
//       <NavBar2 />
//       <ViewProductsContainer>
//         <h1>View Products</h1>
//         {Object.keys(groupedProducts).length === 0 ? (
//           <p>No products found</p>
//         ) : (
//           Object.keys(groupedProducts).map(category => (
//             <ProductCategory key={category}>
//               <h2>{category}</h2>
//               <ProductList>
//                 {groupedProducts[category].map(product => (
//                   <ProductItem key={product._id}>
//                     <div>
//                       <h3>{product.adTitle}</h3>
//                       <ProductThumbnail 
//                         src={product.photos[0]} 
//                         alt={`Product ${product.adTitle}`} 
//                       />
//                       <p>Price: ${product.price}</p>
//                       <p>Description: {product.description}</p>
//                       <Button onClick={() => handleEditProduct(product)}>
//                         <FontAwesomeIcon icon={faEdit} /> Edit
//                       </Button>
//                       <Button onClick={() => handleDeleteProduct(product._id)}>
//                         <FontAwesomeIcon icon={faTrash} /> Delete
//                       </Button>
//                       <Button onClick={() => openSlideshow(product)}>
//                         <FontAwesomeIcon icon={faEye} /> View Photos
//                       </Button>
//                     </div>
//                   </ProductItem>
//                 ))}
//               </ProductList>
//             </ProductCategory>
//           ))
//         )}

//         {selectedProduct && (
//           <Slideshow>
//             <CloseButton onClick={closeSlideshow}>&times;</CloseButton>
//             <Slides>
//               {selectedProduct.photos.map((photo, index) => (
//                 <Slide
//                   key={index}
//                   style={{ display: index === currentSlideIndex ? 'block' : 'none' }}
//                 >
//                   <img src={photo} alt={`Product ${index + 1}`} />
//                 </Slide>
//               ))}
//             </Slides>
//             <PrevButton onClick={prevSlide}>&#10094;</PrevButton>
//             <NextButton onClick={nextSlide}>&#10095;</NextButton>
//           </Slideshow>
//         )}

//         {editingProduct && (
//           <ModalOverlay>
//             <ModalContent>
//               <ModalClose onClick={() => setEditingProduct(null)}>&times;</ModalClose>
//               <EditProductForm>
//                 <h2>Edit Product</h2>
//                 <form onSubmit={handleFormSubmit}>
//                   <div>
//                     <label>Title:</label>
//                     <input type="text" name="adTitle" value={formData.adTitle} onChange={handleFormChange} />
//                   </div>
//                   <div>
//                     <label>Description:</label>
//                     <textarea name="description" value={formData.description} onChange={handleFormChange}></textarea>
//                   </div>
//                   <div>
//                     <label>Price:</label>
//                     <input type="number" name="price" value={formData.price} onChange={handleFormChange} />
//                   </div>
//                   <div>
//                     <label>Category:</label>
//                     <input type="text" name="category" value={formData.category} onChange={handleFormChange} />
//                   </div>
//                   <button type="submit">Save Changes</button>
//                   <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//                 </form>
//               </EditProductForm>
//             </ModalContent>
//           </ModalOverlay>
//         )}
//       </ViewProductsContainer>
//     </>
//   );
// };

// export default ViewProductsPage;

// const ViewProductsContainer = styled.div`
//   padding: 20px;
//   font-family: Arial, sans-serif;

//   h1 {
//     text-align: center;
//     margin-bottom: 20px;
//   }
// `;

// const ProductCategory = styled.div`
//   margin-bottom: 30px;

//   h2 {
//     text-align: left;
//     font-size: 24px;
//     margin-bottom: 10px;
//     border-bottom: 2px solid #ccc;
//     padding-bottom: 5px;
//   }
// `;

// const ProductList = styled.ul`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 20px;
//   list-style-type: none;
//   padding: 0;
// `;

// const ProductItem = styled.li`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 20px;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

//   h3 {
//     margin: 0 0 10px 0;
//     text-align: center;
//   }

//   p {
//     margin: 5px 0;
//     text-align: center;
//   }
// `;

// const ProductThumbnail = styled.img`
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
//   margin-bottom: 10px;
// `;

// const Button = styled.button`
//   background-color: #007bff;
//   border: none;
//   color: white;
//   padding: 10px;
//   margin: 5px 0;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 14px;
//   display: flex;
//   align-items: center;

//   &:hover {
//     background-color: #0056b3;
//   }

//   svg {
//     margin-right: 5px;
//   }
// `;

// const Slideshow = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.8);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const CloseButton = styled.span`
//   position: absolute;
//   top: 20px;
//   right: 40px;
//   color: white;
//   font-size: 40px;
//   font-weight: bold;
//   cursor: pointer;
// `;

// const Slides = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Slide = styled.div`
//   display: none;
//   text-align: center;

//   img {
//     width: 500px;
//     height: 500px;
//     object-fit: cover;
//   }
// `;

// const PrevButton = styled.button`
//   position: absolute;
//   top: 50%;
//   left: 0;
//   transform: translateY(-50%);
//   background: transparent;
//   border: none;
//   color: white;
//   font-size: 30px;
//   cursor: pointer;
// `;

// const NextButton = styled.button`
//   position: absolute;
//   top: 50%;
//   right: 0;
//   transform: translateY(-50%);
//   background: transparent;
//   border: none;
//   color: white;
//   font-size: 30px;
//   cursor: pointer;
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalContent = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 5px;
//   width: 500px;
//   position: relative;
// `;

// const ModalClose = styled.span`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   font-size: 20px;
//   cursor: pointer;
// `;

// const EditProductForm = styled.div`
//   h2 {
//     text-align: center;
//     margin-bottom: 20px;
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 15px;

//     label {
//       font-weight: bold;
//     }

//     input, textarea {
//       padding: 10px;
//       border-radius: 5px;
//       border: 1px solid #ddd;
//       font-size: 16px;
//     }

//     button {
//       background-color: #28a745;
//       color: white;
//       padding: 10px;
//       border: none;
//       border-radius: 5px;
//       cursor: pointer;
//       font-size: 16px;
//     }

//     button[type="button"] {
//       background-color: #dc3545;
//     }
//   }
// `;

// import React, { useState, useEffect } from 'react';
// import NavBar2 from './Navbar2';
// import { useLocation } from 'react-router-dom';
// import './Viewproducts.css';

// const ViewProductsPage = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get('userId');

//   const [products, setProducts] = useState([]);
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     adTitle: '',
//     description: '',
//     price: '',
//     category: '',
//   });

//   const [shouldReload, setShouldReload] = useState(false); // State to track reload

//   useEffect(() => {
//     if (!userId) return;

//     fetchProducts();
//   }, [userId, shouldReload]); // Adding shouldReload as a dependency

//   const fetchProducts = () => {
//     fetch(`https://uniswap-backend-gj25.onrender.com/api/products3/${userId}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setProducts(data);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   };

//   const handleEditProduct = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       adTitle: product.adTitle,
//       description: product.description,
//       price: product.price,
//       category: product.category,
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/editproduct/${editingProduct._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update product');
//       }

//       const updatedProduct = await response.json();
//       setProducts(prevProducts => prevProducts.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
//       setEditingProduct(null);
//       setShouldReload(!shouldReload); // Toggle shouldReload to trigger reload
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/deleteproduct/${productId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete product');
//       }

//       setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const openSlideshow = (product) => {
//     setSelectedProduct(product);
//     setCurrentSlideIndex(0);
//   };

//   const closeSlideshow = () => {
//     setSelectedProduct(null);
//   };

//   const prevSlide = () => {
//     setCurrentSlideIndex(prevIndex => (prevIndex === 0 ? selectedProduct.photos.length - 1 : prevIndex - 1));
//   };

//   const nextSlide = () => {
//     setCurrentSlideIndex(prevIndex => (prevIndex === selectedProduct.photos.length - 1 ? 0 : prevIndex + 1));
//   };

//   const groupedProducts = products.reduce((acc, product) => {
//     const category = product.category;
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(product);
//     return acc;
//   }, {});

//   return (
//     <>
//       <NavBar2 />
//       <div className="view-products-container">
//         <h1>View Products</h1>
//         {Object.keys(groupedProducts).length === 0 ? (
//           <p>No products found</p>
//         ) : (
//           Object.keys(groupedProducts).map(category => (
//             <div key={category} className="product-category">
//               <h2>{category}</h2>
//               <ul className="product-list">
//                 {groupedProducts[category].map(product => (
//                   <li key={product._id} className="product-item">
//                     <div>
//                       <h3>{product.adTitle}</h3>
//                       <img 
//                         src={product.photos[0]} 
//                         alt={`Product ${product.adTitle}`} 
//                         className="product-thumbnail"
//                       />
//                       <p>Price: ${product.price}</p>
//                       <p>Description: {product.description}</p>
//                       <button onClick={() => handleEditProduct(product)}>Edit</button>
//                       <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
//                       <button onClick={() => openSlideshow(product)}>View Photos</button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         )}

//         {selectedProduct && (
//           <div className="slideshow">
//             <span className="close" onClick={closeSlideshow}>&times;</span>
//             <div className="slides">
//               {selectedProduct.photos.map((photo, index) => (
//                 <div
//                   className="slide"
//                   key={index}
//                   style={{ display: index === currentSlideIndex ? 'block' : 'none' }}
//                 >
//                   <img src={photo} alt={`Product ${index + 1}`} />
//                 </div>
//               ))}
//             </div>
//             <button className="prev" onClick={prevSlide}>&#10094;</button>
//             <button className="next" onClick={nextSlide}>&#10095;</button>
//           </div>
//         )}

//         {editingProduct && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <span className="modal-close" onClick={() => setEditingProduct(null)}>&times;</span>
//               <div className="edit-product-form">
//                 <h2>Edit Product</h2>
//                 <form onSubmit={handleFormSubmit}>
//                   <div>
//                     <label>Title:</label>
//                     <input type="text" name="adTitle" value={formData.adTitle} onChange={handleFormChange} />
//                   </div>
//                   <div>
//                     <label>Description:</label>
//                     <textarea name="description" value={formData.description} onChange={handleFormChange}></textarea>
//                   </div>
//                   <div>
//                     <label>Price:</label>
//                     <input type="number" name="price" value={formData.price} onChange={handleFormChange} />
//                   </div>
//                   <div>
//                     <label>Category:</label>
//                     <input type="text" name="category" value={formData.category} onChange={handleFormChange} />
//                   </div>
//                   <button type="submit">Save Changes</button>
//                   <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ViewProductsPage;

import React, { useState, useEffect } from 'react';
import NavBar2 from './Navbar2';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './Viewproducts.css';

const ViewProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  const [products, setProducts] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    adTitle: '',
    description: '',
    price: '',
    category: '',
  });

  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetchProducts();
  }, [userId, shouldReload]);

  const fetchProducts = () => {
    fetch(`https://uniswap-backend-gj25.onrender.com/api/products3/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      adTitle: product.adTitle,
      description: product.description,
      price: product.price,
      category: product.category,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/editproduct/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      setProducts(prevProducts => prevProducts.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
      setEditingProduct(null);
      setShouldReload(!shouldReload);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/deleteproduct/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const openSlideshow = (product) => {
    setSelectedProduct(product);
    setCurrentSlideIndex(0);
  };

  const closeSlideshow = () => {
    setSelectedProduct(null);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(prevIndex => (prevIndex === 0 ? selectedProduct.photos.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentSlideIndex(prevIndex => (prevIndex === selectedProduct.photos.length - 1 ? 0 : prevIndex + 1));
  };

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <>
      <NavBar2 />
      <div className="view-products-container">
        <h1>View Products</h1>
        {Object.keys(groupedProducts).length === 0 ? (
          <p>No products found</p>
        ) : (
          Object.keys(groupedProducts).map(category => (
            <div key={category} className="product-category">
              <h2>{category}</h2>
              <ul className="product-list">
                {groupedProducts[category].map(product => (
                  <li key={product._id} className="product-item">
                    <div>
                      <h3>{product.adTitle}</h3>
                      <img 
                        src={product.photos[0]} 
                        alt={`Product ${product.adTitle}`} 
                        className="product-thumbnail"
                      />
                      <p>Price: ${product.price}</p>
                      <p>Description: {product.description}</p>
                      <button onClick={() => handleEditProduct(product)}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product._id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                      <button onClick={() => openSlideshow(product)}>
                        <FontAwesomeIcon icon={faEye} /> View Photos
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}

        {selectedProduct && (
          <div className="slideshow">
            <span className="close" onClick={closeSlideshow}>&times;</span>
            <div className="slides">
              {selectedProduct.photos.map((photo, index) => (
                <div
                  className="slide"
                  key={index}
                  style={{ display: index === currentSlideIndex ? 'block' : 'none' }}
                >
                  <img src={photo} alt={`Product ${index + 1}`} />
                </div>
              ))}
            </div>
            <button className="prev" onClick={prevSlide}>&#10094;</button>
            <button className="next" onClick={nextSlide}>&#10095;</button>
          </div>
        )}

        {editingProduct && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="modal-close" onClick={() => setEditingProduct(null)}>&times;</span>
              <div className="edit-product-form">
                <h2>Edit Product</h2>
                <form onSubmit={handleFormSubmit}>
                  <div>
                    <label>Title:</label>
                    <input type="text" name="adTitle" value={formData.adTitle} onChange={handleFormChange} />
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleFormChange}></textarea>
                  </div>
                  <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleFormChange} />
                  </div>
                  <div>
                    <label>Category:</label>
                    <input type="text" name="category" value={formData.category} onChange={handleFormChange} />
                  </div>
                  <button type="submit">Save Changes</button>
                  <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewProductsPage;
