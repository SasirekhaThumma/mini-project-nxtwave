import './index.css'

import {Link} from 'react-router-dom'

import Modal from 'react-modal'

import {BiArrowBack} from 'react-icons/bi'

import {CgClose} from 'react-icons/cg'

import {useState} from 'react'

const gameStateConstants = {
  initial: 'INITIAL',
  activeState: 'ACTIVE',
  wonState: 'WON',
  lossState: 'LOST',
  drawState: 'DRAW',
}

const choicesList = [
  {
    id: 'rock',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'scissor',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'paper',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const RockPaperScissor = () => {
  const [gameStatus, setStatus] = useState(gameStateConstants.initial)
  const [score, setScore] = useState(0)
  const [yourOption, setYourOption] = useState({})
  const [computerOption, setComputerOption] = useState({})
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const renderScoreBoard = () => {
    let scorealtimage = ' '
    let scoreBasedImg = ' '
    if (gameStatus === gameStateConstants.lossState) {
      scorealtimage = 'Face without mouth'
      scoreBasedImg =
        'https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757486849/Group_7618_4_qq380s.png'
    } else if (gameStatus === gameStateConstants.wonState) {
      scorealtimage = 'Smiling face with star eyes'
      scoreBasedImg =
        'https://res.cloudinary.com/dvptfc0ji/image/upload/v1729669525/Group_7618_wz7w1p.png'
    } else {
      scorealtimage = 'Face without mouth'
      scoreBasedImg =
        'https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757486844/Group_7618_3_jy4zbn.png'
    }
    return (
      <div className="scoreboard-container-styling">
        <h1 className="rps-scoreboard-text-unorderedlist-large">
          Rock
          <br />
          Paper
          <br />
          Scissor
        </h1>
        <h1 className="rps-scoreboard-text-unorderedlist-small">
          Rock Paper Scissor
        </h1>
        <div className="rps-result">
          <img
            src={scoreBasedImg}
            alt={scorealtimage}
            className="result-face"
          />
          <div className="score-text-container">
            <p className="score-text">Score</p>
            <p className="score-num">{score}</p>
          </div>
        </div>
      </div>
    )
  }

  const onPlayAgain = () => {
    setStatus(gameStateConstants.activeState)
    setYourOption({})
    setComputerOption({})
  }

  const renderDrawState = () => (
    <div className="response-container">
      <h1 className="rps-heading-styling">ROCK PAPER SCISSOR</h1>
      {renderScoreBoard()}
      <div className="response-status-container-unordered-list">
        <div className="each-response-section">
          <h3 className="player-name">You</h3>
          <img
            src={yourOption.imageUrl}
            alt={yourOption.id}
            className="response-emoji"
          />
        </div>
        <div className="each-response-section">
          <img
            src="https://res.cloudinary.com/dvptfc0ji/image/upload/v1729682268/Emoji_ta4me1.png"
            alt="draw emoji"
            className="response-icon"
          />
          <p className="response-text">IT IS DRAW</p>
          <button
            type="button"
            className="play-again-button"
            onClick={onPlayAgain}
          >
            Play Again
          </button>
        </div>
        <div className="each-response-section">
          <h3 className="player-name">Opponent</h3>
          <img
            src={computerOption.imageUrl}
            alt={computerOption.id}
            className="response-emoji"
          />
        </div>
      </div>
    </div>
  )

  const renderWonState = () => (
    <div className="response-container">
      <h1 className="rps-heading-styling">ROCK PAPER SCISSOR</h1>
      {renderScoreBoard()}
      <div className="response-status-container-unordered-list">
        <div className="each-response-section">
          <h3 className="player-name">You</h3>
          <img
            src={yourOption.imageUrl}
            alt={yourOption.id}
            className="response-emoji"
          />
        </div>
        <div className="each-response-section">
          <img
            src="https://res.cloudinary.com/dvptfc0ji/image/upload/v1729682935/Emoji_1_cplewm.png"
            alt="won emoji"
            className="response-icon"
          />
          <p className="response-text">YOU WON</p>
          <button
            type="button"
            className="play-again-button"
            onClick={onPlayAgain}
          >
            Play Again
          </button>
        </div>
        <li className="each-response-section">
          <h3 className="player-name">Opponent</h3>
          <img
            src={computerOption.imageUrl}
            alt={computerOption.id}
            className="response-emoji"
          />
        </li>
      </div>
    </div>
  )

  const renderLossState = () => (
    <div className="response-container">
      <h1 className="rps-heading-styling">ROCK PAPER SCISSOR</h1>
      {renderScoreBoard()}
      <div className="response-status-container-unordered-list">
        <div className="each-response-section">
          <h3 className="player-name">You</h3>
          <img
            src={yourOption.imageUrl}
            alt={yourOption.id}
            className="response-emoji"
          />
        </div>
        <div className="each-response-section">
          <img
            src="https://res.cloudinary.com/dvptfc0ji/image/upload/v1729683488/Emoji_3_s4c8bv.png"
            alt="lose emoji"
            className="response-icon"
          />
          <p className="response-text">YOU LOSE</p>
          <button
            type="button"
            className="play-again-button"
            onClick={onPlayAgain}
          >
            Play Again
          </button>
        </div>
        <div className="each-response-section">
          <h3 className="player-name">Opponent</h3>
          <img
            src={computerOption.imageUrl}
            alt={computerOption.id}
            className="response-emoji"
          />
        </div>
      </div>
    </div>
  )

  const onSelectionChoice = eachItem => {
    const yourChoice = eachItem
    setYourOption(yourChoice)
    const generatedChoice =
      choicesList[Math.floor(Math.random() * choicesList.length)]
    setComputerOption(generatedChoice)

    if (yourChoice.id === generatedChoice.id) {
      setStatus(gameStateConstants.drawState)
    } else if (
      (yourChoice.id === 'rock' && generatedChoice.id === 'scissor') ||
      (yourChoice.id === 'scissor' && generatedChoice.id === 'paper') ||
      (yourChoice.id === 'paper' && generatedChoice.id === 'rock')
    ) {
      setStatus(gameStateConstants.wonState)
      setScore(prevScore => prevScore + 1)
    } else {
      setStatus(gameStateConstants.lossState)
      setScore(prevScore => prevScore - 1)
    }
  }

  const onStartGame = () => {
    setStatus(gameStateConstants.activeState)
  }

  const renderInitialState = () => (
    <div className="initial-container">
      <Link to="/" className="rps-link-styling">
        <button type="button" className="rps-back-button-styling">
          <BiArrowBack color="ffffff" /> Back
        </button>
      </Link>
      <h1 className="rps-heading-styling">ROCK PAPER SCISSOR</h1>
      <img
        src="https://res.cloudinary.com/dvptfc0ji/image/upload/v1729656991/Group_7469_1_rijazz.png"
        alt="rock paper scissor"
        className="rps-image"
      />
      <h1 className="rules-text">Rules</h1>
      <ul className="rps-rules-unordered-styling">
        <li className="list-item-styling">
          The game result should be based on user and user opponent choices
        </li>
        <li className="list-item-styling">
          When the user choice is rock and his opponent choice is rock then the
          result will be <span className="span-styling">IT IS DRAW</span>
        </li>
        <li className="list-item-styling">
          When the user choice is paper and his opponent choice is rock then the
          result will be <span className="span-styling">YOU WON</span>
        </li>
        <li className="list-item-styling">
          When the user choice is a scissor and his opponent choice is rock then
          the result will be
          <span className="span-styling">YOU LOSE</span>
        </li>
        <li className="list-item-styling">
          When the user choice is paper and his opponent choice is paper then
          the result will be <span className="span-styling">IT IS DRAW</span>
        </li>
        <li className="list-item-styling">
          When the user choice is scissors and his opponent choice is paper then
          the result will be <span className="span-styling">YOU WON</span>
        </li>
        <li className="list-item-styling">
          When the user choice is rock and his opponent choice is scissors then
          the result will be <span className="span-styling">YOU WON</span>
        </li>
        <li className="list-item-styling">
          When the user choice is paper and his opponent choice is scissors then
          the result will be <span className="span-styling">YOU LOSE</span>
        </li>
        <li className="list-item-styling">
          When the user choice is scissors and his opponent choice is scissors
          then the result will be
          <span className="span-styling">IT IS DRAW</span>
        </li>
        <li className="list-item-styling">
          When the result is <span className="span-styling">YOU WON</span>, then
          the count of the score should be incremented by 1
        </li>
        <li className="list-item-styling">
          When the result is <span className="span-styling">IT IS DRAW</span>,
          then the count of the score should be the same
        </li>
        <li className="list-item-styling">
          When the result is <span className="span-styling">YOU LOSE</span>,
          then the count of the score should be decremented by 1.
        </li>
      </ul>
      <button className="rps-start-button" type="button" onClick={onStartGame}>
        Start playing
      </button>
    </div>
  )

  const renderActiveStateTopSection = () => (
    <div className="rps-back-popup-container">
      <Link to="/" className="rps-active-state-link-styling">
        <button type="button" className="rps-back-button-styling">
          <BiArrowBack /> Back
        </button>
      </Link>
      <button
        type="button"
        className="rps-active-state-rules-button"
        onClick={() => setModalIsOpen(true)}
      >
        Rules
      </button>
      <Modal
        className="rps-popup-rules-container"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Emoji Game Rules"
        overlayClassName="modal-overlay"
      >
        <button
          type="button"
          className="rps-active-rules-close-button"
          data-testid="close"
          onClick={closeModal}
        >
          <CgClose color="#334155" size={24} aria-label="close" />
        </button>
        <h1 className="rps-active-state-rules-state">Rules</h1>
        <ul className="rps-rules-unordered-styling">
          <li className="rps-active-state-list-item-styling">
            The game result should be based on user and user opponent choices
          </li>
          <li className="rps-active-state-list-item-styling">
            When the user choice is rock and his opponent choice is rock then
            the result will be <span className="span-styling">IT IS DRAW</span>
          </li>
          <li className="rps-active-state-list-item-styling">
            When the user choice is paper and his opponent choice is rock then
            the result will be <span className="span-styling">YOU WON</span>
          </li>
          <li className="rps-active-state-list-item-styling">
            When the user choice is a scissor and his opponent choice is rock
            then the result will be
            <span className="span-styling">YOU LOSE</span>
          </li>
          <li className="rps-active-state-list-item-styling">
            When the user choice is paper and his opponent choice is paper then
            the result will be <span className="span-styling">IT IS DRAW</span>
          </li>
          <li className="rps-active-state-list-item-styling">
            When the user choice is scissors and his opponent choice is paper
            then the result will be{' '}
            <span className="span-styling">YOU WON</span>
          </li>
          <li className="rps-active-state-list-item-styling">
            When the user choice is rock and his opponent choice is scissors
            then the result will be{' '}
            <span className="span-styling">YOU WON</span>
          </li>
          <li className="rps-active-state-list-item-styling">
            When the user choice is paper and his opponent choice is scissors
            then the result will be
            <span className="span-styling">YOU LOSE</span>
          </li>
          <li className="rps-active-state-list-item-styling">
            When the user choice is scissors and his opponent choice is scissors
            then the result will be
            <span className="span-styling">IT IS DRAW</span>
          </li>
          <li className="rps-active-state-list-item-styling">
            When the result is <span className="span-styling">YOU WON</span>,
            then the count of the score should be incremented by 1
          </li>
          <li className="rps-active-state-list-item-styling">
            When the result is <span className="span-styling">IT IS DRAW</span>,
            then the count of the score should be the same
          </li>
          <li className="rps-active-state-list-item-styling">
            When the result is <span className="span-styling">YOU LOSE</span>,
            then the count of the score should be decremented by 1.
          </li>
        </ul>
      </Modal>
    </div>
  )

  const renderActiveState = () => (
    <div className="rps-active-state-container">
      {renderActiveStateTopSection()}
      <h1 className="rps-heading-styling">ROCK PAPER SCISSOR</h1>
      <h1 className="active-state-lets-pick">Lets pick</h1>
      {renderScoreBoard()}
      <div className="rps-icons-unordered-list">
        {choicesList.map(eachItem => (
          <button
            data-testid={`${eachItem.id}Button`}
            className="each-icon-button"
            type="button"
            onClick={() => onSelectionChoice(eachItem)}
            key={eachItem.id}
          >
            <img
              src={eachItem.imageUrl}
              alt={eachItem.id}
              className="rps-icons-styling"
            />
          </button>
        ))}
      </div>
    </div>
  )

  const renderRPSgame = () => {
    switch (gameStatus) {
      case gameStateConstants.initial:
        return renderInitialState()
      case gameStateConstants.activeState:
        return renderActiveState()
      case gameStateConstants.drawState:
        return renderDrawState()
      case gameStateConstants.wonState:
        return renderWonState()
      case gameStateConstants.lossState:
        return renderLossState()
      default:
        return 'none'
    }
  }

  return <div className="rps-game-container-bg">{renderRPSgame()}</div>
}

export default RockPaperScissor
