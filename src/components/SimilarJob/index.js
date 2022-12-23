import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {similarJobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-container">
      <div className="job-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="comp-logo"
        />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="title">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-head">Description</h1>
      <p className="description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJob
