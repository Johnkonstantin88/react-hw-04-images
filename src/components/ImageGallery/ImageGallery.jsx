import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getPictures } from 'servises/getPictures';
import { GalleryList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export const ImageGallery = ({ searchValue }) => {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [pictureValue, setPictureValue] = useState('');

  useEffect(() => {
    if (searchValue) {
      setPictures([]);
      setIsLoading(true);
      setCurrentPage(1);

      getPictures(searchValue)
        .then(r => {
          if (!r.ok) {
            throw new Error(r.type);
          }
          return r.json();
        })
        .then(data => {
          const { hits } = data;

          if (hits.length < 1) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          setPictures(hits);
        })
        .catch(onShowError)
        .finally(() => {
          setIsLoading(false);
        });
    } 
  }, [searchValue]);

  const onLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
    setIsLoading(true);

    getPictures(searchValue, currentPage)
      .then(r => {
        if (!r.ok) {
          throw new Error(r.type);
        }
        return r.json();
      })
      .then(data => {
        const { hits } = data;

        setPictures(prevPictures => [...prevPictures, ...hits]);
      })
      .catch(onShowError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onShowError = err => {
    Notiflix.Notify.failure(`${err.name}: ${err.message}`, {
      timeout: 5000,
      width: '300px',
      fontSize: '16px',
    });
  };

  const onShowModal = e => {
    setIsShowModal(true);
    const filteredPicture = pictures.filter(
      ({ webformatURL }) => e.target.src === webformatURL
    );
    setPictureValue(filteredPicture[0]);
  };

  const onCLoseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <GalleryList>
        {pictures &&
          pictures.map(({ id, webformatURL, largeImageURL }, idx) => {
            return (
              <ImageGalleryItem
                key={idx}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                showModal={onShowModal}
              />
            );
          })}
      </GalleryList>
      {pictures.length > 0 && <Button onLoadMore={onLoadMore} />}
      {isShowModal && <Modal value={pictureValue} closeModal={onCLoseModal} />}
    </>
  );
};
