
// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import NavBar2 from './Navbar2';

// const categories = [
//   { id: 2, name: 'Books', image: 'https://miro.medium.com/v2/resize:fit:1200/1*S81O15rjKfG-BFdnNC6-GQ.jpeg' },
//   { id: 3, name: 'Stationaries', image: 'https://media.istockphoto.com/id/485725200/photo/school-and-office-accessories-on-wooden-background.jpg?s=612x612&w=0&k=20&c=PWgiIA-7_QDC_PXnEhwZqDLDDzrNMIxxJjBeD4h4oLM=' },
//   { id: 4, name: 'IOT Kits', image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/347979126/TZ/JW/NV/198942079/iot-starter-kit-for-getting-started-with-iot-500x500.png' },
//   { id: 5, name: 'Electronic Gadgets', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0TwIC2ed15bmoLfTsFPLmKu5bXYSMzjSFhQ&s' },
//   { id: 7, name: 'Sports Equipment', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2XiBKa4r9iA1v0gYGRUGcP2RCQYhVe32cFg&s' },
//   { id: 10, name: 'Hostel Supplies', image: 'https://files.ekmcdn.com/hotelsupplies/resources/design/hsl-logo_2020.png' },
//   { id: 8, name: 'Music instruments', image: 'https://media.istockphoto.com/id/894058154/photo/musical-instruments.jpg?s=612x612&w=0&k=20&c=uB0TFyqeY1wu1BPyH2EB7NMoOCaSb86pk7YNQ5QVCGQ=' },
//   { id: 9, name: 'Others', image: 'https://cdn6.aptoide.com/imgs/e/d/5/ed53edb4d39029d34c4548bd6e90f371_icon.png' },
// ];
// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Retrieve the query parameters from the URL
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get('userId');

//   const handleCategoryClick = (name) => {
//     navigate(`/products?category=${name}&userId=${userId}`);
//   };

//   return (
//     <>
//       <NavBar2 />
//       <style>
//         {`
//           body {
//             margin: 0;
//             padding: 0;
//             font-family: Arial, sans-serif;
//           }
//           .background {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: url('https://images.unsplash.com/photo-1516110833967-0b5716e70b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') no-repeat center center fixed;
//             background-size: cover;
//             filter: blur(10px);
//             z-index: -1;
//           }
//           .main-container {
//             position: relative;
//             z-index: -1;
//             width: 100%;
//             height: 100%;
//             padding: 20px;
//             box-sizing: border-box;
//             background: rgba(255, 255, 255, 0.8);
//             overflow: auto;
//           }
//           .categories-container {
//             display: grid;
//             grid-template-columns: repeat(4, 1fr);
//             gap: 20px;
//             padding: 20px;
//             justify-content: center;
//             align-items: center;
//           }
//           .category-box {
//             text-align: center;
//             cursor: pointer;
//             background: rgba(255, 255, 255, 0.7);
//             padding: 10px;
//             border-radius: 10px;
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//           }
//           .category-box:hover {
//             transform: scale(1.05);
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//           }
//           .category-box img {
//             width: 100%;
//             height: auto;
//             border-radius: 5px;
//           }
//         `}
//       </style>
//       <div className="background"></div>
//       <div className="main-container">
//         <div className="categories-container">
//           {categories.map(category => (
//             <div key={category.id} className="category-box" onClick={() => handleCategoryClick(category.name)}>
//               <img src={category.image} alt={category.name} />
//               <h3>{category.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import NavBar2 from './Navbar2';

// const categories = [
//   { id: 2, name: 'Books', image: 'https://miro.medium.com/v2/resize:fit:1200/1*S81O15rjKfG-BFdnNC6-GQ.jpeg' },
//   { id: 3, name: 'Stationaries', image: 'https://media.istockphoto.com/id/485725200/photo/school-and-office-accessories-on-wooden-background.jpg?s=612x612&w=0&k=20&c=PWgiIA-7_QDC_PXnEhwZqDLDDzrNMIxxJjBeD4h4oLM=' },
//   { id: 4, name: 'IOT Kits', image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/347979126/TZ/JW/NV/198942079/iot-starter-kit-for-getting-started-with-iot-500x500.png' },
//   { id: 5, name: 'Electronic Gadgets', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0TwIC2ed15bmoLfTsFPLmKu5bXYSMzjSFhQ&s' },
//   { id: 7, name: 'Sports Equipment', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2XiBKa4r9iA1v0gYGRUGcP2RCQYhVe32cFg&s' },
//   { id: 10, name: 'Hostel Supplies', image: 'https://files.ekmcdn.com/hotelsupplies/resources/design/hsl-logo_2020.png' },
//   { id: 8, name: 'Music instruments', image: 'https://media.istockphoto.com/id/894058154/photo/musical-instruments.jpg?s=612x612&w=0&k=20&c=uB0TFyqeY1wu1BPyH2EB7NMoOCaSb86pk7YNQ5QVCGQ=' },
//   { id: 9, name: 'Others', image: 'https://cdn6.aptoide.com/imgs/e/d/5/ed53edb4d39029d34c4548bd6e90f371_icon.png' },
// ];

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Retrieve the query parameters from the URL
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get('userId');

