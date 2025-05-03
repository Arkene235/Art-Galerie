import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(animated.div)`
  background: #333;
  color: white;
  padding: 40px;
  border-radius: 10px;
  width: 50%;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

function Modal({ onClose, children }) {
  const animation = useSpring({ opacity: 1, transform: 'scale(1)', from: { opacity: 0, transform: 'scale(0.8)' } });

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent style={animation} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalContent>
    </ModalBackground>
  );
}

export default Modal;
