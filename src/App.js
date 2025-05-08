import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AddBookmark from './components/AddBookmark';
import BookmarkList from './components/BookmarkList';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext'; // Add ThemeProvider and useTheme
import styled, { createGlobalStyle } from 'styled-components';

// Global styles based on the current theme
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => (theme.isDarkMode ? '#121212' : '#ffffff')};
    color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#333')};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Layout />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

function Layout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { isDarkMode } = useTheme(); // Get theme context to apply styles

  // Don't show navbar on login or register routes
  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {/* Apply global styles based on theme */}
      <GlobalStyle theme={{ isDarkMode }} />
      {isAuthenticated && !hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><BookmarkList /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddBookmark /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
