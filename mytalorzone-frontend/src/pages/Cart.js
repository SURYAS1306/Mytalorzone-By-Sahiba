import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  font-family: 'Playfair Display', serif;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled(Link)`
  font-size: 1.1rem;
  color: #333;
  text-decoration: none;
  margin-bottom: 5px;

  &:hover {
    color: #9f7aea;
  }
`;

const ItemSize = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const ItemPrice = styled.p`
  font-weight: bold;
  color: #9f7aea;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  padding: 5px;

  &:hover {
    color: #c53030;
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    margin-bottom: 30px;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
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

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart', {
        withCredentials: true
      });
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put('http://localhost:5000/api/cart/update', {
        itemId,
        quantity: newQuantity
      }, {
        withCredentials: true
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
        withCredentials: true
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 99;
  const total = subtotal + shipping;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartContainer>
      <CartTitle>Shopping Cart</CartTitle>
      <CartGrid>
        <CartItems>
          {cartItems.map(item => (
            <CartItem key={item._id}>
              <ItemImage src={item.imageUrl} alt={item.name} />
              <ItemInfo>
                <div>
                  <ItemName to={`/product/${item.productId}`}>{item.name}</ItemName>
                  <ItemSize>Size: {item.size}</ItemSize>
                </div>
                <ItemPrice>₹{item.price}</ItemPrice>
              </ItemInfo>
              <div>
                <DeleteButton onClick={() => removeItem(item._id)}>
                  <DeleteOutlineIcon />
                </DeleteButton>
                <QuantityControl>
                  <QuantityButton 
                    onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                  >
                    -
                  </QuantityButton>
                  <span>{item.quantity}</span>
                  <QuantityButton 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>
              </div>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryItem>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </SummaryItem>
          <SummaryItem>
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </SummaryItem>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </CartSummary>
      </CartGrid>
    </CartContainer>
  );
}

export default Cart;
