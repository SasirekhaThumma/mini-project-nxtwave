import './index.css'
import {Link} from 'react-router-dom'
import Modal from 'react-modal'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import {useState, useEffect} from 'react'
import EachAnimalCard from '../EachAnimalCard'

const cardsData = [
  {
    name: 'tiger',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-tiger-img.png',
  },
  {
    name: 'lion',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-lion-img.png',
  },
  {
    name: 'rat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-rat-img.png',
  },
  {
    name: 'hen',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-hen-img.png',
  },
  {
    name: 'elephant',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-elephant-img.png',
  },
  {
    name: 'buffalo',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-buffalo-img.png',
  },
  {
    name: 'goat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-goat-img.png',
  },
  {
    name: 'zebra',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-zebra-img.png',
  },
  {
    name: 'duck',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-duck-img.png',
  },
  {
    name: 'pigeon',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-pigeon-img.png',
  },
]

const gameStatusConstants = {
  active: 'ACTIVE',
  response: 'RESPONSE',
}

const renderUniqueElements = () =>
  [...cardsData, ...cardsData].map((eachItem, index) => ({
    id: `${eachItem.name}-${index}`,
    name: eachItem.name,
    imageurl: eachItem.image,
    isFlipped: false,
  }))

const CardFlipMemoryGameInterface = () => {
  const [gameStatus, setGameStatus] = useState(gameStatusConstants.active)
  const [shuffledCards, setShuffledCards] = useState(() =>
    renderUniqueElements().sort(() => Math.random() - 0.5),
  )
  const [cardFlipCount, setCardFlipCount] = useState(0)
  const [countDown, setCountDown] = useState(120)
  const [score, setScore] = useState(0)
  const [selectedCards, setSelectedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState(0)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const closeModal = () => setModalIsOpen(false)

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (countDown === 0) {
      setGameStatus(gameStatusConstants.response)
      return undefined
    }
    const timerId = setInterval(() => setCountDown(prev => prev - 1), 1000)
    return () => clearInterval(timerId)
  }, [countDown])

  const flipCard = card =>
    shuffledCards.map(eachItem =>
      eachItem.id === card.id
        ? {...eachItem, isFlipped: !eachItem.isFlipped}
        : eachItem,
    )

  const onHandleCardClick = card => {
    // Block clicks if already 2 selected, already flipped, or waiting to flip back
    if (selectedCards.length === 2 || card.isFlipped || isProcessing) return

    setShuffledCards(flipCard(card))

    if (selectedCards.length === 0) {
      setSelectedCards([card])
      return
    }

    const firstCard = selectedCards[0]
    const secondCard = card
    setCardFlipCount(prev => prev + 1)

    if (firstCard.name === secondCard.name) {
      const newMatched = matchedCards + 1
      setMatchedCards(newMatched)
      setScore(prev => prev + 1)
      setSelectedCards([])

      if (newMatched === shuffledCards.length / 2) {
        setGameStatus(gameStatusConstants.response)
      }
    } else {
      // Start temporary lock to prevent clicks while flipping back
      setIsProcessing(true)
      setTimeout(() => {
        setShuffledCards(prev =>
          prev.map(eachItem =>
            eachItem.id === firstCard.id || eachItem.id === secondCard.id
              ? {...eachItem, isFlipped: false}
              : eachItem,
          ),
        )
        setSelectedCards([])
        // Unlock after flip back
        setIsProcessing(false)
      }, 2000)
    }
  }

  const renderActiveTopSection = () => (
    <div className="cfm-activestate-top-container">
      <Link to="/" className="link-styling">
        <button type="button" className="cfm-initial-Back-button">
          <BiArrowBack color="#ffffff" /> Back
        </button>
      </Link>
      <button
        type="button"
        className="cfm-active-state-rules-button"
        onClick={() => setModalIsOpen(true)}
      >
        Rules
      </button>
      <Modal
        className="cfm-popup-rules-container"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Card Flip Game Rules"
        overlayClassName="modal-overlay"
      >
        <button
          type="button"
          data-testid="close"
          className="cfm-active-rules-close-button"
          onClick={closeModal}
          aria-label="close rules modal"
        >
          <CgClose color="#334155" />
        </button>
        <h1 className="cfm-active-state-rules-text">Rules</h1>
        <ul className="cfm-inital-rules-unordered-styling">
          <li className="cfm-active-rules-list-item-styling">
            When the game is started, the users should be able to see the list
            of Cards that are shuffled and turned face down.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            When a user starts the game, the user should be able to see the
            Timer running.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            The Timer starts from 2 Minutes.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            If the two cards have the same image, they remain face up. If not,
            they should be flipped face down again after a short 2 seconds.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            Users should be able to compare only two cards at a time.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            When the user is not able to find all the cards before the timer
            ends then the game should end and redirect to the Time Up Page.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            If the user finds all the matching cards before the timer ends, then
            the user should be redirected to the results page.
          </li>
        </ul>
      </Modal>
    </div>
  )

  const renderActiveStateSection = () => (
    <>
      {renderActiveTopSection()}
      <h1 className="cfm-active-state-heading">Card-Flip Memory Game</h1>
      <div className="active-state-score-time-unordered-list">
        <p className="active-state-score-list-detail">
          Card flip count - {cardFlipCount}
        </p>
        <p className="active-state-time-list-detail">{formatTime(countDown)}</p>
        <p className="score-heading">Score</p>
        <p className="active-state-score-list-detail">Score - {score}</p>
      </div>
      <div className="cfm-game-container">
        <ul className="animal-cards-unorder-list-styling">
          {shuffledCards.map(eachItem => (
            <EachAnimalCard
              key={eachItem.id}
              eachItem={eachItem}
              handleClick={onHandleCardClick}
            />
          ))}
        </ul>
      </div>
    </>
  )

  const onPlayAgainButton = () => {
    setGameStatus(gameStatusConstants.active)
    setShuffledCards(renderUniqueElements().sort(() => Math.random() - 0.5))
    setCardFlipCount(0)
    setCountDown(120)
    setScore(0)
    setSelectedCards([])
    setMatchedCards(0)
  }

  const responseSection = () => {
    const winEmoji =
      'https://res.cloudinary.com/dvptfc0ji/image/upload/v1729927729/2x_csj9y0.png'
    const loseEmoji =
      'https://res.cloudinary.com/dvptfc0ji/image/upload/v1729927830/thfj8loqatlejhcjmh0q.png'
    const isWin = matchedCards === shuffledCards.length / 2

    return (
      <div className="result-response-container">
        <img
          className="result-response-emoji"
          src={isWin ? winEmoji : loseEmoji}
          alt={isWin ? 'grinning face with big eyes' : 'neutral face'}
        />
        <p className="no-of-flips-text">No.of Flips - {cardFlipCount}</p>
        <p className="score-text">Score - {score}</p>

        {isWin ? (
          <>
            <h2 className="congratulation-response-text">Congratulations</h2>
            <h1 className="response-descripton">
              You matched all of the cards in record time
            </h1>
          </>
        ) : (
          <>
            <h2 className="congratulation-response-text">
              Better luck next time
            </h2>
            <h1 className="response-description">
              You did not match all of the cards in record time
            </h1>
          </>
        )}
        <button
          type="button"
          className="cfm-response-button"
          onClick={onPlayAgainButton}
        >
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div className="cfm-active-state-container">
      {gameStatus === gameStatusConstants.active
        ? renderActiveStateSection()
        : responseSection()}
    </div>
  )
}

export default CardFlipMemoryGameInterface
