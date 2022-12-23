import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="mobile-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <ul className="icons-container">
          <Link to="/">
            <li>
              <AiFillHome className="mobile-icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsFillBriefcaseFill className="mobile-icon" />
            </li>
          </Link>
          <li onClick={onClickLogout}>
            <FiLogOut className="mobile-icon" />
          </li>
        </ul>
      </div>

      <div className="desktop-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="desktop-logo"
          />
        </Link>
        <ul className="desktop-home-icon-container">
          <Link to="/" className="nav-link">
            <li className="list-item-nav">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="list-item-nav">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
