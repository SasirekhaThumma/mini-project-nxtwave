import {Component} from 'react'
import Modal from 'react-modal'
import {withRouter} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'

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
    isRulesModalOpen: false,
    shuffledEmojis: [...emojisList].sort(() => Math.random() - 0.5),
  }

  openRulesModal = () => {
    this.setState({isRulesModalOpen: true})
  }

  closeRulesModal = () => {
    this.setState({isRulesModalOpen: false})
  }

  handleBack = () => {
    const {history} = this.props
    history.push('/')
  }

  startGame = () => {
    this.setState({
      view: 'game',
      score: 0,
      clickedEmojis: [],
      gameResult: '',
      shuffledEmojis: [...emojisList].sort(() => Math.random() - 0.5),
    })
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
        const shuffled = [...emojisList].sort(() => Math.random() - 0.5)
        this.setState(prev => ({
          clickedEmojis: newClicked,
          score: prev.score + 1,
          topScore: Math.max(prev.topScore, prev.score + 1),
          shuffledEmojis: shuffled,
        }))
      }
    }
  }

  playAgain = () => {
    this.setState({
      view: 'game',
      score: 0,
      clickedEmojis: [],
      gameResult: '',
      shuffledEmojis: [...emojisList].sort(() => Math.random() - 0.5),
    })
  }

  renderRulesPopup = () => {
    const {isRulesModalOpen} = this.state
    return (
      <div>
        <button
          type="button"
          className="rules-btn"
          onClick={this.openRulesModal}
        >
          Rules
        </button>
        <Modal
          isOpen={isRulesModalOpen}
          onRequestClose={this.closeRulesModal}
          contentLabel="Emoji Game Rules"
          className="modal-content"
          overlayClassName="modal-overlay"
          ariaHideApp={false}
        >
          <button
            type="button"
            className="close-btn"
            onClick={this.closeRulesModal}
            data-testid="close"
            aria-label="Close rules modal"
          >
            <CgClose color="grey" size={24} />
          </button>
          <h1 className="rules-title">Rules</h1>
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
        </Modal>
      </div>
    )
  }

  renderRulesPage = () => (
    <div className="rules-page">
      <button
        type="button"
        onClick={this.handleBack}
        className="back-btn"
        aria-label="Go back"
      >
        <BiArrowBack color="#ffffff" />
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
            Start playing
          </button>
        </div>
      </div>
    </div>
  )

  renderGameView = () => {
    const {score, shuffledEmojis} = this.state
    const updatedScore = score.toString().padStart(2, '0')
    return (
      <div className="game-view">
        <nav className="game-view-nav">
          <div className="emoji-game-nav-logo">
            <img
              src="https://res.cloudinary.com/dnxqbn4b5/image/upload/v1754038512/wink_1_gqv2xz.png"
              alt="emoji logo"
              className="emoji-nav-logo"
            />
            <h1>Emoji Game</h1>
          </div>
          <p className="score-text">Score: {updatedScore}</p>
        </nav>
        <div className="emoji-game-con">
          <div className="emoji-rule-back">
            <button
              type="button"
              onClick={this.handleBack}
              className="back-btn"
            >
              <BiArrowBack color="#ffffff" />
              Back
            </button>
            {this.renderRulesPopup()}
          </div>
          <ul className="emoji-grid">
            {shuffledEmojis.map(each => (
              <li key={each.id} className="emoji-btn">
                <button
                  type="button"
                  className="emoji-btn"
                  onClick={() => this.onEmojiClick(each.id)}
                  data-testid="emoji"
                >
                  <img
                    src={each.emojiUrl}
                    alt={each.emojiName}
                    className="emoji-img"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderResultView = () => {
    const {score, gameResult} = this.state
    const updatedScore = score.toString().padStart(2, '0')

    const resultImg =
      gameResult === 'win'
        ? 'https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757222974/Image_2_geufoh.png'
        : 'https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757222980/Image_3_l7ot1d.png'
    const resultAlt = gameResult === 'win' ? 'won' : 'lose'

    return (
      <div className="result-view">
        <nav className="game-view-nav">
          <div className="emoji-game-nav-logo">
            <img
              src="https://res.cloudinary.com/dnxqbn4b5/image/upload/v1754038512/wink_1_gqv2xz.png"
              alt="emoji logo"
              className="emoji-nav-logo"
            />
            <h1>Emoji Game</h1>
          </div>
        </nav>
        <div className="emoji-result-view">
          <img src={resultImg} alt={resultAlt} className="emoji-result-img" />
          <div className="emoji-game-result-con">
            <h1 className="game-result-msg">
              {gameResult === 'win' ? 'You Won!' : 'You Lose'}
            </h1>
            <p className="game-result-bestscore">Best Score</p>
            <p className="game-result-score">Score</p>
            <p className="game-result-score">{updatedScore}/12</p>

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
