// import React, { useState, useEffect } from 'react';
// import { styled, Box, Button, InputBase, FormControl, Select, MenuItem } from '@mui/material';
// import { AddCircle as Add } from '@mui/icons-material';
// import { useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import TextareaAutosize from '@mui/material/TextareaAutosize';

// const Container = styled(Box)(({ theme }) => ({
//     margin: '50px 100px',
//     [theme.breakpoints.down('md')]: {
//         margin: 0
//     }
// }));

// const StyledFormControl = styled(FormControl)({
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: '10px',
//     marginTop: '10px',
//     flexWrap: 'wrap',
// });

// const InputTextField = styled(InputBase)({
//     fontSize: '25px',
//     flex: '1',
//     minWidth: '250px',
//     margin: '10px'
// });

// const AddProductButton = styled(Button)({
//     marginLeft: 'auto',
//     marginTop: '10px'
// });

// const ImagePreviewContainer = styled(Box)({
//     display: 'flex',
//     gap: '10px',
//     flexWrap: 'wrap',
//     marginTop: '10px'
// });

// const ImageContainer = styled(Box)({
//     position: 'relative',
//     width: '100px',
//     height: '100px',
//     overflow: 'hidden',
//     '& img': {
//         width: '100%',
//         height: '100%',
//         objectFit: 'cover'
//     }
// });

// const AddProduct = () => {
//     const { customerId: urlCustomerId } = useParams();
//     const [customerId, setCustomerId] = useState('');
//     const [category, setCategory] = useState('');

//     useEffect(() => {
//         if (!customerId) {
//             const storedCustomerId = localStorage.getItem('customerId');
//             if (storedCustomerId) {
//                 setCustomerId(storedCustomerId);
//             } else {
//                 setCustomerId(urlCustomerId);
//                 localStorage.setItem('customerId', urlCustomerId);
//             }
//         }
//     }, [customerId, urlCustomerId]);

