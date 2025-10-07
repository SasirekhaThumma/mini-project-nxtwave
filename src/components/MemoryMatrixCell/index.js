import {Component} from 'react'
import './index.css'

class MemoryMatrixCell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldShowHiddenCells: true,
    }
    this.timerId = null
  }

  componentDidMount() {
    const {hiddenCellsDisplayTime} = this.props
    this.timerId = setTimeout(() => {
      this.setState({shouldShowHiddenCells: false})
    }, hiddenCellsDisplayTime)
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  render() {
    const {isHidden, isClicked, wrongClicked, onClick} = this.props
    const {shouldShowHiddenCells} = this.state

    const cellStyle = {}
    let dataTestid = ''

    // Coloring logic after click
    if (isClicked) {
      cellStyle.backgroundColor = 'blue' // correct click
    } else if (wrongClicked) {
      cellStyle.backgroundColor = 'red' // wrong click
    }

    // Test ID setup
    dataTestid = isHidden ? 'highlighted' : 'notHighlighted'

    // Disable all clicks during show period
    const isDisabled = shouldShowHiddenCells

    return (
      <li>
        <button
          className={`cell ${
            isHidden && shouldShowHiddenCells ? 'highlighted' : ''
          }`}
          data-testid={dataTestid}
          style={cellStyle}
          onClick={!isDisabled ? onClick : undefined}
          type="button"
          disabled={isDisabled}
        >
          {/* Empty cell */}
        </button>
      </li>
    )
  }
}

export default MemoryMatrixCell
