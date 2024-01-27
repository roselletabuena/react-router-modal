import React from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../data/dummy-data';
import Modal from '../components/Modal';

const Gallery = () => {
  const navigate = useNavigate();

  const viewImage = (image) => {
    const id = image.id;
    navigate('/gallery/' + id);
  };

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <button
          key={image.id}
          className="gallery-item"
          onClick={() => viewImage(image)}
        >
          <img src={image.thumbnail} alt={`Thumbnail ${index + 1}`} />
        </button>
      ))}

      <Modal />
    </div>
  );
};

export default Gallery;
