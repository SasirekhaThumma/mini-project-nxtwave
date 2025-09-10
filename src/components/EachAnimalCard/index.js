import './index.css'

const EachAnimalCard = props => {
  const {eachItem, handleClick} = props
  const {name, imageurl, isFlipped} = eachItem

  const onSelection = () => {
    handleClick(eachItem)
  }

  const footPrint =
    'https://res.cloudinary.com/dvptfc0ji/image/upload/v1729879910/foot-print_1_sut6kl.png'

  return (
    <li
      className={
        isFlipped
          ? 'animal-visible-card-styling'
          : 'animal-invisible-card-styling'
      }
    >
      <img
        src={isFlipped ? `${imageurl}` : `${footPrint}`}
        alt={name}
        className="animal-image"
        onClick={onSelection}
      />
    </li>
  )
}

export default EachAnimalCard
