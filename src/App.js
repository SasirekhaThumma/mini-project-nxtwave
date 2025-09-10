import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Home from './components/Home'
import EmojiGame from './components/EmojiGame'
import MemoryMatrix from './components/MemoryMatrix'
import RockPaperScissors from './components/RockPaperScissors'
import CardFlipMemoryGame from './components/CardFlipMemoryGame'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/emoji-game" component={EmojiGame} />
      <Route exact path="/rock-paper-scissors" component={RockPaperScissors} />
      <Route exact path="/card-flip" component={CardFlipMemoryGame} />
      <Route exact path="/memory-matrix" component={MemoryMatrix} />
    </Switch>
  </BrowserRouter>
)

export default App
