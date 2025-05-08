import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext'; 

// Styled components
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const FormContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 24px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      if (response.status === 200) {
        login(response.data.token); 
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <LoginWrapper>
      <FormContainer>
        <Title>Login</Title>
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Login</Button>
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'black'}}>
  Don't have an account?{' '}
  <a href="/register" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>
    Register
  </a>
</p>
        </form>
      </FormContainer>
    </LoginWrapper>
  );
};

export default Login;
