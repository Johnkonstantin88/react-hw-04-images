import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchValue: '',
  };

  handleSearch = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery searchValue={this.state.searchValue} />
      </>
    );
  }
}