//   const handleCategoryClick = (name) => {
//     navigate(`/products?category=${name}&userId=${userId}`);
//   };

//   return (
//     <>
//       <NavBar2 />
//       <style>
//         {`

//           body {
//             margin: 0;
//             padding: 0;
//             font-family: Arial, sans-serif;
//         }
//           .background {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: url('https://images.unsplash.com/photo-1516110833967-0b5716e70b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') no-repeat center center fixed;
//             background-size: cover;
//             filter: blur(10px);
//             z-index: -1;
//           }
//           .main-container {

//             position: relative;
//             z-index: 1;
//             width: 100%;
//             height: 100%;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             padding: 20px;
//             box-sizing: border-box;
//             background: rgba(255, 255, 255, 0.8);
//             overflow: auto;
//           }
//           .categories-container {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             gap: 20px;
//             padding: 30px;
//             justify-content: center;
//             align-items: center;
//             max-width: 1200px;
//             margin: 0 auto;
//           }
//           .category-box {
//             text-align: center;
//             cursor: pointer;
//             background: white;
//             padding: 10px;
//             border-radius: 10px;
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//           }
//           .category-box:hover {
//             transform: scale(1.05);
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//           }
//           .category-box img {
//             width: 100%;

//             height: 220px; /* Set a fixed height */
//             object-fit: cover; /* Maintain aspect ratio and cover the area */
//             border-radius: 5px;

//             height: auto;
//             border-radius: 10px;
//             margin-bottom: 10px;
//           }
//           .category-box h3 {
//             font-size: 1.2rem;
//             font-weight: bold;
//             color: #333;

//           }
//         `}
//       </style>
//       <div className="background"></div>
//       <div className="main-container">
//         <div className="categories-container">
//           {categories.map(category => (
//             <div key={category.id} className="category-box" onClick={() => handleCategoryClick(category.name)}>
//               <img src={category.image} alt={category.name} />
//               <h3>{category.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;


// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import NavBar2 from './Navbar2';

// const categories = [
//   { id: 2, name: 'Books', image: 'https://miro.medium.com/v2/resize:fit:1200/1*S81O15rjKfG-BFdnNC6-GQ.jpeg' },
//   { id: 3, name: 'Stationaries', image: 'https://media.istockphoto.com/id/485725200/photo/school-and-office-accessories-on-wooden-background.jpg?s=612x612&w=0&k=20&c=PWgiIA-7_QDC_PXnEhwZqDLDDzrNMIxxJjBeD4h4oLM=' },
//   { id: 4, name: 'IOT Kits', image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/347979126/TZ/JW/NV/198942079/iot-starter-kit-for-getting-started-with-iot-500x500.png' },
//   { id: 5, name: 'Electronic Gadgets', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0TwIC2ed15bmoLfTsFPLmKu5bXYSMzjSFhQ&s' },
//   { id: 7, name: 'Sports Equipment', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2XiBKa4r9iA1v0gYGRUGcP2RCQYhVe32cFg&s' },
//   { id: 10, name: 'Hostel Supplies', image: 'https://files.ekmcdn.com/hotelsupplies/resources/design/hsl-logo_2020.png' },
//   { id: 8, name: 'Music instruments', image: 'https://media.istockphoto.com/id/894058154/photo/musical-instruments.jpg?s=612x612&w=0&k=20&c=uB0TFyqeY1wu1BPyH2EB7NMoOCaSb86pk7YNQ5QVCGQ=' },
//   { id: 9, name: 'Others', image: 'https://cdn6.aptoide.com/imgs/e/d/5/ed53edb4d39029d34c4548bd6e90f371_icon.png' },
// ];

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Retrieve the query parameters from the URL
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get('userId');

//   const handleCategoryClick = (name) => {
//     navigate(`/products?category=${name}&userId=${userId}`);
//   };

