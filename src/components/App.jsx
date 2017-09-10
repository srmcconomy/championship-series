import React, { Component } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { setGoal } from '../actions';
import classnames from 'classnames/bind';

import styles from './app.scss';

const cx = classnames.bind(styles);

const goals = [
  '1 Skulltula from each of 3 adult dungeons',
  'Defeat both Dead Hands',
  'Ocarina of Time',
  '3 songs',
  'Plant 7 Magic Beans',
  'Get Bombchu chest in Spirit Temple',
  '6 hearts',
  'Both child Gerudo Valley Skulltulas',
  'All 4 child Zora Skulltulas',
  'Fill all 4 bottle slots',
  '99 Rupees',
  'Win Bombchu Bowling prize',
  'Goron Bracelet',
  'All 3 Skulltulas in Bottom of the Well',
  '3 shields',
  'Ice Cavern HP',
  'Defeat a White Wolfos',
  'Blue Fire',
  'One Fairy Spell',
  'Open 5 chests from grottos',
  'Defeat Phantom Ganon',
  'One Boss Key',
  '4 maps',
  '7 Kakariko area Skulltulas',
  '30 Deku Nuts',
]


class App extends Component {
  constructor() {
    super();
    this.state = {
      markedGoals: new List([...Array(25).map(() => false)]),
    };
  }

  onGoalClick = index => () => {
    this.props.setGoal(this.props.twitch, index, !this.props.goals.get(index));
  }

  onGoalRightClick = index => e => {
    e.preventDefault();
    this.setState({
      markedGoals: this.state.markedGoals.set(index, !this.state.markedGoals.get(index)),
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.col}>
          <div className={styles.board}>
            {goals.map((goal, index) => (
              <div
                key={goal}
                className={cx({
                  goal: true,
                  selected: this.props.goals.get(index),
                  marked: this.state.markedGoals.get(index),
                })}
                onClick={this.onGoalClick(index)}
                onContextMenu={this.onGoalRightClick(index)}
              >
                {goal}
              </div>
            ))}
          </div>
          <div className={styles.desc}>
            Right click for red, left click for green<br />
            The amount of green goals you have will appear on the leaderboard on stream
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({ goals: state.get(ownProps.twitch) || new List() }),
  { setGoal },
)(App);
