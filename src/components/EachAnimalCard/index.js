import './index.css'

const EachAnimalCard = props => {
  const {eachItem, handleClick} = props
  const {name, imageurl, isFlipped} = eachItem

  const onSelection = () => {
    if (!isFlipped) handleClick(eachItem)
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
      <button
        type="button"
        onClick={onSelection}
        className="animal-card-button"
      >
        <img
          data-testid="animal-card"
          src={isFlipped ? imageurl : footPrint}
          alt={isFlipped ? name : 'foot print'}
          className="animal-image"
        />
      </button>
    </li>
  )
}

export default EachAnimalCard