//   return (
//     <>
//       <NavBar2 />
//       <style>
//         {`
//           body {
//             margin: 0;
//             padding: 0;
//             font-family: Arial, sans-serif;
//           }
//           .background {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: url('https://images.unsplash.com/photo-1516110833967-0b5716e70b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') no-repeat center center fixed;
//             background-size: cover;
//             filter: blur(10px);
//             z-index: -1;
//           }
//           .main-container {
//             position: relative;
//             z-index: 1;
//             width: 100%;
//             height: 100%;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             padding: 20px;
//             box-sizing: border-box;
//             background: rgba(255, 255, 255, 0.8);
//             overflow: auto;
//           }
//           .categories-container {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             gap: 30px;
//             padding: 30px;
//             justify-content: center;
//             align-items: center;
//             max-width: 1200px;
//             margin: 0 auto;
//           }
//           .category-box {
//             text-align: center;
//             cursor: pointer;
//             background: white;
//             padding: 10px;
//             border-radius: 10px;
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//             z-index: 1;
//           }
//           .category-box:hover {
//             transform: scale(1.05);
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//             z-index: 2;
//           }
//           .category-box img {
//             width: 100%;
//             height: 200px;
//             object-fit: cover;
//             border-radius: 10px;
//             margin-bottom: 10px;
//           }
//           .category-box h3 {
//             font-size: 1.2rem;
//             font-weight: bold;
//             color: #333;
//           }
//         `}
//       </style>
//       <div className="background"></div>
//       <div className="main-container">
//         <div className="categories-container">
//           {categories.map((category) => (
//             <div key={category.id} className="category-box" onClick={() => handleCategoryClick(category.name)}>
//               <img src={category.image} alt={category.name} />
//               <h3>{category.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar2 from './Navbar2';

const categories = [
  { id: 2, name: 'Books', image: 'https://miro.medium.com/v2/resize:fit:1200/1*S81O15rjKfG-BFdnNC6-GQ.jpeg' },
  { id: 3, name: 'Stationaries', image: 'https://media.istockphoto.com/id/485725200/photo/school-and-office-accessories-on-wooden-background.jpg?s=612x612&w=0&k=20&c=PWgiIA-7_QDC_PXnEhwZqDLDDzrNMIxxJjBeD4h4oLM=' },
  { id: 4, name: 'IOT Kits', image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/347979126/TZ/JW/NV/198942079/iot-starter-kit-for-getting-started-with-iot-500x500.png' },
  { id: 5, name: 'Electronic Gadgets', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0TwIC2ed15bmoLfTsFPLmKu5bXYSMzjSFhQ&s' },
  { id: 7, name: 'Sports Equipment', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2XiBKa4r9iA1v0gYGRUGcP2RCQYhVe32cFg&s' },
  { id: 10, name: 'Hostel Supplies', image: 'https://files.ekmcdn.com/hotelsupplies/resources/design/hsl-logo_2020.png' },
  { id: 8, name: 'Music instruments', image: 'https://media.istockphoto.com/id/894058154/photo/musical-instruments.jpg?s=612x612&w=0&k=20&c=uB0TFyqeY1wu1BPyH2EB7NMoOCaSb86pk7YNQ5QVCGQ=' },
  { id: 9, name: 'Others', image: 'https://cdn6.aptoide.com/imgs/e/d/5/ed53edb4d39029d34c4548bd6e90f371_icon.png' },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  const handleCategoryClick = (name) => {
    navigate(`/products?category=${name}&userId=${userId}`);
  };

  return (
    <>
      <NavBar2 />
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('https://images.unsplash.com/photo-1516110833967-0b5716e70b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') no-repeat center center fixed;
            background-size: cover;
            filter: blur(10px);
            z-index: -1;
          }
          .navbar {
            z-index: 10;
          }
          .main-container {
            position: relative;
            z-index: 1;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0.8);
            overflow: auto;
          }
          .categories-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 30px;
            justify-content: center;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
          }
          .category-box {
            text-align: center;
            cursor: pointer;
            background: white;
            padding: 10px;
            border-radius: 10px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .category-box:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .category-box img {
            width: 100%;
            height: 220px;
            object-fit: cover;
            border-radius: 5px;
            margin-bottom: 10px;
          }
          .category-box h3 {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
          }
        `}
      </style>
      <div className="background"></div>
      <div className="main-container">
        <div className="categories-container">
          {categories.map(category => (
            <div key={category.id} className="category-box" onClick={() => handleCategoryClick(category.name)}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
