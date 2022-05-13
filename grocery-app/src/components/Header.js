import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAddItem, showItem, onAddCategory, showCat, onDeleteOrShop, showDeleteOrShop }) => {
  const location = useLocation()

  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <div>
        <Button
            color={showCat ? 'blue' : 'purple'}
            text={showCat ? 'Close' : 'Add Category'}
            onClick={onAddCategory}
            buttonClass='btn'
        />
        <Button
            color={showItem ? 'red' : 'green'}
            text={showItem ? 'Close' : 'Add Item'}
            onClick={onAddItem}
            buttonClass='btn'
        />
        <Button
          color={showDeleteOrShop ? 'black' : 'brown'}
          text={showDeleteOrShop ? 'Keep Shopping' : 'Edit Items'}
          onClick={onDeleteOrShop}
          buttonClass='btn'
        />
        </div>
      )}
    </header>
  )
}

Header.defaultProps = {
  title: 'Grocery List',
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