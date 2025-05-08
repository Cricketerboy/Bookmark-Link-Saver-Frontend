import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // 👈 import theme context

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme.isDarkMode ? '#121212' : '#f7f9fc')};
`;

const FormBox = styled.div`
  background: ${({ theme }) => (theme.isDarkMode ? '#1e1e1e' : '#fff')};
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 25px ${({ theme }) => (theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#333')};
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid ${({ theme }) => (theme.isDarkMode ? '#555' : '#ddd')};
  background: ${({ theme }) => (theme.isDarkMode ? '#2a2a2a' : '#fff')};
  color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#000')};
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 16px;
  transition: 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 30px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const AddBookmark = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();
  const { isDarkMode } = useTheme(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/api/bookmarks',
        { url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        navigate('/');
      }
    } catch (err) {
      console.error('Error adding bookmark:', err.response?.data || err.message);
    }
  };

  return (
    <Container theme={{ isDarkMode }}>
      <FormBox theme={{ isDarkMode }}>
        <Title theme={{ isDarkMode }}>Add a New Bookmark</Title>
        <form onSubmit={handleSubmit}>
          <Input
            theme={{ isDarkMode }}
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit">Add Bookmark</Button>
        </form>
      </FormBox>
    </Container>
  );
};

export default AddBookmark;
