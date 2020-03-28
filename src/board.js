import React from 'react';

function Square(props) {
  return (
    <button className="square">
      {props.value}
    </button>
  );
}

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSquare(alphabet) {
    return (
      <Square
        value={alphabet}
      />
    );
  }

  render() {
    const data = (this.props.value);
    return (
      <div>
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
