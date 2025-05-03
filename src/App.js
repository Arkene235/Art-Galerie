import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './components/Header';
import Gallery from './components/Gallery';

// Wrapper principal de l'application
const AppContainer = styled.div`
  position: relative;
  text-align: center;
  color: #ffffff;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #2a2a72, #009ffd); /* Dégradé bleu */
  animation: gradientAnimation 15s ease infinite;
`;

// Dégradé animé
const gradientAnimation = keyframes`
  0% {
    background: linear-gradient(135deg, #2a2a72, #009ffd); /* Bleu */
  }
  50% {
    background: linear-gradient(135deg, #2a2a72, #009ffd); /* Bleu */
  }
  100% {
    background: linear-gradient(135deg, #2a2a72, #009ffd); /* Toujours Bleu */
  }
`;

// Animation des étoiles scintillantes
const createStars = () => {
  let stars = [];
  let numberOfStars = 150; // Nombre d'étoiles
  for (let i = 0; i < numberOfStars; i++) {
    const size = Math.random() * 2 + 1; // Taille des étoiles
    const xPosition = Math.random() * 100; // Position X (en pourcentage)
    const yPosition = Math.random() * 100; // Position Y (en pourcentage)
    const animationDelay = Math.random() * 2 + 's'; // Délai d'animation pour chaque étoile
    stars.push({
      size,
      xPosition,
      yPosition,
      animationDelay,
    });
  }
  return stars;
};

// Etoiles animées
const Star = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: white;
  border-radius: 50%;
  top: ${(props) => props.yPosition}%;
  left: ${(props) => props.xPosition}%;
  animation: ${keyframes`
    0% {
      opacity: 0.5;
      transform: translateX(0) translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateX(5px) translateY(5px);
    }
    100% {
      opacity: 0.5;
      transform: translateX(0) translateY(0);
    }
  `} 2s linear infinite;
  animation-delay: ${(props) => props.animationDelay};
`;

// Wrapper pour les autres composants
const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

function App() {
  const [stars, setStars] = useState([]);

  // Générer les étoiles au démarrage
  useEffect(() => {
    setStars(createStars());
  }, []);

  return (
    <AppContainer>
      <style>{`
        @keyframes gradientAnimation {
          0% {
            background: linear-gradient(135deg, #2a2a72, #009ffd); /* Bleu */
          }
          50% {
            background: linear-gradient(135deg, #2a2a72, #009ffd); /* Bleu */
          }
          100% {
            background: linear-gradient(135deg, #2a2a72, #009ffd); /* Toujours Bleu */
          }
        }
      `}</style>
      {/* Les étoiles animées */}
      {stars.map((star, index) => (
        <Star
          key={index}
          size={star.size}
          xPosition={star.xPosition}
          yPosition={star.yPosition}
          animationDelay={star.animationDelay}
        />
      ))}
      <ContentWrapper>
        <Header />
        <Gallery />
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
