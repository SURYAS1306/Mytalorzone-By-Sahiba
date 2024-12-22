import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  height: 90vh;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 15px 40px;
  background: #9f7aea;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CategorySection = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  font-family: 'Playfair Display', serif;
  color: #2d3748;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 0 20px;
`;

const CategoryCard = styled(Link)`
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  text-decoration: none;
  color: white;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5));
    z-index: 1;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const CategoryName = styled.h3`
  position: absolute;
  bottom: 30px;
  left: 30px;
  z-index: 2;
  font-size: 1.8rem;
  margin: 0;
  font-family: 'Playfair Display', serif;
`;

const categories = [
  {
    id: 'traditional',
    name: 'Traditional',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1974'
  },
  {
    id: 'western',
    name: 'Western',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070'
  },
  {
    id: 'trendy',
    name: 'Trendy',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070'
  }
];

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <HeroContent
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Title>Welcome to Mytalorzone By Sahiba</Title>
          <Subtitle>
            Discover our exclusive collection of traditional and modern clothing,
            crafted with love and attention to detail.
          </Subtitle>
          <CTAButton to="/shop">Shop Now</CTAButton>
        </HeroContent>
      </HeroSection>

      <CategorySection>
        <SectionTitle>Shop by Category</SectionTitle>
        <CategoryGrid>
          {categories.map(category => (
            <CategoryCard key={category.id} to={`/shop?category=${category.id}`}>
              <CategoryImage src={category.image} alt={category.name} />
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </CategorySection>
    </motion.div>
  );
};

export default Home;
