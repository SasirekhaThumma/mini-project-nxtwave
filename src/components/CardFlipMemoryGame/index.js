import './index.css'

import {Link} from 'react-router-dom'

import {BiArrowBack} from 'react-icons/bi'

import {useState} from 'react'

import CardFlipMemoryGameInterface from '../CardFlipMemoryGameInterface'

const gameStateConstants = {
  initialState: 'INITIAL',
  activeState: 'ACTIVE',
  resultState: 'RESPONSE',
}

const CardFlipMemoryGame = () => {
  const [gameState, setGameState] = useState(gameStateConstants.initialState)

  const onSelection = () => {
    setGameState(gameStateConstants.activeState)
  }

  const renderInitialState = () => (
    <div className="cfm-initial-state-container">
      <Link to="/" className="link-styling">
        <button type="button" className="cfm-initial-Back-button">
          <BiArrowBack color="#ffffff" /> Back
        </button>
      </Link>
      <h1 className="cfm-heading-styling">Card-Flip Memory Game</h1>
      <img
        src="https://res.cloudinary.com/dvptfc0ji/image/upload/v1729259729/animals_fjhgr1.png"
        alt="card flip memory game"
        className="cfm-initial-image"
      />
      <h1 className="cfm-rules-inital-text">Rules</h1>
      <ul className="cfm-inital-rules-unordered-styling">
        <li className="cfm-inital-list-item-styling">
          When the game is started, the users should be able to see the list of
          Cards that are shuffled and turned face down.
        </li>
        <li className="cfm-inital-list-item-styling">
          Users should be able to compare only two cards at a time.
        </li>
        <li className="cfm-inital-list-item-styling">
          When a user starts the game, the user should be able to see the Timer
          running.
        </li>
        <li className="cfm-inital-list-item-styling">
          When the user is not able to find all the cards before the timer ends
          then the game should end and redirect to the Time Up Page.
        </li>
        <li className="cfm-inital-list-item-styling">
          The Timer starts from 2 Minutes.
        </li>
        <li className="cfm-inital-list-item-styling">
          If the user finds all the matching cards before the timer ends, then
          the user should be redirected to the results page.
        </li>
        <li className="cfm-inital-list-item-styling">
          If the two cards have the same image, they remain face up. If not,
          they should be flipped face down again after a short 2 seconds.
        </li>
      </ul>
      <button
        className="cfm-inital-start-button"
        type="button"
        onClick={onSelection}
      >
        Start Playing
      </button>
    </div>
  )

  const renderActiveState = () => (
    <>
      <CardFlipMemoryGameInterface />
    </>
  )

  const renderCFMGame = () => {
    switch (gameState) {
      case gameStateConstants.initialState:
        return renderInitialState()
      case gameStateConstants.activeState:
        return renderActiveState()
      default:
        return 'none'
    }
  }

  return <div className="cfm-mainbg-container">{renderCFMGame()}</div>
}

export default CardFlipMemoryGame
