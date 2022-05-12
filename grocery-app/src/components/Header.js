import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAdd, showAdd, onAddCat, showCat }) => {
  const location = useLocation()

  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <div>
        <Button
            color={showCat ? 'blue' : 'purple'}
            text={showCat ? 'Close' : 'Add Category'}
            onClick={onAddCat} />
        <Button
            color={showAdd ? 'red' : 'green'}
            text={showAdd ? 'Close' : 'Add Item'}
            onClick={onAdd}
        />
        </div>
      )}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header