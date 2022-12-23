const Skill = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails

  return (
    <li className="rating-container">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="title">{name}</p>
    </li>
  )
}
export default Skill
