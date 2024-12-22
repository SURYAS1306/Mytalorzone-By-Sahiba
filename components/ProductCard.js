import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 125%; // 4:5 aspect ratio
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 10px;
  font-weight: 600;
  color: #2d3748;
`;

const Price = styled.p`
  font-size: 1.1rem;
  color: #9f7aea;
  font-weight: 700;
  margin: 0;
`;

const Badge = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #9f7aea;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ProductCard = ({ product, index }) => {
  const { id, name, price, image, badge } = product;

  return (
    <StyledLink to={`/product/${id}`}>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <ImageContainer>
          {badge && <Badge>{badge}</Badge>}
          <Image src={image} alt={name} />
        </ImageContainer>
        <Content>
          <Title>{name}</Title>
          <Price>₹{price.toLocaleString('en-IN')}</Price>
        </Content>
      </Card>
    </StyledLink>
  );
};

export default ProductCard;
