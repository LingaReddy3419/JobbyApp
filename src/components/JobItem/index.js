import {Link} from 'react-router-dom'

import {GoLocation} from 'react-icons/go'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    title,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="nav-link-job">
      <li className="job-item">
        <div className="job-logo-container">
          <img src={companyLogoUrl} alt="company logo" className="comp-logo" />
          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star" />
              <p className="title">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-container">
          <div className="location-container">
            <div className="location-container">
              <GoLocation className="icon" />
              <p className="title">{location}</p>
            </div>
            <div className="location-container">
              <BsFillBriefcaseFill className="icon" />
              <p className="title">{employmentType}</p>
            </div>
          </div>
          <p className="title">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-head">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
