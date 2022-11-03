import PropTypes from 'prop-types';

export const ImageGalleryItems = ({
  tags,
  largeImageURL,
  webformatURL,
  onImgClick,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        onClick={() => onImgClick(largeImageURL, tags)}
      />
    </li>
  );
};

ImageGalleryItems.propTypes = {
  tags: PropTypes.string,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
