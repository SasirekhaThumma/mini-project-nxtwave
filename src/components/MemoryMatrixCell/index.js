import {Component} from 'react'
import './index.css'

class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHighlight: true,
    }
    this.timerId = null
  }

  componentDidMount() {
    const {hiddenCellsDisplayTime} = this.props
    this.timerId = setTimeout(() => {
      this.setState({showHighlight: false})
    }, hiddenCellsDisplayTime)
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  render() {
    const {isHidden, isClicked, wrongClicked, onClick} = this.props
    const {showHighlight} = this.state

    let cellClass = 'cell'

    if (showHighlight && isHidden) cellClass += ' highlighted'
    if (isClicked && !wrongClicked) cellClass += ' clicked'
    if (wrongClicked) cellClass += ' wrong-clicked'

    let testId = 'notHighlighted'
    if (wrongClicked) {
      testId = 'wrongCell'
    } else if (isHidden) {
      testId = 'highlighted'
    }

    return (
      <li className="cell-item">
        <button
          className={cellClass}
          type="button"
          onClick={onClick}
          disabled={showHighlight}
          data-testid={testId}
          aria-label={isHidden ? 'Hidden Cell' : 'Normal Cell'}
        />
      </li>
    )
  }
}

export default Cell
