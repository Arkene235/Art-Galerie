import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const HeaderContainer = styled.header`
  height: 70vh;
  background-image: url('background.jpg');
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled(animated.h1)`
  font-size: 3rem;
  color: white;
`;

function Header() {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  return (
    <HeaderContainer>
      <Title style={fadeIn}></Title>
    </HeaderContainer>
  );
}

export default Header;
