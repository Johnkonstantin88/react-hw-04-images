import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = searchValue => {
    setSearchValue(searchValue);
  };

  return (
    <>
      <Searchbar handleSearch={handleSearch} />
      <ImageGallery searchValue={searchValue} />
    </>
  );
};
