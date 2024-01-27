import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
        <div
          key={index}
          className="gallery-item"
          onClick={() => viewImage(image)}
        >
          <img src={image.thumbnail} alt={`Thumbnail ${index + 1}`} />
        </div>
      ))}

      <Modal />
    </div>
  );
};

export default Gallery;
