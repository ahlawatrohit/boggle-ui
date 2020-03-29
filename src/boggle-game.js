import Board from './board.js';
import WordList from './word-list.js';
import React from 'react';
import axios from 'axios'

export default class BoggleGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameid: '',
      row: 4,
      column: 4,
      grid: '',
      seconds: 0,
      isButtonDisabled: false,
      isResultDisabled: true,
      items: [],
      text: '' ,
      score: 0,
      message: '',
      result: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRotateBoard = this.handleRotateBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetResults = this.handleGetResults.bind(this);
  }

  tick() {
    if (this.state.seconds > 0) {
      this.setState(state => ({
        seconds: state.seconds - 1
      }));
    }
    else if (this.state.seconds === 0 ){
      this.setState({
        isButtonDisabled: true,
      })
      if (this.state.gameid.length !== 0){
          this.handleGetResults()
      }
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleGetResults(i) {
    axios.get('http://localhost:8000/game/result?game_id=' + (this.state.gameid))
      .then(response => {
        this.setState({
          result: this.populateResult(response.data.result),
          isResultDisabled: false,
          gameid: '',
        })
      })
 }

  populateResult(result) {
    var words = ''
    for (var i = 0, length = result.length; i < length; i++) {
      if (i === 0) {
        words = result[i]
      }
      else {
        words = words + " , " + result[i]
      }
    }
    return words
 }

  handleClick(i) {
    axios.get('http://localhost:8000/game/start')
      .then(response => {
        this.setState({
          gameid: response.data.game_id,
          row: response.data.row,
          column: response.data.column,
          grid: response.data.grid,
          seconds: 180,
          button: 'enable',
          items: [],
          text: '' ,
          score: 0,
          message: '',
          isButtonDisabled: false,
          isResultDisabled: true,
          result: []
        })
      })
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };

    axios.get('http://localhost:8000/game/check?word='+ this.state.text +'&game_id=' + (this.state.gameid))
      .then(response => {
        this.setState({
          message: response.data.message,
          status: response.data.status,
          score: this.state.score + response.data.score,
        })
        if (this.state.status === 'valid'){
          this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
          }));
        }
      })
  }

  handleRotateBoard(i) {
    axios.get('http://localhost:8000/game/rotate?game_id=' + this.state.gameid )
      .then(response => {
        this.setState({
          grid: response.data.grid,
        })
      })
  }

  render() {
    const status = 'Score: ' + (this.state.score);
    return (
      <div className="game">
        <table>
        <thead><tr><td><h1>BOGGLE</h1></td></tr></thead>
        <tbody>
        <tr><th>
        <div className="game-board">
          <Board value={this.state.grid}/>
        </div>
        </th>
        <th>
        <div> Time Left: {this.state.seconds} </div>
        <div>
        <button className="play" onClick={this.handleClick}>
          Start New Game
        </button>
        </div>

        <div>
        <button className="play" onClick={this.handleRotateBoard}
         disabled={ this.state.isButtonDisabled }>
          Rotate board
        </button>
        </div>
        </th></tr>
        <tr><th>
        <div>
        <div className="status">{status}</div>
        <div>
        <form onSubmit={this.handleSubmit}>
        <h3>Find words</h3>
          <input
            id="find-words"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button disabled={this.state.isButtonDisabled}>
            Submit
          </button>
        </form>
          {this.state.message}
        </div>
        <h4>Valid Words Found so far</h4>
        <WordList items={this.state.items} />
        </div>
        </th>
        <th>
        <div hidden={ this.state.isResultDisabled} >
        <h2> GAME OVER </h2>
        <h4> Valid Game Words</h4>
        <textarea className="result-content"
         defaultValue={this.state.result}
       />
        </div>
        </th></tr>
        </tbody>
        </table>
      </div>
    );
  }
}
