import PropTypes from 'prop-types'

const Button = ({ color, text, onClick, buttonClass }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={buttonClass}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
  class: 'btn',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button