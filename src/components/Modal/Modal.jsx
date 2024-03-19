import { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressEsc);
  }

  handlePressEsc = e => {
    if (e.code === 'Escape') {
      console.log(this.props);
      this.props.closeModal();
    }
  };

  handleCloseByCLick = e => {
    if (e.target.classList.contains('overlay')) this.props.closeModal();
  };

  render() {
    const {
      value: { largeImageURL },
    } = this.props;

    return (
      <Overlay className="overlay" onClick={this.handleCloseByCLick}>
        <ModalWindow>
          <img src={largeImageURL} alt={largeImageURL} />
        </ModalWindow>
      </Overlay>
    );
  }
}
