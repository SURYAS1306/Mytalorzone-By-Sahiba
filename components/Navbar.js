import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background: ${props => props.isTransparent ? 'transparent' : 'rgba(255, 255, 255, 0.95)'};
  box-shadow: ${props => props.isTransparent ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.1)'};
  backdrop-filter: ${props => props.isTransparent ? 'none' : 'blur(10px)'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  text-decoration: none;
  transition: color 0.3s ease;
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 80%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
`;

const NavLink = styled(Link)`
  color: #2d3748;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #9f7aea;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }

  ${props => props.active && `
    &:after {
      width: 100%;
    }
  `}
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #2d3748;
  display: flex;
  align-items: center;
  padding: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #9f7aea;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isHome = location.pathname === '/';
      const scrollPosition = window.scrollY;
      setIsTransparent(isHome && scrollPosition < 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const isHome = location.pathname === '/';
    setIsTransparent(isHome);
  }, [location.pathname]);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  };

  return (
    <>
      <Nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        isTransparent={isTransparent}
      >
        <Container>
          <Logo to="/" isTransparent={isTransparent}>
            Mytalorzone By Sahiba
          </Logo>

          <MenuItems>
            {menuItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                isTransparent={isTransparent}
                active={location.pathname === item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </MenuItems>

          <MenuItems>
            <IconButton isTransparent={isTransparent}>
              <ShoppingCartIcon />
              <CartCount>0</CartCount>
            </IconButton>
            {user ? (
              <IconButton isTransparent={isTransparent} onClick={logout}>
                <PersonOutlineIcon />
              </IconButton>
            ) : (
              <NavLink to="/login" isTransparent={isTransparent}>
                Login
              </NavLink>
            )}
          </MenuItems>

          <MobileMenuButton
            isTransparent={isTransparent}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon />
          </MobileMenuButton>
        </Container>
      </Nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileMenu
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <IconButton onClick={() => setIsMobileMenuOpen(false)}>
                <CloseIcon />
              </IconButton>
              <MobileMenuItems>
                {menuItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    isTransparent={true}
                    active={location.pathname === item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
                {user ? (
                  <NavLink to="/profile" isTransparent={true}>
                    Profile
                  </NavLink>
                ) : (
                  <NavLink to="/login" isTransparent={true}>
                    Login
                  </NavLink>
                )}
              </MobileMenuItems>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
