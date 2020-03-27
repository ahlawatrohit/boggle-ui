import axios from 'axios'
import WordList from './word-list.js';
import React from 'react';

export default class GamePanel  extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' , score: 0};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const status = 'Score: ' + (this.state.score);
    return (
      <div>
        <div className="status">{status}</div>
        <div>
        <form onSubmit={this.handleSubmit}>
          <h3>
            Find words
          </h3>
          <input
            id="find-words"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Submit
          </button>
        </form>
          {this.state.message}
        </div>
        <h4>Valid Words Found so far</h4>
        <WordList items={this.state.items} />
      </div>
    );
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

    axios.get('http://localhost:8000/game/check?word='+ this.state.text +'&game_id=' + (this.props.value))
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
}