//     const [product, setProduct] = useState({
//         customerId: customerId,
//         adTitle: '',
//         price: '',
//         description: '',
//         category: '',
//         images: []
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProduct({ ...product, [name]: value });
//     }

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//         setProduct({ ...product, category: e.target.value });
//     }

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         if (product.photos.length + files.length > 5) {
//             toast.error('You can upload a maximum of 5 images.');
//             return;
//         }
//         setProduct({ ...product, photos: [...product.photos, ...files] });
//     }

//     const removeImage = (index) => {
//         const newPhotos = [...product.photos];
//         newPhotos.splice(index, 1);
//         setProduct({ ...product, photos: newPhotos });
//     }

//     const saveProduct = async () => {
//         const formData = new FormData();
//         formData.append('customerId', customerId);
//         formData.append('adTitle', product.adTitle);
//         formData.append('price', product.price);
//         formData.append('description', product.description);
//         formData.append('category', product.category);
//         product.photos.forEach(photo => {
//             formData.append('photos', photo);
//         });

//         try {
//             const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/uploadProducts`, {
//                 method: 'POST',
//                 body: formData
//             });

//             if (response.ok) {
//                 toast.success('Product added successfully!');
//                 setProduct({
//                     customerId: customerId,
//                     adTitle: '',
//                     price: '',
//                     description: '',
//                     category: '',
//                     photos: []
//                 });
//                 setCategory('');
//             } else {
//                 toast.error('Failed to add product.');
//             }
//         } catch (error) {
//             console.error('Error occurred while adding product:', error);
//             toast.error('Error occurred while adding product.');
//         }
//     }

//     return (
//         <>
//             <Container>
//                 <ToastContainer autoClose={2000} />
//                 <br/><br/><br/><br/>
//                 <ImagePreviewContainer>
//                     {product.photos.length > 0 ? 
//                         product.photos.map((photo, index) => (
//                             <ImageContainer key={index}>
//                                 <img src={URL.createObjectURL(photo)} alt="Product" />
//                                 <Button 
//                                     onClick={() => removeImage(index)} 
//                                     style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
//                                 >
//                                     X
//                                 </Button>
//                             </ImageContainer>
//                         ))
//                     : <img src='https://via.placeholder.com/300' alt="Product" style={{ maxWidth: '300px', height: '300px' }} />}
//                 </ImagePreviewContainer>
                
//                 <StyledFormControl>
//                     <InputTextField 
//                         onChange={handleChange} 
//                         value={product.adTitle}
//                         name='adTitle' 
//                         placeholder="Ad Title" 
//                     />
//                     <InputTextField 
//                         onChange={handleChange} 
//                         value={product.price}
//                         name='price' 
//                         placeholder="Price" 
//                         type="number"
//                     />
//                     <Select
//                         value={category}
//                         onChange={handleCategoryChange}
//                         displayEmpty
//                         style={{ minWidth: '200px', margin: '10px' }}
//                     >
//                         <MenuItem value="" disabled>Select Category</MenuItem>
//                         <MenuItem value="Fruits & Vegetables">Fruits & Vegetables</MenuItem>
//                         <MenuItem value="Dairy & Bakery">Dairy & Bakery</MenuItem>
//                         <MenuItem value="Staples">Staples</MenuItem>
//                         <MenuItem value="Snacks & Branded Foods">Snacks & Branded Foods</MenuItem>
//                         <MenuItem value="Beverages">Beverages</MenuItem>
//                         <MenuItem value="Personal Care">Personal Care</MenuItem>
//                         <MenuItem value="Home Care">Home Care</MenuItem>
//                         <MenuItem value="Mom & Baby Care">Mom & Baby Care</MenuItem>
//                         <MenuItem value="Pets">Pets</MenuItem>
//                     </Select>

//                     <label htmlFor="fileInput">
//                         <Add fontSize="large" color="action" />
//                     </label>
//                     <input
//                         type="file"
//                         id="fileInput"
//                         style={{ display: "none" }}
//                         onChange={handleImageChange}
//                         multiple
//                     />
//                     <Box style={{ width: '100%', textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
//                         You can upload up to 5 images.
//                     </Box>
//                     <AddProductButton onClick={saveProduct} variant="contained" color="primary">Add Product</AddProductButton>
//                 </StyledFormControl>

//                 <TextareaAutosize
//                     placeholder="Product Description"
//                     value={product.description}
//                     name='description'
//                     onChange={handleChange}
//                     style={{ width: '100%', border: 'none', marginTop: '10px', fontSize: '18px', minHeight: '100px', resize: 'vertical' }}
//                 />
//             </Container>
//         </>
//     )
// }

// export default AddProduct;
import React, { useState, useEffect } from 'react';
import { styled, Box, Button, InputBase, FormControl, Select, MenuItem } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import NavBar2 from './Navbar2';

const Container = styled(Box)(({ theme }) => ({
    margin: '0px 10px 10px 50px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
    // backgroundImage:'url(https://i.pinimg.com/originals/0c/ea/6f/0cea6fabe4d9d5256e0d1b2474927732.jpg)'
}));

const StyledFormControl = styled(FormControl)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
    flexWrap: 'wrap',
});

const InputTextField = styled(InputBase)({
    fontSize: '18px',
    flex: '1',
    minWidth: '250px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    '&:focus': {
        outline: 'none',
        borderColor: '#4CAF50', // Green color
    },
});

const AddProductButton = styled(Button)({
    marginLeft: 'auto',
    marginTop: '10px',
    fontSize: '16px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50', // Green color
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#45a049', // Darker green color
    },
});

const ImagePreviewContainer = styled(Box)({
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '10px'
});

const ImageContainer = styled(Box)({
    position: 'relative',
    width: '300px',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
});

