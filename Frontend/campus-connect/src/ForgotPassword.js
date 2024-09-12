import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #e9f0fb; /* Light blue background */
`;

const Card = styled.div`
  display: flex;
  width: 900px; /* Adjust width as needed */
  height: 500px; /* Adjust height as needed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
`;

const ImageSection = styled.div`
  flex: 1;
  background-color: #007bff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 350px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Highlight = styled.span`
  color: #007bff;
`;

const FormInputContainer = styled.div`
  position: relative;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px; /* Add padding for icon space */
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Icon = styled.i`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

const Message = styled.p`
  color: red;
  font-size: 14px;
`;

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    resetToken: ''
  });
  const [message, setMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenResponse = await fetch('https://uniswap-backend-gj25.onrender.com/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email })
      });

      if (tokenResponse.ok) {
        const data = await tokenResponse.json();
        setFormData({ ...formData, resetToken: data.resetToken });

        const resetResponse = await fetch('https://uniswap-backend-gj25.onrender.com/api/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: data.resetToken, password: formData.password })
        });

        if (resetResponse.ok) {
          setFormData({ email: '', password: '', resetToken: '' });
          setConfirmPassword('');
          setMessage('Password has been reset. Please login with your new password.');
        } else {
          throw new Error('Password reset failed');
        }
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Container>
      <Card>
        <ImageSection>
          <img src="https://img.freepik.com/premium-vector/forgot-password-illustration_65141-418.jpg" alt="Illustration" style={{ width: '80%', height: 'auto' }} /> {/* Replace with your illustration image URL */}
        </ImageSection>
        <FormSection>
          <FormContainer>
            <Title>
              Forgot your password? <Highlight>No worries!</Highlight>
            </Title>
            <form onSubmit={handleSubmit}>
              <FormInputContainer>
                <Icon className="fas fa-envelope"></Icon>
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormInputContainer>
              <FormInputContainer>
                <Icon className="fas fa-lock"></Icon>
                <FormInput
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </FormInputContainer>
              <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FormButton type="submit">Reset Password</FormButton>
            </form>
            {message && <Message>{message}</Message>}
            <p>
              <StyledLink to="/login">Back to Login</StyledLink>
            </p>
          </FormContainer>
        </FormSection>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
