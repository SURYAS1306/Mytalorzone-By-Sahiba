import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { useToast } from '../context/ToastContext';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #f7fafc;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  color: #2d3748;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: #9f7aea;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 20px;
`;

const SizeSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

const SizeButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${props => props.selected ? '#9f7aea' : '#e2e8f0'};
  border-radius: 8px;
  background: ${props => props.selected ? '#9f7aea' : 'white'};
  color: ${props => props.selected ? 'white' : '#2d3748'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #9f7aea;
  }
`;

const AddToCartButton = styled(Button)`
  width: 100%;
  max-width: 400px;
`;

const Product = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // This would normally come from an API
  const product = {
    id,
    name: 'Elegant Summer Dress',
    price: 2499,
    description: 'A beautiful and comfortable summer dress perfect for any occasion. Made with high-quality breathable fabric that ensures comfort throughout the day.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  };

  const handleAddToCart = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showToast('Added to cart successfully!', 'success');
    }, 1000);
  };

  if (!product) {
    return <Loading fullScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ProductContainer>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.name} />
        </ImageContainer>
        <ProductInfo>
          <Title>{product.name}</Title>
          <Price>₹{product.price.toLocaleString('en-IN')}</Price>
          <Description>{product.description}</Description>
          
          <div>
            <h3>Select Size</h3>
            <SizeSelector>
              {product.sizes.map(size => (
                <SizeButton
                  key={size}
                  selected={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </SizeButton>
              ))}
            </SizeSelector>
          </div>

          <AddToCartButton
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? 'Adding to Cart...' : 'Add to Cart'}
          </AddToCartButton>
        </ProductInfo>
      </ProductContainer>
    </motion.div>
  );
};

export default Product;
