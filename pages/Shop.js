import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { products } from '../services/api';
import Loading from '../components/Loading';

const ShopContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const FilterSection = styled.div`
  margin-bottom: 30px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.active ? '#9f7aea' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #9f7aea;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #9f7aea;
    color: white;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
`;

const ProductCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #2d3748;
`;

const ProductPrice = styled.p`
  margin: 10px 0 0;
  color: #9f7aea;
  font-weight: 600;
`;

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await products.getProductsByCategory(selectedCategory);
        setProductList(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'western', name: 'Western' },
    { id: 'trendy', name: 'Trendy' }
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <ShopContainer>
      <FilterSection>
        {categories.map(category => (
          <FilterButton
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </FilterButton>
        ))}
      </FilterSection>

      <ProductGrid>
        {productList.map(product => (
          <ProductCard key={product.id} to={`/product/${product.id}`}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>₹{product.price.toLocaleString('en-IN')}</ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </ShopContainer>
  );
};

export default Shop;
