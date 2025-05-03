import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import styled, { keyframes } from 'styled-components';
import { FaEdit, FaTrash, FaExpand } from 'react-icons/fa';

// Animations
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shineAnimation = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #1e3c72, #2a5298, #1e3c72, #2a5298);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  color: white;
  animation: ${fadeIn} 1s ease, ${floatAnimation} 3s ease-in-out infinite;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #fff, transparent);
    animation: ${shineAnimation} 3s linear infinite;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${pulseAnimation} 3s ease-in-out infinite;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  animation: ${slideUp} 1s ease;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
  
  h2 {
    color: white;
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #fff, transparent);
      animation: ${shineAnimation} 2s linear infinite;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: ${props => props.secondary ? 'rgba(255, 255, 255, 0.1)' : '#4CAF50'};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.secondary ? 'rgba(255, 255, 255, 0.2)' : '#45a049'};
    
    &::before {
      left: 100%;
    }
  }
`;

const OeuvresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const OeuvreCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 0.5s ease;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
`;

const OeuvreImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const OeuvreInfo = styled.div`
  padding: 1.5rem;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
`;

const OeuvreTitle = styled.h3`
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const OeuvreDetails = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px) rotate(15deg);
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;

const EditIcon = styled(IconButton)`
  color: #2196F3;
  &:hover {
    background: rgba(33, 150, 243, 0.2);
  }
`;

const DeleteIcon = styled(IconButton)`
  color: #f44336;
  &:hover {
    background: rgba(244, 67, 54, 0.2);
  }
`;

const ExpandIcon = styled(IconButton)`
  color: #4CAF50;
  &:hover {
    background: rgba(76, 175, 80, 0.2);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 900px;
  position: relative;
  animation: ${slideUp} 0.3s ease;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.5s ease;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: rotate(90deg);
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 1s ease, ${floatAnimation} 3s ease-in-out infinite;
  
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
    animation: ${shineAnimation} 3s linear infinite;
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
    animation: ${shineAnimation} 3s linear infinite reverse;
  }
`;

const CreatorName = styled.span`
  color: #ff6b6b;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
  position: relative;
  padding: 0 5px;
  
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

  &:hover {
    animation: ${pulseAnimation} 1s ease-in-out infinite;
    color: #ff8787;
  }
