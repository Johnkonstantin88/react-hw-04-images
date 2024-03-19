import { Component } from 'react';
import Notiflix from 'notiflix';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getPictures } from 'servises/getPictures';
import { GalleryList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    pictures: [],
    isLoading: false,
    currentPage: 1,
    isShowModal: false,
    pictureValue: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({
        pictures: [],
        isLoading: true,
        currentPage: 1,
      });
      getPictures(this.props.searchValue)
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
          this.setState({ pictures: hits });
        })
        .catch(this.onShowError)
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      currentPage: (prevState.currentPage += 1),
      isLoading: true,
    }));
    getPictures(this.props.searchValue, this.state.currentPage)
      .then(r => {
        if (!r.ok) {
          throw new Error(r.type);
        }
        return r.json();
      })
      .then(data => {
        const { hits } = data;

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...hits],
        }));
      })
      .catch(this.onShowError)
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  onShowError = err => {
    Notiflix.Notify.failure(`${err.name}: ${err.message}`, {
      timeout: 5000,
      width: '300px',
      fontSize: '16px',
    });
  };

  onShowModal = e => {
    this.setState({ isShowModal: true });
    const filteredPicture = this.state.pictures.filter(
      ({ webformatURL }) => e.target.src === webformatURL
    );
    this.setState({ pictureValue: filteredPicture[0] });
  };

  onCLoseModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { pictures, isLoading, isShowModal } = this.state;
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
                  showModal={this.onShowModal}
                />
              );
            })}
        </GalleryList>
        {pictures.length > 0 && <Button onLoadMore={this.onLoadMore} />}
        {isShowModal && (
          <Modal
            value={this.state.pictureValue}
            closeModal={this.onCLoseModal}
          />
        )}
      </>
    );
  }
}
