import { useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation/*, BrowserRouter as Router, Route, Routes*/ } from 'react-router-dom'
import Button from './Button'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import mainLogo from '../assets/logo.png'
import { useAuth0 } from "@auth0/auth0-react";
import { FaBars } from 'react-icons/fa'

const Header = ({ title, onAddItem, showItem, onAddCategory, showCat, onDeleteOrShop, showDeleteOrShop }) => {
  const [showSubNav, setShowSubNav] = useState(false)
  const [showAddCat, setShowAddCat] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, isLoading } = useAuth0

  return (
    <header className='header' onScroll={() => setShowSubNav(false)}>
      <nav>
        <h4 className='toph4'>Quick List</h4>
        <ul className='desktop-ul'>
          <li><a className='nav-a' href='/grocery-app/'><b>Home</b></a></li>
          <li><a className='nav-a' href='/grocery-app/about'><b>About</b></a></li>
          <li><a className='nav-a' href='/grocery-app/profile'><b>Profile</b></a></li>
        </ul>
        <FaBars className='hamburger' onClick={() => setShowSubNav(!showSubNav)} />
      </nav>
      {showSubNav &&
        <ul className='mobile-ul'>
          <li><a className='nav-a' href='/grocery-app/'><b>Home</b></a></li>
          <li><a className='nav-a' href='/grocery-app/about'><b>About</b></a></li>
          <li><a className='nav-a' href='/grocery-app/profile'><b>Profile</b></a></li>
        </ul>}
      <div className='editItemDiv'>
        <img src={mainLogo} />
      </div>
      {isAuthenticated & location.pathname === '/' ? (
        <div className='button-container'>
        <Button
            color={showCat ? '#8b0000' : '#1434A4'}
            text={showCat ? 'Close' : 'Add Category'}
            onClick={onAddCategory}
            buttonClass='btn'
        />
        <Button
            color={showItem ? '#8b0000' : '#1434A4'}
            text={showItem ? 'Close' : 'Add Item'}
            onClick={onAddItem}
            buttonClass='btn'
        />
        <Button
          color={showDeleteOrShop ? '#8b0000' : 'black'}
          text={showDeleteOrShop ? 'Keep Shopping' : 'Edit Items'}
          onClick={onDeleteOrShop}
          buttonClass='editbtn'
        />
        </div>
      ) : null }
    </header>
  )
}

Header.defaultProps = {
  title: 'Quick List',
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