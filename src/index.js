import axios from 'axios'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square">
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
  }

  renderSquare(alphabet) {
    return (
      <Square
        value={alphabet}
      />
      );
  }

  render() {
    const status = 'Score: ' + (this.state.score);
    const data = (this.props.value);
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(data[0])}
          {this.renderSquare(data[1])}
          {this.renderSquare(data[2])}
          {this.renderSquare(data[3])}
        </div>
        <div className="board-row">
          {this.renderSquare(data[4])}
          {this.renderSquare(data[5])}
          {this.renderSquare(data[6])}
          {this.renderSquare(data[7])}
        </div>
        <div className="board-row">
          {this.renderSquare(data[8])}
          {this.renderSquare(data[9])}
          {this.renderSquare(data[10])}
          {this.renderSquare(data[11])}
        </div>
        <div className="board-row">
          {this.renderSquare(data[12])}
          {this.renderSquare(data[13])}
          {this.renderSquare(data[14])}
          {this.renderSquare(data[15])}
        </div>
      </div>
    );
  }
}

class BoggleGame extends React.Component {

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
          gameid: response.data.gameId,
          row: response.data.row,
          column: response.data.column,
          grid: response.data.grid,
        })
        console.log(this.state.grid)
      })
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            value={this.state.grid}
          />
        </div>
        <div>
          <button className="play" onClick={this.handleClick}>
            Start New Game
          </button>
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(
  <BoggleGame />,
  document.getElementById('root')
);
