import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removePlayer } from '../actions/rupeeGoal';

class Admin extends Component {
  onRemoveClick = twitch => () => {
    this.props.removePlayer(twitch);
  }

  render() {
    return (
      <div style={{ margin: 20 }}>
        {this.props.players.entrySeq().map(([twitch, { acquired, spent, wallet }]) => (
          <div key={twitch}>
            <div>{twitch}</div>
            <div>in wallet: {acquired}</div>
            <div>spent: {spent}</div>
            <div>wallet size: {wallet}</div>
            <button onClick={this.onRemoveClick(twitch)}>REMOVE</button>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(
  state => ({ players: state }),
  { removePlayer }
)(Admin);
