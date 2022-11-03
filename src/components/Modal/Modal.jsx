import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.modalToggle();
  };

  onClose = e => {
    if (e.currentTarget === e.target) this.props.modalToggle();
  };

  render() {
    return (
      <div className="Overlay" onClick={this.onClose}>
        <div className="Modal">
          <img src={this.props.imgURL} alt={this.props.tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imgURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  modalToggle: PropTypes.func.isRequired,
};
