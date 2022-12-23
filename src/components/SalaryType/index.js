import './index.css'

const SalaryType = props => {
  const {salaryDetails, onChangeSalary} = props
  const {label, salaryRangeId} = salaryDetails

  const onClickSalary = () => {
    onChangeSalary(salaryRangeId)
  }

  return (
    <li className="list-item">
      <input
        type="radio"
        id={salaryRangeId}
        name="salary"
        onChange={onClickSalary}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
export default SalaryType
