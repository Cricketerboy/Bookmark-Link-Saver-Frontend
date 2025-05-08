import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => (theme.isDarkMode ? '#121212' : '#f4f4f4')};
`;

const FormContainer = styled.div`
  background-color: ${({ theme }) => (theme.isDarkMode ? '#333' : '#fff')};
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#333')};
  text-align: center;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => (theme.isDarkMode ? '#555' : '#ddd')};
  background-color: ${({ theme }) => (theme.isDarkMode ? '#444' : '#f9f9f9')};
  color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#333')};
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => (theme.isDarkMode ? '#6200ee' : '#007bff')};
    box-shadow: 0 0 8px rgba(98, 0, 238, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => (theme.isDarkMode ? '#6200ee' : '#007bff')};
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${({ theme }) => (theme.isDarkMode ? '#bb86fc' : '#0056b3')};
    transform: translateY(-5px);
  }

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', { email, password });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError('Error registering. Please try again.');
    }
  };

  return (
    <RegisterWrapper>
      <FormContainer>
        <Title>Register</Title>
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Register</Button>
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
  Already have an account?{' '}
  <a href="/login" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>
    Login
  </a>
</p>
        </form>
      </FormContainer>
    </RegisterWrapper>
  );
};

export default Register;
