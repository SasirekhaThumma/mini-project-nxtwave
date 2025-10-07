import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import './index.css'
import MemoryMatrixCell from '../MemoryMatrixCell'
import MemoryMatrixRulesModal from '../MemoryMatrixRulesModal'
import MemoryMatrixResultsPage from '../MemoryMatrixResultsPage'

class MemoryMatrixGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 0,
      gridSize: 3,
      array: [],
      clickedCellsCount: 0,
      showResults: false,
    }
    this.timerId = null
  }

  componentDidMount() {
    this.initializeLevel(0)
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  initializeLevel = level => {
    const gridSize = level + 3
    const totalCells = gridSize * gridSize
    const numbersArray = Array.from({length: totalCells}, (_, index) => index)

    const randomIndices = new Set()
    while (randomIndices.size < gridSize) {
      randomIndices.add(Math.floor(Math.random() * totalCells))
    }

    const currentLevelGridCells = numbersArray.map(value => ({
      id: Math.random().toString(),
      isHidden: randomIndices.has(value),
      isClicked: false,
      wrongClicked: false,
    }))

    this.setState(
      {
        level,
        gridSize,
        array: currentLevelGridCells,
        clickedCellsCount: 0,
        showResults: false,
      },
      () => {
        clearTimeout(this.timerId)
        this.timerId = setTimeout(this.goToResultsPage, gridSize * 1000 + 1000)
      },
    )
  }

  handleCellClick = index => {
    this.setState(prevState => {
      const {array, gridSize, clickedCellsCount, level} = prevState
      const updatedArray = [...array]
      const clickedCell = updatedArray[index]

      // If wrong cell clicked, game over
      if (!clickedCell.isHidden) {
        clickedCell.wrongClicked = true
        clearTimeout(this.timerId)
        return {array: updatedArray, showResults: true}
      }

      // Correct cell clicked
      clickedCell.isClicked = true
      clickedCell.isHidden = false
      const newClickedCount = clickedCellsCount + 1

      // Level complete
      if (newClickedCount === gridSize) {
        clearTimeout(this.timerId)
        this.initializeLevel(level + 1)
        return {}
      }

      return {
        array: updatedArray,
        clickedCellsCount: newClickedCount,
      }
    })
  }

  goToResultsPage = () => {
    this.setState({showResults: true})
  }

  onClickPlayAgain = () => {
    this.initializeLevel(0)
  }

  render() {
    const {array, level, showResults, gridSize} = this.state

    return showResults ? (
      <MemoryMatrixResultsPage
        level={level}
        onClickPlayAgain={this.onClickPlayAgain}
        data-testid="gameOverBtn"
      />
    ) : (
      <div className="memory-matrix-bg">
        <div className="buttons-container">
          <Link to="/">
            <button className="back-btn" type="button" aria-label="Back">
              <BiArrowBack color="#ffffff" />
              <p>Back</p>
            </button>
          </Link>
          <MemoryMatrixRulesModal />
        </div>

        <h1 className="memory-matrix-heading">Memory Matrix</h1>
        <p className="level-heading" data-testid="level">
          Level - {level + 1}
        </p>

        <ul
          className="grid"
          data-testid="grid"
          style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}
        >
          {array.map(({id, isHidden, isClicked, wrongClicked}, index) => (
            <MemoryMatrixCell
              key={id}
              isHidden={isHidden}
              isClicked={isClicked}
              wrongClicked={wrongClicked}
              onClick={() => this.handleCellClick(index)}
              hiddenCellsDisplayTime={gridSize * 1000}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default MemoryMatrixGame
