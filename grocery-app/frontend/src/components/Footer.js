import { Link } from 'react-router-dom'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

const Footer = () => {
  return (
    <footer>
      <LoggedIn />
      <LoggedOut />
      <p>Copyright &copy; 2022</p>
      <Link to='/grocery-app/about'>About</Link>
    </footer>
  )
}

export default Footer