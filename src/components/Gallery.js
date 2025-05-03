import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { FaTrash } from 'react-icons/fa';
import Modal from './Modal';

// Animations
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const shineAnimation = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Containers
const PageWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 40px 20px;
  background: linear-gradient(-45deg, #2a2a72, #009ffd, #2a2a72, #009ffd);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  min-height: 100vh;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const FormContainer = styled.form`
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

// Form elements
const Input = styled.input`
  padding: 12px;
  width: 300px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    border-color: #fff;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const AddButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Artwork item
const ArtItem = styled(animated.div)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 20px;
  width: 220px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.5);
  }

  img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s;

    &:hover {
      border-color: rgba(255, 255, 255, 0.5);
    }
  }

  h4 {
    color: white;
    margin: 10px 0;
    font-size: 1.1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  background: ${props => props.delete ? 'linear-gradient(45deg, #ff4757, #ff6b81)' : 'linear-gradient(45deg, #3498db, #2980b9)'};
  color: white;
  border: none;
  padding: ${props => props.delete ? '8px' : '8px 16px'};
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(45deg, #2a2a72, #009ffd, #2a2a72);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 8s ease infinite;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: ${shineAnimation} 3s linear infinite;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #fff, transparent);
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  margin-top: 10px;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.25);
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  }
`;

const CreatorName = styled.span`
  color: #ff6b6b;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff6b6b, transparent);
    animation: ${shineAnimation} 3s linear infinite;
  }
`;

function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const [editingArt, setEditingArt] = useState(null);

  const animation = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 300 });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !details || !image) {
      alert("Veuillez remplir tous les champs et ajouter une image.");
      return;
    }

    if (editingArt) {
      // Mise à jour d'une œuvre existante
      const updatedArtworks = artworks.map(art => 
        art.id === editingArt.id 
          ? { ...art, title, details, image }
          : art
      );
      setArtworks(updatedArtworks);
      setEditingArt(null);
    } else {
      // Ajout d'une nouvelle œuvre
      const newArt = {
        id: Date.now(),
        title,
        details,
        image,
      };
      setArtworks([...artworks, newArt]);
    }

    setTitle('');
    setDetails('');
    setImage(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette œuvre ?")) {
      setArtworks(artworks.filter(art => art.id !== id));
    }
  };

  const handleEdit = (art) => {
    setEditingArt(art);
    setTitle(art.title);
    setDetails(art.details);
    setImage(art.image);
  };

  return (
    <PageWrapper>
      <TitleContainer>
        <Title>Galerie d'Art</Title>
        <Subtitle>Explorez, Créez, Inspirez</Subtitle>
      </TitleContainer>

      <h2>{editingArt ? "Modifier une œuvre" : "Ajouter une œuvre"}</h2>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Détails"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!editingArt}
        />
        <AddButton type="submit">
          {editingArt ? "Mettre à jour" : "Ajouter"}
        </AddButton>
        {editingArt && (
          <AddButton 
            type="button" 
            onClick={() => {
              setEditingArt(null);
              setTitle('');
              setDetails('');
              setImage(null);
            }}
            style={{ backgroundColor: '#95a5a6' }}
          >
            Annuler
          </AddButton>
        )}
      </FormContainer>

      <GalleryContainer>
        {artworks.map((art) => (
          <ArtItem
            key={art.id}
            style={animation}
          >
            <img src={art.image} alt={art.title} onClick={() => setSelectedArt(art)} />
            <h4>{art.title}</h4>
            <ButtonContainer>
              <ActionButton onClick={() => handleEdit(art)}>
                Modifier
              </ActionButton>
              <ActionButton delete onClick={() => handleDelete(art.id)}>
                <FaTrash />
              </ActionButton>
            </ButtonContainer>
          </ArtItem>
        ))}
      </GalleryContainer>

      {selectedArt && (
        <Modal onClose={() => setSelectedArt(null)}>
          <h2 style={{ 
            color: 'white', 
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            marginBottom: '20px'
          }}>
            {selectedArt.title}
          </h2>
          <img
            src={selectedArt.image}
            alt={selectedArt.title}
            style={{ 
              maxWidth: '80%',
              maxHeight: '60vh',
              width: 'auto',
              height: 'auto',
              borderRadius: '15px',
              marginBottom: '20px',
              objectFit: 'contain',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}
          />
          <p style={{ 
            color: 'white', 
            fontSize: '1.1rem',
            lineHeight: '1.6',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
          }}>
            {selectedArt.details}
          </p>
        </Modal>
      )}

      <Footer>
        Application créer par <CreatorName>Ali Mouannis</CreatorName>
      </Footer>
    </PageWrapper>
  );
}

export default Gallery;
