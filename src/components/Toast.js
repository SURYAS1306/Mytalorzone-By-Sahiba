import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const ToastContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastItem = styled(motion.div)`
  min-width: 300px;
  padding: 16px 20px;
  border-radius: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.3s ease-out;
  background-color: ${props => {
    switch (props.type) {
      case 'success':
        return '#48BB78';
      case 'error':
        return '#F56565';
      case 'warning':
        return '#ED8936';
      default:
        return '#4299E1';
    }
  }};
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <ToastContainer
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <ToastItem type={type}>
          <Message>{message}</Message>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ToastItem>
      </ToastContainer>
    </AnimatePresence>
  );
};

export default Toast;
