import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './leaderboard.scss';

console.log(styles);

function placeText(place) {
  if (place % 10 === 1 && place % 100 !== 11) return `${place}st`;
  if (place % 10 === 2 && place % 100 !== 12) return `${place}nd`;
  if (place % 10 === 3 && place % 100 !== 13) return `${place}rd`;
  return `${place}th`;
}

class Leaderboard extends Component {
  render() {
    return (
      <div className={styles.leaderboard}>
        <div className={styles.places}>
          {this.props.players.keySeq()
            .map((key, index) => (
              <div key={index} className={styles.place}>{placeText(index + 1)}</div>
            ))
          }
        </div>
        <div className={styles.players}>
          {this.props.players.entrySeq()
            .map(([twitch, stats]) => ({ twitch, acquired: stats.acquired, spent: stats.spent }))
            .sort((a, b) => b.acquired + b.spent - a.acquired - a.spent)
            .map(({ twitch, acquired, spent }, index) => ({ twitch, acquired, spent, index }))
            .sort((a, b) => (a.twitch.toLowerCase() < b.twitch.toLowerCase() ? -1 : 1))
            .map(({ twitch, acquired, spent, index }) => (
              <div key={twitch} className={styles.entry} style={{ transform: `translateY(${40 * index}px)` }}>
                <div className={styles.name}>{twitch}</div>
                <div className={styles.score}>{acquired + spent}</div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ players: state })
)(Leaderboard);
