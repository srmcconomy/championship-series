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

function leftPad(n, d = 2, c = '0') {
  n = '' + n;
  if (n.length > d) return n;
  return `${[...new Array(d - n.length + 1)].join(c)}${n}`;
}

function timeText(time) {
  const s = time % 60;
  const m = (time / 60 | 0) % 60;
  const h = time / 3600 | 0;
  return `${h}:${leftPad(m)}:${leftPad(s)}`;
}

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = { times: new Map() };
  }

  componentDidMount() {
    this._interval = setInterval(
      async () => {
        const req = await fetch('http://api.speedrunslive.com/races');
        const { races } = await req.json();
        const race = races.find(r => Object.keys(r.entrants).some(name => name.toLowerCase() === 'jkoper'));
        if (!race) return;
        const times = new Map(Object.values(race.entrants).filter(({ time }) => time > 0).map(({ twitch, time }) => [ twitch.toLowerCase(), time ]))
        this.setState({ times });
      },
      10000,
    )
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    const players = this.props.players.entrySeq()
      .map(([twitch, data]) => {
        const dungeons = {};
        Object.keys(data.toJS()).forEach(key => dungeons[key] = data[key].count(val => val));
        let score = 0;
        Object.keys(dungeons).forEach(key => score += dungeons[key]);
        return {
          twitch,
          dungeons,
          score,
          time: this.state.times.has(twitch.toLowerCase()) ? this.state.times.get(twitch.toLowerCase()) : null,
        };
      })
      .sort((a, b) => {
        if (a.time && b.time) return a.time - b.time;
        if (a.time) return -1;
        if (b.time) return 1;
        const diff = b.score - a.score;
        if (diff === 0) return a.twitch > b.twitch ? -1 : 1;
        return diff;
      })
      .map(({ twitch, dungeons, score, time}, index, seq) => ({
        twitch,
        dungeons,
        score,
        time,
        hidePlace: index > 0 && (time ? seq.get(index - 1).time === time : seq.get(index - 1).score === score)
      }));
    return (
      <div className={styles.leaderboard}>
        <div className={styles.places}>
          {players.map(({ hidePlace }, index) => (
              <div key={index} className={styles.place}>{hidePlace ? '' : placeText(index + 1)}</div>
            ))
          }
        </div>
        <div className={styles.players}>
          {
            players.map(({ twitch, dungeons, score, time }, index) => (
              <div key={twitch} className={styles.entry} style={{ transform: `translateY(${40 * index}px)` }}>
                <div className={styles.name}>{twitch}</div>
                {time ? <div className={styles.time}>{time && timeText(time)}</div> : <div className={styles.score}>{score}</div>}
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
