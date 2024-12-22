import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonStyles = `
  display: inline-block;
  padding: ${props => props.small ? '12px 24px' : '16px 32px'};
  background-color: ${props => props.variant === 'outlined' ? 'transparent' : '#9f7aea'};
  color: ${props => props.variant === 'outlined' ? '#9f7aea' : 'white'};
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  border: 2px solid #9f7aea;
  text-align: center;
  cursor: pointer;
  box-shadow: ${props => props.variant === 'outlined' ? 'none' : '0 4px 15px rgba(159, 122, 234, 0.3)'};

  &:hover {
    background-color: ${props => props.variant === 'outlined' ? '#9f7aea' : '#805ad5'};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(159, 122, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StyledButton = styled.button`${ButtonStyles}`;
const StyledLink = styled(Link)`${ButtonStyles}`;

const Button = ({ children, to, variant, small, disabled, onClick, type = 'button' }) => {
  if (to) {
    return (
      <StyledLink to={to} variant={variant} small={small}>
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton 
      variant={variant} 
      small={small} 
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
