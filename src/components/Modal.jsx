import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { images } from '../data/dummy-data';

const Modal = () => {
  const { id: imageId } = useParams();
  const navigate = useNavigate();

  const [imageData, setImageData] = useState({});

  useEffect(() => {
    const image = images.find(({ id }) => imageId == id);

    setImageData(image);
  }, [imageId]);

  const handleOnClose = () => {
    navigate('/');
  };

  return (
    <>
      {imageData && (
        <div className="modal">
          <div className="modal-content">
            <img src={imageData.fullSize} alt="Full Size" />
            <p>{imageData.details}</p>
            <button onClick={handleOnClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
