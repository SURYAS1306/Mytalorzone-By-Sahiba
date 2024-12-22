import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: sticky;
  top: 100px;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  padding: 20px 0;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  color: #9f7aea;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProductDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
`;

const SizeSelector = styled.div`
  margin-bottom: 30px;
`;

const SizeLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 10px;
`;

const SizeButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #9f7aea;
  background: ${props => props.selected ? '#9f7aea' : 'white'};
  color: ${props => props.selected ? 'white' : '#9f7aea'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #9f7aea;
    color: white;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 15px 30px;
  background: #9f7aea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #805ad5;
  }
`;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        productId: id,
        size: selectedSize,
        quantity: 1
      }, {
        withCredentials: true
      });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <ProductContainer>
      <ImageSection>
        <MainImage src={product.imageUrl} alt={product.name} />
      </ImageSection>

      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>₹{product.price}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>

        <SizeSelector>
          <SizeLabel>Select Size</SizeLabel>
          <SizeOptions>
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <SizeButton
                key={size}
                selected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </SizeButton>
            ))}
          </SizeOptions>
        </SizeSelector>

        <AddToCartButton onClick={handleAddToCart}>
          Add to Cart
        </AddToCartButton>
      </ProductInfo>
    </ProductContainer>
  );
}

export default ProductDetail;
