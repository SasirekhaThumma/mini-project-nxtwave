import {Component} from 'react'
import './index.css'

class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHighlight: true, // initial highlight
    }
    this.timerId = null
  }

  componentDidMount() {
    const {hiddenCellsDisplayTime} = this.props
    // Remove initial highlight after display time
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

    return (
      <li>
        <button className={cellClass}
        type="button" 
        onClick={onClick}
        data-testid={isHidden ? 'highlighted' : 'notHighlighted'}
        aria-label={isHidden ? 'Hidden Cell' : 'Normal Cell'} />
      </li>
    )
  }
}

export default Cell
