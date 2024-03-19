import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ closeModal, value: { largeImageURL } }) => {
  useEffect(() => {
    const handlePressEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handlePressEsc);

    return () => {
      window.removeEventListener('keydown', handlePressEsc);
    };
  }, [closeModal]);

  const handleCloseByCLick = e => {
    if (e.target.classList.contains('overlay')) closeModal();
  };

  return (
    <Overlay className="overlay" onClick={handleCloseByCLick}>
      <ModalWindow>
        <img src={largeImageURL} alt={largeImageURL} />
      </ModalWindow>
    </Overlay>
  );
};
