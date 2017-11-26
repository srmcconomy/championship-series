import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removePlayer } from '../actions/enemyGoal';

class Admin extends Component {
  onRemoveClick = twitch => () => {
    this.props.removePlayer(twitch);
  }

  render() {
    return (
      <div style={{ margin: 20 }}>
        {this.props.players.entrySeq().map(([twitch, data]) => (
          <div key={twitch} style={{ margin: '20px' }}>
            <div>{twitch}</div>
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
