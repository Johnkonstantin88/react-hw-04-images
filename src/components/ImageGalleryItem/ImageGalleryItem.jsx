import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, showModal }) => {
  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        alt={webformatURL}
        onClick={showModal}
      />
    </GalleryItem>
  );
};
