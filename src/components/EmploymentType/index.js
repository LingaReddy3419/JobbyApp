import './index.css'

const EmploymentType = props => {
  const {employmentDetails, onClickCheckbox} = props
  const {label, employmentTypeId} = employmentDetails

  const onClickBox = () => {
    onClickCheckbox(employmentTypeId)
  }

  return (
    <li className="list-item">
      <input type="checkbox" id={employmentTypeId} onChange={onClickBox} />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}
export default EmploymentType
