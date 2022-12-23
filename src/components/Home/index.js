import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="home-heading">
        Find The Job That
        <br /> Fits Your Life
      </h1>
      <p className="home-description">
        Millions of people are searching for jobs, salary information,
        <br /> company reviews. Find the jobs that fits
        <br /> your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="home-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)
export default Home