`;

const Gallery = () => {
  const [titre, setTitre] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);
  const [oeuvres, setOeuvres] = useState([]);
  const [editingOeuvre, setEditingOeuvre] = useState(null);
  const [selectedOeuvre, setSelectedOeuvre] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchOeuvres = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "oeuvres"));
      const oeuvresData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOeuvres(oeuvresData);
    } catch (error) {
      console.error("Erreur lors du chargement des œuvres:", error);
      alert("Erreur lors du chargement des œuvres");
    }
  };

  useEffect(() => {
    fetchOeuvres();
  }, []);

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Réduire la taille si l'image est trop grande
          if (width > 1920) {
            height = (1920 * height) / width;
            width = 1920;
          }
          if (height > 1080) {
            width = (1080 * width) / height;
            height = 1080;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convertir en JPEG avec une qualité de 0.8
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(compressedDataUrl);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert("Veuillez sélectionner une image");
      return;
    }

    try {
      // Vérification de la taille du fichier (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("L'image est trop volumineuse. Maximum 10MB autorisé.");
        return;
      }

      // Vérification du type de fichier
      if (!selectedFile.type.match(/image\/(jpeg|png|jpg|gif)/)) {
        alert("Format d'image non supporté. Utilisez JPG, PNG ou GIF.");
        return;
      }

      // Compression de l'image
      const compressedImage = await compressImage(selectedFile);
      
      if (editingOeuvre) {
        // Mise à jour d'une œuvre existante
        await updateDoc(doc(db, "oeuvres", editingOeuvre.id), {
          titre,
          details,
          imageUrl: compressedImage,
          updatedAt: new Date()
        });
        setEditingOeuvre(null);
      } else {
        // Création d'une nouvelle œuvre
        await addDoc(collection(db, "oeuvres"), {
          titre,
          details,
          imageUrl: compressedImage,
          createdAt: new Date()
        });
      }
      
      setTitre("");
      setDetails("");
      setSelectedFile(null);
      setImagePreview(null);
      fetchOeuvres();
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      alert("Une erreur est survenue lors de l'upload de l'image. Veuillez réessayer.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérification de la taille du fichier (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("L'image est trop volumineuse. Maximum 10MB autorisé.");
        return;
      }

      // Vérification du type de fichier
      if (!file.type.match(/image\/(jpeg|png|jpg|gif)/)) {
        alert("Format d'image non supporté. Utilisez JPG, PNG ou GIF.");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.onerror = () => {
        alert("Erreur lors de la lecture de l'image. Veuillez réessayer.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette œuvre ?")) {
      try {
        await deleteDoc(doc(db, "oeuvres", id));
        setOeuvres(oeuvres.filter(o => o.id !== id));
        alert("Œuvre supprimée avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Une erreur est survenue lors de la suppression");
      }
    }
  };

  const handleEdit = (oeuvre) => {
    setEditingOeuvre(oeuvre);
    setTitre(oeuvre.titre);
    setDetails(oeuvre.details);
    setFile(null);
  };

  const handleCancel = () => {
    setEditingOeuvre(null);
    setTitre("");
    setDetails("");
    setFile(null);
  };

  return (
    <Container>
      <Header>
        <Title>Galerie d'Art</Title>
        <Subtitle>Explorez, Créez, Inspirez</Subtitle>
      </Header>

      <MainContent>
        <FormContainer>
          <h2>{editingOeuvre ? "Modifier une œuvre" : "Ajouter une œuvre"}</h2>
          <Input 
            placeholder="Titre" 
            value={titre}
            onChange={e => setTitre(e.target.value)} 
          />
          <Input 
            placeholder="Détails" 
            value={details}
            onChange={e => setDetails(e.target.value)} 
          />
          <Input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange} 
          />
          <ButtonContainer>
            <Button onClick={handleUpload}>
              {editingOeuvre ? "Mettre à jour" : "Ajouter"}
            </Button>
            {editingOeuvre && (
              <Button secondary onClick={handleCancel}>
                Annuler
              </Button>
            )}
          </ButtonContainer>
        </FormContainer>

        <OeuvresGrid>
          {oeuvres.map((o) => (
            <OeuvreCard key={o.id}>
              <OeuvreImage 
                src={o.imageUrl} 
                alt={o.titre}
                onClick={() => setSelectedOeuvre(o)}
              />
              <OeuvreInfo>
                <OeuvreTitle>{o.titre}</OeuvreTitle>
                <OeuvreDetails>{o.details}</OeuvreDetails>
                <ActionButtons>
                  <EditIcon onClick={() => handleEdit(o)}>
                    <FaEdit size={20} />
                  </EditIcon>
                  <DeleteIcon onClick={() => handleDelete(o.id)}>
                    <FaTrash size={20} />
                  </DeleteIcon>
                  <ExpandIcon onClick={() => setSelectedOeuvre(o)}>
                    <FaExpand size={20} />
                  </ExpandIcon>
                </ActionButtons>
              </OeuvreInfo>
            </OeuvreCard>
          ))}
        </OeuvresGrid>

        {selectedOeuvre && (
          <Modal onClick={() => setSelectedOeuvre(null)}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <CloseButton onClick={() => setSelectedOeuvre(null)}>
                ×
              </CloseButton>
              <ModalImage 
                src={selectedOeuvre.imageUrl} 
                alt={selectedOeuvre.titre}
              />
              <OeuvreTitle>{selectedOeuvre.titre}</OeuvreTitle>
              <OeuvreDetails>{selectedOeuvre.details}</OeuvreDetails>
            </ModalContent>
          </Modal>
        )}

        <Footer>
          Application créer par <CreatorName>Ali Mouannis</CreatorName>
        </Footer>
      </MainContent>
    </Container>
  );
};

export default Gallery;


