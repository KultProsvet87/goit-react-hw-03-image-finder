import { ImageGalleryItems } from 'components/ImageGalleryItems/ImageGalleryItems';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modal = document.querySelector('#modal-root');

export class ImageGallery extends Component {
  state = {
    imgURL: '',
    tags: '',
  };

  static propTypes = {
    galleryItems: PropTypes.arrayOf(PropTypes.object),
  };

  onImgClick = (imgURL, tags) => {
    this.setState({ imgURL, tags });
  };

  modalToggle = () => {
    this.setState({
      imgURL: '',
      tags: '',
    });
  };

  render() {
    const { galleryItems } = this.props;
    return (
      <>
        <ul className="ImageGallery">
          {galleryItems.map(item => (
            <ImageGalleryItems
              key={item.id}
              tags={item.tags}
              webformatURL={item.webformatURL}
              largeImageURL={item.largeImageURL}
              onImgClick={this.onImgClick}
            />
          ))}
        </ul>
        {this.state.imgURL &&
          createPortal(
            <Modal
              imgURL={this.state.imgURL}
              tags={this.state.tags}
              modalToggle={this.modalToggle}
            />,
            modal
          )}
      </>
    );
  }
}

// ImageGallery.propTypes = {
//   galleryItems: PropTypes.arrayOf(PropTypes.object),
// };
