import { Link } from 'react-router-dom'
import Header from '../components/Header'

const About = () => {
  return (
    <div className='profile-container'>
      <Header />
      <h4>Version 1.0.0</h4><br></br>
      <p>
        &emsp;Quick list is a project by Taylor Barron utilizing React and NodeJS to build a fullstack web application. This app stores a grocery list and displays them under their categories or beneath two completed categories. This creates an easier user experience to be able to sort items that have been purchased before in either the frequently or infrequently purchased category instead of one long list.
      </p><br></br>
      <p>
        &emsp;This app utilizes Heroku as a server for the NodeJs/Express backend. This code may be unavailable or outdated on Github as at the time of app creation, Heroku was not accepting direct communication with Github. Requests are processed and data is stored on a Mongodb cluster. 
      </p><br></br>
      <p>
        &emsp;Authentication and authorization is handled by Auth0. A careful reading of the code will reveal that profile creation is not  available on the frontend or the backend. This is done through a database connection in Auth0 where the code is stored. 
      </p><br></br>
      <p>
        &emsp;Thank you for viewing my project! Feedback is always welcome and you can reach me for any reason at <a href='mailto: taylor.barron989@gmail.com'>taylor.barron989@gmail.com</a>. There may or may not be future updates.
      </p><br></br>
    </div>
  )
}

export default About