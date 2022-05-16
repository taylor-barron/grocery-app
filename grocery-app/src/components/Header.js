import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({ title, onAddItem, showItem, onAddCategory, showCat, onDeleteOrShop, showDeleteOrShop }) => {
  const location = useLocation()
  const { user, isAuthenticated, isLoading } = useAuth0

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <header className='header'>
      <h1>{title}</h1>
      <h2>{user}</h2>
      <LoggedIn />
      <LoggedOut />
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