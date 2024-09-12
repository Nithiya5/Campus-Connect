import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faWhatsapp, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from './new5678.png';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
/* Slightly transparent background */
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem; /* Adjust font size as needed */
  font-weight: bold;
  color: white;
`;

const NavLogoImage = styled.img`
  width: 60px; /* Adjust logo size as needed */
  height: auto;
  margin-right: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
  font-size: 1.2rem;
  transition: color 0.3s ease; /* Smooth color transition */

  &:hover {
    color: #ff9900;
    text-decoration: underline;
  }
`;

const AboutUsPageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-top: 10px; /* Adjust for fixed navbar */
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://st2.depositphotos.com/1071909/9476/i/450/depositphotos_94765874-stock-photo-office-interior-background.jpg'); /* Update with your image path */
  background-size: cover;
  background-position: center;
  z-index: -1;
  filter: brightness(0.7);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  padding: 2rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0); /* Slightly transparent background */
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 2.5rem; /* Adjust font size as needed */
  color: white;
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-in-out;
`;

const SectionTitle = styled.h2`
  font-size: 2rem; /* Adjust font size as needed */
  color: white;
  margin-bottom: 1rem;
  animation: fadeIn 1s ease-in-out;
`;

const Description = styled.p`
  font-size: 1.2rem; /* Adjust font size as needed */
  color: white;
  line-height: 1.6;
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-in-out;
`;

const MissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const MissionContent = styled.div`
  flex: 1;
  text-align: left;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 1rem;
  }
`;

const MissionImage = styled.img`
  width: 300px; /* Adjust image width */
  height: auto; /* Maintain aspect ratio */
  border-radius: 10px; /* Add border radius */
  transition: transform 0.3s ease; /* Smooth transform transition */

  &:hover {
    transform: scale(1.05);
  }
`;

const VisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const VisionContent = styled.div`
  flex: 1;
  text-align: left;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-left: 1rem;
  }
`;

const VisionImage = styled.img`
  width: 340px; /* Adjust image width */
  height: auto; /* Maintain aspect ratio */
  border-radius: 10px; /* Add border radius */
  transition: transform 0.3s ease; /* Smooth transform transition */

  &:hover {
    transform: scale(1.05);
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  animation: fadeIn 1s ease-in-out;
`;

const IconLink = styled.a`
  color: white;
  margin: 0 1rem;
  font-size: 2rem;
  transition: color 0.3s ease, transform 0.3s ease; /* Smooth color and transform transitions */

  &:hover {
    color: #ff9900; /* Change hover color as needed */
    transform: scale(1.2);
  }
`;

const AboutUs = () => {
  return (
    <AboutUsPageContainer>
      <BackgroundImage />
      <NavBar>
        <NavLogo>
          <NavLogoImage src={logo} alt="Campus Connect Logo" />
          <span style={{ fontSize: '1.5rem' }}>Campus Connect</span>
        </NavLogo>
        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/register">Register</NavLink>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/aboutus">About Us</NavLink>
        </NavLinks>
      </NavBar>
      <ContentContainer>
        <SectionTitle>Our Mission</SectionTitle>
        <MissionContainer>
          <MissionContent>
            <Description>
              Our mission is to create a secure and convenient platform for college students to buy, sell, and exchange items within the campus community. We aim to foster a vibrant and supportive environment where students can find what they need and connect with their peers.
            </Description>
          </MissionContent>
          <MissionImage src="https://i.pinimg.com/originals/13/60/4f/13604fe33e65091a7f4b11c38210578f.jpg" alt="Mission Image" />
        </MissionContainer>
        <SectionTitle>Our Vision</SectionTitle>
        <VisionContainer>
        <VisionContent>
            <Description>
              We envision a connected campus where students have easy access to resources and can support each other through the exchange of goods and services. Campus Connect strives to be the go-to platform for students to fulfill their needs and enhance their campus experience.
            </Description>
          </VisionContent>
          <VisionImage src="https://media.istockphoto.com/id/649195666/photo/office-supplies-still-life.jpg?s=612x612&w=0&k=20&c=npYjedECC8Lt-g31egnnl0yOhY7SIjfZIT9h2CdxQbE=" alt="Vision Image" />
         
        </VisionContainer>
        <SocialMediaIcons>
          <IconLink href="https://www.linkedin.com" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} />
          </IconLink>
          <IconLink href="https://www.whatsapp.com" target="_blank">
            <FontAwesomeIcon icon={faWhatsapp} />
          </IconLink>
          <IconLink href="https://www.twitter.com" target="_blank">
            <FontAwesomeIcon icon={faTwitter} />
          </IconLink>
          <IconLink href="https://www.instagram.com" target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </IconLink>
        </SocialMediaIcons>
      </ContentContainer>
    </AboutUsPageContainer>
  );
};

export default AboutUs;
