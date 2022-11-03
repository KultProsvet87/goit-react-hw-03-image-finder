import PropTypes from 'prop-types';

export const Button = ({
  type = 'button',
  title = 'button',
  buttonClass = '',
  onClick = null,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonClass}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.node,
  buttonClass: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
