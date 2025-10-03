import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="home-container">
    <h1 className="home-heading">Games</h1>
    <ul className="games-list">
      <li className="games-list-item">
        <Link to="/emoji-game" className="game-link">
          <img
            src="https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757172300/Group_7471_1_vl9oeg.png"
            alt="emoji game"
          />
        </Link>
      </li>
      <li className="games-list-item">
        <Link to="/memory-matrix" className="game-link">
          <img
            src="https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757172320/Group_7585_1_qw47d6.png"
            alt="memory matrix"
          />
        </Link>
      </li>
      <li className="games-list-item">
        <Link to="/rock-paper-scissor" className="game-link">
          <h1>Rock Paper Scissors</h1>
          <img
            src="https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757170136/Group_7469_4_kpvikq.png"
            alt="rock paper scissor"
          />
        </Link>
      </li>
      <li className="games-list-item">
        <Link to="/card-flip-memory-game" className="game-link">
          <img
            src="https://res.cloudinary.com/dnxqbn4b5/image/upload/v1757170158/animals_2_lk5rjv.png"
            alt="card flip memory game"
          />
        </Link>
      </li>
    </ul>
  </div>
)

export default Home
