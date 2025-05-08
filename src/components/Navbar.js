import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const NavbarWrapper = styled.nav`
  background: ${({ theme }) =>
    theme.isDarkMode
      ? 'linear-gradient(90deg, rgba(33, 33, 33, 1) 0%, rgba(0, 0, 0, 1) 100%)'
      : 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(230, 230, 230, 1) 100%)'};
  padding: 20px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  border-bottom: 2px solid ${({ theme }) => (theme.isDarkMode ? '#444' : '#ddd')};
  box-sizing: border-box;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 100%;
  overflow-x: auto;
`;

const NavItem = styled.li`
  margin-left: 30px;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ isActive, theme }) =>
    isActive ? (theme.isDarkMode ? '#bb86fc' : '#007bff') : theme.isDarkMode ? '#fff' : '#333'};
  font-size: 18px;
  font-weight: 600;
  position: relative;
  padding: 5px 10px;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => (theme.isDarkMode ? '#bb86fc' : '#007bff')};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ isActive }) => (isActive ? '100%' : '0')};
    height: 2px;
    background-color: ${({ theme }) => (theme.isDarkMode ? '#bb86fc' : '#007bff')};
    transform: ${({ isActive }) => (isActive ? 'scaleX(1)' : 'scaleX(0)')};
    transform-origin: bottom left;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  color: ${({ isActive, theme }) =>
    isActive ? (theme.isDarkMode ? '#bb86fc' : '#007bff') : theme.isDarkMode ? '#fff' : '#333'};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  padding: 5px 10px;
  transition: color 0.3s ease;

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${({ theme }) => (theme.isDarkMode ? '#bb86fc' : '#007bff')};
  }
`;

const ThemeToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#333')};
  font-size: 24px;
  cursor: pointer;
  margin-left: 20px;

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${({ theme }) => (theme.isDarkMode ? '#bb86fc' : '#007bff')};
  }
`;

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Get theme context to toggle the theme
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <NavbarWrapper theme={{ isDarkMode }}>
      <NavList>
        <NavItem>
          <StyledLink to="/" theme={{ isDarkMode }} isActive={location.pathname === '/'}>
            Home
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/add" theme={{ isDarkMode }} isActive={location.pathname === '/add'}>
            Add Bookmark
          </StyledLink>
        </NavItem>
        {localStorage.getItem('token') ? (
          <NavItem>
            <Button
              onClick={handleLogout}
              isActive={location.pathname === '/login'}
              theme={{ isDarkMode }}
            >
              Logout
            </Button>
          </NavItem>
        ) : (
          <>
            <NavItem>
              <StyledLink
                to="/login"
                theme={{ isDarkMode }}
                isActive={location.pathname === '/login'}
              >
                Login
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink
                to="/register"
                theme={{ isDarkMode }}
                isActive={location.pathname === '/register'}
              >
                Register
              </StyledLink>
            </NavItem>
          </>
        )}
        <NavItem>
          <ThemeToggleButton onClick={toggleTheme}>
            {isDarkMode ? (
              <FiSun style={{ color: '#fff' }} />
            ) : (
              <FiMoon style={{ color: 'black' }} />
            )}
          </ThemeToggleButton>
        </NavItem>
      </NavList>
    </NavbarWrapper>
  );
};

export default Navbar;
