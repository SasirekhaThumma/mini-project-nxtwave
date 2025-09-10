import {Component} from 'react'
import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'

import 'reactjs-popup/dist/index.css'
import './index.css'

const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
]

class EmojiGame extends Component {
  state = {
    view: 'rules', // rules | game | result
    score: 0,
    topScore: 0,
    clickedEmojis: [],
    gameResult: '', // win | lose
  }

  handleBack = () => {
    const {history} = this.props
    history.push('/') // navigate to Home
  }

  startGame = () => {
    this.setState({view: 'game', score: 0, clickedEmojis: [], gameResult: ''})
  }

  shuffleEmojis = () => {
    const {clickedEmojis} = this.state
    const shuffled = [...emojisList].sort(() => Math.random() - 0.5)
    return shuffled.map(each => ({
      ...each,
      isClicked: clickedEmojis.includes(each.id),
    }))
  }

  onEmojiClick = id => {
    const {clickedEmojis} = this.state
    if (clickedEmojis.includes(id)) {
      this.setState({view: 'result', gameResult: 'lose'})
    } else {
      const newClicked = [...clickedEmojis, id]
      if (newClicked.length === emojisList.length) {
        this.setState(prev => ({
          score: prev.score + 1,
          topScore: Math.max(prev.topScore, prev.score + 1),
          view: 'result',
          gameResult: 'win',
        }))
      } else {
        this.setState(prev => ({
          clickedEmojis: newClicked,
          score: prev.score + 1,
          topScore: Math.max(prev.topScore, prev.score + 1),
        }))
      }
    }
  }

  playAgain = () => {
    this.setState({view: 'game', score: 0, clickedEmojis: [], gameResult: ''})
  }

  renderRulesPopup = () => (
    <Popup
      modal
      trigger={
        <button type="button" className="rules-btn">
          Rules
        </button>
      }
    >
      {close => (
        <div className="rules-popup">
          <button
            data-testid="close"
            type="button"
            className="close-btn"
            onClick={close}
            aria-label="Close rules popup"
          >
            <CgClose color="grey" size={24} aria-label="close" />
          </button>

          <h2 className="rules-title">Rules</h2>
          <ul className="rules-list">
            <li>User should be able to see the list of Emojis</li>
            <li>
              When the user clicks any one of the Emoji for the first time, then
              the count of the score should be incremented by 1 and the List of
              emoji cards should be shuffled.
            </li>
            <li>
              This process should be repeated every time the user clicks on an
              emoji card
            </li>
            <li>
              When the user clicks on all Emoji cards without clicking any of it
              twice, then the user will win the game
            </li>
            <li>
              When the user clicks on the same Emoji for the second time, then
              the user will lose the game.
            </li>
            <li>
              Once the game is over, the user will be redirected to the results
              page.
            </li>
          </ul>
        </div>
      )}
    </Popup>
  )

  renderRulesPage = () => (
    <div className="rules-page">
      <button
        type="button"
        onClick={this.handleBack}
        className="back-btn"
        aria-label="Go back"
      >
        <BiArrowBack />
        Back
      </button>
      <div className="rules-page-con">
        <div className="emoji-rule-img-con">
          <img
            src="https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757169815/Asset_1_4x_1_vatmby.png"
            alt="emoji game"
            className="emoji-rules-img"
          />
          <h1 className="game-heading">Emoji Game</h1>
        </div>
        <div className="emoji-game-rules-list">
          <h1 className="rules-heading">Rules</h1>
          <ul className="rules-list">
            <li>User should be able to see the list of Emojis</li>
            <li>
              When the user clicks any one of the Emoji for the first time, then
              the count of the score should be incremented by 1 and the List of
              emoji cards should be shuffled.
            </li>
            <li>
              This process should be repeated every time the user clicks on an
              emoji card
            </li>
            <li>
              When the user clicks on all Emoji cards without clicking any of it
              twice, then the user will win the game
            </li>
            <li>
              When the user clicks on the same Emoji for the second time, then
              the user will lose the game.
            </li>
            <li>
              Once the game is over, the user will be redirected to the results
              page.
            </li>
          </ul>
          <button type="button" className="start-btn" onClick={this.startGame}>
            Start Play
          </button>
        </div>
      </div>
    </div>
  )

  renderGameView = () => {
    const shuffled = this.shuffleEmojis()
    const {score} = this.state
    return (
      <div className="game-view">
        <nav className="game-view-nav">
          <div className="emoji-game-nav-logo">
            <img
              src="https://res.cloudinary.com/dnxqbn4b5/image/upload/v1754038512/wink_1_gqv2xz.png"
              alt="emoji game logo "
              className="emoji-nav-logo"
            />
            <h1>Emoji Game</h1>
          </div>
          <h1 className="score-text">Score: {score}</h1>
        </nav>
        <div className="emoji-game-con">
          <div className="emoji-rule-back">
            <button
              type="button"
              onClick={this.handleBack}
              className="back-btn"
            >
              <BiArrowBack />
              Back
            </button>
            {this.renderRulesPopup()}
          </div>
          <div className="emoji-grid">
            {shuffled.map(each => (
              <button
                key={each.id}
                type="button"
                className="emoji-btn"
                onClick={() => this.onEmojiClick(each.id)}
                data-testid="emoji"
                aria-label="emoji"
              >
                <img src={each.emojiUrl} alt="emoji" className="emoji-img" />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  renderResultView = () => {
    const {score, gameResult} = this.state
    const resultImg =
      gameResult === 'win'
        ? 'https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757222974/Image_2_geufoh.png'
        : 'https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757222980/Image_3_l7ot1d.png'
    const resultAlt = gameResult === 'win' ? 'win' : 'lose'
    return (
      <div className="result-view">
        <nav className="game-view-nav">
          <div className="emoji-game-nav-logo">
            <img
              src="https://res.cloudinary.com/dnxqbn4b5/image/upload/v1754038512/wink_1_gqv2xz.png"
              alt="emoji game logo"
              className="emoji-nav-logo"
            />
            <h1>Emoji Game</h1>
          </div>
        </nav>
        <div className="emoji-result-view">
          <img
            src={`${resultImg}`}
            alt={`${resultAlt}`}
            className="emoji-result-img"
          />
          <div className="emoji-game-result-con">
            <h1 className="game-result-msg">
              {gameResult === 'win' ? 'You Won!' : 'You Lose'}
            </h1>
            <p className="game-result-bestscore">Best Score</p>
            <p className="game-result-score">{score}/12</p>
            <button
              type="button"
              className="play-again-btn"
              onClick={this.playAgain}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {view} = this.state
    if (view === 'rules') return this.renderRulesPage()
    if (view === 'game') return this.renderGameView()
    return this.renderResultView()
  }
}

export default withRouter(EmojiGame)
