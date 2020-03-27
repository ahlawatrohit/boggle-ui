import GamePanel from './game-panel.js';
import Board from './board.js';
import React from 'react';
import axios from 'axios'

export default class BoggleGame extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        vi: '',
        gameid: '',
        row: 4,
        column: 4,
        grid: '',
       };
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    axios.get('http://localhost:8000/game/start')
      .then(response => {
        this.setState({
          vi: response.data.vi,
          gameid: response.data.game_id,
          row: response.data.row,
          column: response.data.column,
          grid: response.data.grid,
        })
        console.log(this.state.gameid)
      })
  }

  render() {
    return (
      <div className="game">
        <table>
          <tr>
          <th>
        <div className="game-board">
          <Board
            value={this.state.grid}
          />
        </div>
        </th>

        <th>
        <div>
        <button className="play" onClick={this.handleClick} >
          Start New Game
        </button>
        </div>
        </th>
        </tr>

        <tr>
        <th>
        <div>
        <GamePanel
          value={this.state.gameid}
        />
        </div>
        </th>
        </tr>
          </table>
      </div>
    );
  }
}
