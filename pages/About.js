import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 120px auto 60px;
  padding: 0 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  color: #2d3748;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const TextContent = styled.div`
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.8;

  p {
    margin-bottom: 20px;
  }

  h2 {
    font-family: 'Playfair Display', serif;
    color: #2d3748;
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const ImageSection = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/5;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;

  h3 {
    font-family: 'Playfair Display', serif;
    color: #2d3748;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
  }
`;

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AboutContainer>
        <Header>
          <Title>About Us</Title>
        </Header>

        <ContentSection>
          <TextContent>
            <h2>Welcome to Mytalorzone By Sahiba</h2>
            <p>
              Mytalorzone By Sahiba is a clothing brand that offers creative, unique, and diverse clothing for
              girls, including traditional, western, and trendy styles.
            </p>
            <p>
              Our mission is to provide fashion-forward individuals with high-quality clothing that reflects their 
              personality and style. We believe that fashion is a form of self-expression, and our collections are 
              designed to help you make a statement.
            </p>
            <p>
              With attention to detail and a commitment to quality, each piece in our collection is carefully 
              crafted to ensure both style and comfort. We take pride in offering a diverse range of options 
              that cater to different tastes and occasions.
            </p>
          </TextContent>

          <ImageSection>
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" 
              alt="Mytalorzone By Sahiba Collection" 
            />
          </ImageSection>
        </ContentSection>

        <Features>
          <FeatureCard
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Traditional</h3>
            <p>Elegant and timeless traditional wear that celebrates our rich cultural heritage.</p>
          </FeatureCard>

          <FeatureCard
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Western</h3>
            <p>Contemporary western styles that keep you in sync with global fashion trends.</p>
          </FeatureCard>

          <FeatureCard
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3>Trendy</h3>
            <p>Fashion-forward designs that blend modern aesthetics with comfortable wear.</p>
          </FeatureCard>
        </Features>
      </AboutContainer>
    </motion.div>
  );
};

export default About;