const AddProduct = () => {
    const { userId: urlUserId } = useParams();
    const [userId, setUserId] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (!userId) {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                setUserId(storedUserId);
            } else {
                setUserId(urlUserId);
                localStorage.setItem('userId', urlUserId);
            }
        }
    }, [userId, urlUserId]);

    const [product, setProduct] = useState({
        userId: userId,
        adTitle: '',
        price: '',
        description: '',
        category: '',
        images: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setProduct({ ...product, category: e.target.value });
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (product.images.length + files.length > 5) {
            toast.error('You can upload a maximum of 5 images.');
            return;
        }
        setProduct({ ...product, images: [...product.images, ...files] });
    }

    const removeImage = (index) => {
        const newimages = [...product.images];
        newimages.splice(index, 1);
        setProduct({ ...product, images: newimages });
    }

    const saveProduct = async () => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('adTitle', product.adTitle);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('category', product.category);
        product.images.forEach(photo => {
            formData.append('images', photo);
        });

        try {
            const response = await fetch(`https://uniswap-backend-gj25.onrender.com/api/uploadProducts`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                toast.success('Product added successfully!');
                setProduct({
                    userId: userId,
                    adTitle: '',
                    price: '',
                    description: '',
                    category: '',
                    images: []
                });
                setCategory('');
            } else {
                toast.error('Failed to add product.');
            }
        } catch (error) {
            console.error('Error occurred while adding product:', error);
            toast.error('Error occurred while adding product.');
        }
    }

    return (
        <>
        <NavBar2/>
            <Container>
                <ToastContainer autoClose={2000} />
                <br/><br/><br/><br/>
                <ImagePreviewContainer>
                    {product.images.length > 0 ? 
                        product.images.map((photo, index) => (
                            <ImageContainer key={index}>
                                <img src={URL.createObjectURL(photo)} alt="Product" />
                                <Button 
                                    onClick={() => removeImage(index)} 
                                    style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                                >
                                    X
                                </Button>
                            </ImageContainer>
                        ))
                    : <img src='https://via.placeholder.com/300' alt="Product" style={{ maxWidth: '300px', height: '300px' }} />}
                </ImagePreviewContainer>
                
                <StyledFormControl>
                    <InputTextField 
                        onChange={handleChange} 
                        value={product.adTitle}
                        name='adTitle' 
                        placeholder="Ad Title"
                    />
                    <InputTextField 
                        onChange={handleChange} 
                        value={product.price}
                        name='price' 
                        placeholder="Price" 
                        type="number"
                    />
                    <Select
                        value={category}
                        onChange={handleCategoryChange}
                        displayEmpty
                        style={{ minWidth: '200px', margin: '10px' }}
                    >
                        <MenuItem value="" disabled>Select Category</MenuItem>
                        <MenuItem value="IOT Kits">IOT Kits</MenuItem>
                        <MenuItem value="Stationaries">Stationaries</MenuItem>
                        <MenuItem value="Electronic Gadgets">Electronic Gadgets</MenuItem>
                        <MenuItem value="Books">Books</MenuItem>
                        <MenuItem value="Sports Equipment">Sports Equipment</MenuItem>
                        <MenuItem value="Hostel Supplies">Hostel Supplies</MenuItem>

                        <MenuItem value="Music Instruments">Music Instruments</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                        
           <MenuItem value="Music Instruments">s</MenuItem>

                    </Select>

                    <label htmlFor="fileInput">
                        <Add fontSize="large" color="action" />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                        multiple
                    />
                                        <Box style={{ width: '100%', textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
                        You can upload up to 5 images.
                    </Box>
                    <AddProductButton onClick={saveProduct} variant="contained" color="primary">Add Product</AddProductButton>
                </StyledFormControl>

                <TextareaAutosize
                    placeholder="Product Description"
                    value={product.description}
                    name='description'
                    onChange={handleChange}
                    style={{ width: '100%', border: '1px solid black', marginTop: '10px', fontSize: '18px', minHeight: '100px', resize: 'vertical' }}
                />
            </Container>
        </>
    )
}

export default AddProduct;

                       
