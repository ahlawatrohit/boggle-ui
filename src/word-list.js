import React from 'react';

export default class WordList extends React.Component {
  render() {
    return (
      <ul >
        {
          this.props.items.map(item =>
            (<li key={item.id}>{item.text}</li>)
          )
        }
      </ul>
    );
  }
}
