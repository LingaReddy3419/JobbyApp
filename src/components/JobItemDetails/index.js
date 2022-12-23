import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {GoLocation} from 'react-icons/go'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdOpenInNew} from 'react-icons/md'
import Header from '../Header'
import SimilarJob from '../SimilarJob'
import Skill from '../Skill'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetailsData: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = each => ({
    companyLogoUrl: each.company_logo_url,
    companyWebsiteUrl: each.company_website_url,
    id: each.id,
    employmentType: each.employment_type,
    jobDescription: each.job_description,
    location: each.location,
    packagePerAnnum: each.package_per_annum,
    rating: each.rating,
    title: each.title,
    lifeAtCompany: each.life_at_company,
    skills: each.skills,
  })

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const jobUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobUrl, options)
    const data = await response.json()

    if (response.ok) {
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs

      const updatedJobData = this.getFormattedData(jobDetails)
      const updatedSimilarJobs = similarJobs.map(eachSimilarJob =>
        this.getFormattedData(eachSimilarJob),
      )
      this.setState({
        jobDetailsData: updatedJobData,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => this.getJobData()

  renderJobItemFailureView = () => (
    <div className="failure-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-job-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  getNewData = skill => ({
    imageUrl: skill.image_url,
    name: skill.name,
  })

  renderJobItem = () => {
    const {jobDetailsData, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetailsData

    const updatedSkills = skills.map(each => this.getNewData(each))

    const newLife = {
      imageUrl: lifeAtCompany.image_url,
      description: lifeAtCompany.description,
    }
    const {imageUrl, description} = newLife
    return (
      <div className="job-item-details-container">
        <div className="job-item-container">
          <div className="job-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="description-href-container">
            <h1 className="description-head">Description</h1>
            <a href={companyWebsiteUrl}>
              Visit
              <MdOpenInNew />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <div>
            <h1 className="description-head">Skills</h1>
            <ul className="skills-container">
              {updatedSkills.map(each => (
                <Skill key={each.name} skillDetails={each} />
              ))}
            </ul>
          </div>
          <div>
            <h1 className="description-head">Life at Company</h1>
            <div className="life-container">
              <p className="description">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="image-life"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="similar-head">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(eachJob => (
              <SimilarJob key={eachJob.id} similarJobDetails={eachJob} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetailsData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItem()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderJobItemFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderJobDetailsData()}</div>
      </>
    )
  }
}
export default JobItemDetails
