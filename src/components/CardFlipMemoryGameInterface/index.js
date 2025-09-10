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

const renderuniqueElements = () =>
  [...cardsData, ...cardsData].map((eachItem, index) => ({
    id: `${eachItem.name}-${index}`,
    name: eachItem.name,
    imageurl: eachItem.image,
    isFlipped: false,
  }))

const CardFlipMemoryGameInterface = () => {
  const renderShuffleCards = () => {
    const cardsdoubledData = renderuniqueElements()
    return cardsdoubledData.sort(() => Math.random() - 0.5)
  }

  const [gameStatus, setGameStatus] = useState(gameStatusConstants.active)
  const [shuffledCards, setShuffledCards] = useState(renderShuffleCards())
  const [cardFlipCount, setCardFlipCount] = useState(0)
  const [countDown, setCountDown] = useState(120)
  const [score, setScore] = useState(0)
  const [selectedCards, setSelectedCards] = useState([])
  const [setMatchedCards] = useState(0)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
  }
  console.log(selectedCards)

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `0${minutes}:${seconds > 9 ? `${seconds}` : `0${seconds}`}`
  }

  useEffect(() => {
    if (countDown === 0) {
      setGameStatus(gameStatusConstants.response)
    }

    const timerId =
      countDown > 0 && setInterval(() => setCountDown(prev => prev - 1), 1000)
    return () => clearInterval(timerId)
  }, [countDown, gameStatus])

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
        contentLabel="Emoji Game Rules"
        overlayClassName="modal-overlay"
      >
        <button
          type="button"
          data-testid="close"
          className="cfm-active-rules-close-button"
          onClick={closeModal}
          aria-label="close"
        >
          <CgClose color="#334155" aria-label="close" />
        </button>
        <h1 className="cfm-active-state-rules-text">Rules</h1>
        <ul className="cfm-inital-rules-unordered-styling">
          <li className="cfm-active-rules-list-item-styling">
            When the game is started, the users should be able to see the list
            of Cards that are shuffled and turned face down.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            Users should be able to compare only two cards at a time.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            When a user starts the game, the user should be able to see the
            Timer running.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            When the user is not able to find all the cards before the timer
            ends then the game should end and redirect to the Time Up Page.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            The Timer starts from 2 Minutes.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            If the user finds all the matching cards before the timer ends, then
            the user should be redirected to the results page.
          </li>
          <li className="cfm-active-rules-list-item-styling">
            If the two cards have the same image, they remain face up. If not,
            they should be flipped face down again after a short 2 seconds.
          </li>
        </ul>
      </Modal>
    </div>
  )

  const flipTheCard = card =>
    shuffledCards.map(eachItem =>
      eachItem.id === card.id
        ? {...eachItem, isFlipped: !eachItem.isFlipped}
        : eachItem,
    )

  const onHandleCardClick = card => {
    setCardFlipCount(prev => prev + 1)
    setShuffledCards(flipTheCard(card))
    if (selectedCards.length === 2) {
      return
    }
    setSelectedCards(prev => [...prev, card])
    if (selectedCards.length === 1) {
      console.log('selected length 2')
      const firstCard = selectedCards[0]
      if (firstCard.name === card.name) {
        setMatchedCards(prev => prev + 1)
        setScore(prev => prev + 1)
        setSelectedCards([])
        if (score === shuffledCards.length / 2) {
          setGameStatus(gameStatusConstants.response)
        }
      } else {
        setTimeout(() => {
          setShuffledCards(
            shuffledCards.map(eachItem =>
              eachItem.id === firstCard.id || eachItem.id === firstCard.id
                ? {...eachItem, isFlipped: !eachItem.isFlipped}
                : eachItem,
            ),
          )
          console.log('time out initiated')
          setSelectedCards([])
        }, 2000)
      }
    }
  }

  const renderActiveStateSection = () => (
    <>
      {renderActiveTopSection()}
      <h1 className="cfm-active-state-heading">Card-Flip Memory Game</h1>
      <div className="active-state-score-time-unordered-list">
        <p className="active-state-score-list-detail">
          Card flip count -{' '}
          {cardFlipCount > 9 ? `${cardFlipCount}` : `0${cardFlipCount}`}
        </p>
        <p className="active-state-time-list-detail">{formatTime(countDown)}</p>
        <p className="active-state-score-list-detail">
          Score - {score > 9 ? score : `0${score}`}
        </p>
      </div>
      <div className="cfm-game-container">
        <ul className="animal-cards-unorder-list-styling">
          {shuffledCards.map(eachItem => (
            <EachAnimalCard
              eachItem={eachItem}
              key={eachItem.id}
              handleClick={onHandleCardClick}
              testid="cardsData"
            />
          ))}
        </ul>
      </div>
    </>
  )

  const onPlayAgainButton = () => {
    setGameStatus(gameStatusConstants.active)
    setShuffledCards(renderShuffleCards())
    setCardFlipCount(0)
    setCountDown(120)
    setScore(0)
    setSelectedCards([])
    setMatchedCards(0)
  }

  const responseSection = () => {
    const happyEmoji =
      'https://res.cloudinary.com/dvptfc0ji/image/upload/v1729927729/2x_csj9y0.png'
    const sadEmoji =
      'https://res.cloudinary.com/dvptfc0ji/image/upload/v1729927830/thfj8loqatlejhcjmh0q.png'
    const happyemojialt = 'grinning face with big eyes'
    const sadEmojialt = 'neutral face'
    return (
      <div className="result-response-container">
        <img
          className="result-response-emoji"
          src={score > 10 ? happyEmoji : sadEmoji}
          alt={score > 10 ? happyemojialt : sadEmojialt}
        />
        <h1 className="congratulation-response-text">
          {score > 9 ? 'Congratulations' : 'Better luck next time'}
        </h1>
        <p className="no-of-flips-text">No.of Flips - {cardFlipCount}</p>
        <p className="response-descripton">
          {score > 9
            ? 'You matched all of the cards in record time'
            : 'You did not match all of the cards in record time'}
        </p>
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

  const renderGame = () => {
    switch (gameStatus) {
      case gameStatusConstants.active:
        return renderActiveStateSection()
      case gameStatusConstants.response:
        return responseSection()
      default:
        return 'none'
    }
  }

  return <div className="cfm-active-state-container">{renderGame()}</div>
}

export default CardFlipMemoryGameInterface
