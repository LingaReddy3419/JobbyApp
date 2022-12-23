import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import JobItem from '../JobItem'
import EmploymentType from '../EmploymentType'
import SalaryType from '../SalaryType'
import Header from '../Header'

import './index.css'

const jwtToken = Cookies.get('jwt_token')

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: [],
    jobsApiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
    searchInput: '',
    activePackage: '',
    employeeType: [],
  }

  componentDidMount() {
    this.getJobs()
    this.getProfile()
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {searchInput, activePackage, employeeType} = this.state
    const empTypeAdd = employeeType.join()

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${empTypeAdd}&minimum_package=${activePackage}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsApiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedJobsData = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        id: each.id,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsList: updatedJobsData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const profileApiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(profileApiUrl, options)
    const fetchedData = await response.json()
    const data = fetchedData.profile_details

    if (response.ok) {
      const upadtedProfile = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }

      this.setState({
        profileData: upadtedProfile,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  onClickRetryProfile = () => this.getProfile()

  renderProfileFailureView = () => (
    <div>
      <button type="button" onClick={this.onClickRetryProfile}>
        Retry
      </button>
    </div>
  )

  getProfileData = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()

      default:
        return null
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    const showJobsList = jobsList.length > 0

    return showJobsList ? (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobItem key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-head">No Jobs Found</h1>
        <p className="no-jobs-line">
          we could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onClickJobsRetry = () => this.getJobs()

  renderJobsFailureView = () => (
    <div className="failure-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-job-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickJobsRetry}>
        Retry
      </button>
    </div>
  )

  getJobsData = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()

      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getJobs()
  }

  onChangeSalary = salary => {
    this.setState({activePackage: salary}, this.getJobs)
  }

  onClickCheckbox = empId => {
    const {employeeType} = this.state

    if (employeeType.includes(empId)) {
      const indexOfType = employeeType.indexOf(empId)
      employeeType.splice(indexOfType, 1)
      this.setState({employeeType}, this.getJobs)
    } else {
      this.setState({employeeType: [...employeeType, empId]}, this.getJobs)
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filter-container">
            <div>{this.getProfileData()}</div>
            <hr className="line-separator" />
            <div>
              <h1 className="label-head">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(each => (
                  <EmploymentType
                    employmentDetails={each}
                    key={each.employmentTypeId}
                    onClickCheckbox={this.onClickCheckbox}
                  />
                ))}
              </ul>
            </div>
            <hr className="line-separator" />
            <div>
              <h1 className="label-head">Salary Range</h1>
              <ul>
                {salaryRangesList.map(each => (
                  <SalaryType
                    salaryDetails={each}
                    key={each.salaryRangeId}
                    onChangeSalary={this.onChangeSalary}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-list-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.onClickSearchBtn}
                testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.getJobsData()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
