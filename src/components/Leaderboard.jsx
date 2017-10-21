import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './leaderboard.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

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
            .map(([twitch, list]) => ({ twitch, list }))
            .sort((a, b) => {
              const diff = b.list.count((data, index) => data.chests > index) - a.list.count((data, index) => data.chests > index);
              if (diff === 0) return a.twitch > b.twitch ? -1 : 1;
              return diff;
            })
            .map(({ twitch, list }, index) => (
              <div key={twitch} className={styles.entry} style={{ transform: `translateY(${72 * index}px)` }}>
                <div className={styles.name}>{twitch}</div>
                <div className={styles.dungeons}>
                  {list.map((data, index) => (
                    <div className={styles.list}>
                      <div className={cx('dungeon', data.dungeon)}/>
                      <div className={cx('count', { done: data.chests > index })}>{data.chests}</div>
                    </div>
                  ))}
                </div>
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
