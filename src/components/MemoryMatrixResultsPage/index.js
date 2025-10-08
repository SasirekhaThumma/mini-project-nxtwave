import {Line} from 'rc-progress'
import './index.css'

const MemoryMatrixResultsPage = ({level, onClickPlayAgain}) => {
  // Round percentage to avoid floating point mismatch
  const percentage = Math.min(100, Math.round(((level + 1) / 15) * 100))

  return (
    <div className="progressbar-bg">
      {/*  Row of emojis above the progress bar */}
      <div className="progrssbar-emojis-container">
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000742/05_Pokerface_xnvjfb.png"
          alt="neutral face"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000801/07_Grimmace_n4lx7r.png"
          alt="grimacing face"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000716/01_Smile_wuwllh.png"
          alt="slightly smiling face"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000762/03_Optimistic_wzbf7s.png"
          alt="grinning face with big eyes"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000826/04_Grin_rmlxkc.png"
          alt="grinning face with smiling eyes"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000848/05_Laugh_qatkkp.png"
          alt="beaming face with smiling eyes"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000870/02_Happy_fciroi.png"
          alt="grinning face"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000891/02_Like_a_boss_cjrvqq.png"
          alt="smiling face with sunglasses"
          className="progressbar-emoji"
        />
      </div>

      {/*  Progress bar */}
      <Line
        percent={percentage}
        strokeWidth={4}
        strokeColor="blue"
        className="progress-bar"
      />

      {/*  Level labels */}
      <div className="levels-container">
        <p className="level-heading">level 1</p>
        <p className="level-heading">level 5</p>
        <p className="level-heading">level 10</p>
        <p className="level-heading">level 15</p>
      </div>

      {/*  Main result text */}
      <h1 className="congratulations-heading">Congratulations!</h1>
      <h1 className="description-heading">You have reached level {level}</h1>

      {/*  Play again button */}
      <button
        type="button"
        className="play-again-button"
        onClick={onClickPlayAgain}
      >
        Play Again
      </button>
    </div>
  )
}

export default MemoryMatrixResultsPage
