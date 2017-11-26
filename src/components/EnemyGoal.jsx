import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { List } from 'immutable';

import { toggleEnemy } from '../actions/enemyGoal';
import styles from './enemyGoal.scss';

const images = require.context('./images', true, /\.png$/);

const cx = classNames.bind(styles);

const data = {
  'Bottom of the Well': [
    'Beamos',
    'Dead Hand',
    'Deku Baba',
    'Gibdo',
    'Gold Skulltula',
    'Green Bubble',
    'Keese',
    'Like Like',
    'ReDead',
    'Skulltula',
    'Wallmaster',
  ],
  "Dodongo's Cavern": [
    'Armos',
    'Baby Dodongo',
    'Beamos',
    'Business Scrub',
    'Dodongo',
    'Gold Skulltula',
    'Keese',
    'Lizalfos',
    'Skullwalltula',
  ],
  'Shadow Temple': [
    'Beamos',
    'Dead Hand',
    'Floormaster',
    'Gibdo',
    'Gold Skulltula',
    'Keese',
    'Like Like',
    'ReDead',
    'Skulltula',
    'Stalfos',
    'Wallmaster',
  ],
  'Forest Temple': [
    'Blue Bubble',
    'Deku Baba',
    'Floormaster',
    'Big Deku Baba',
    'Gold Skulltula',
    'Green Bubble',
    'Octorok',
    'Poe Sister (any)',
    'Skulltula',
    'Skullwalltula',
    'Stalfos',
    'Wallmaster',
    'Wolfos',
  ],
  'Spirit Temple': [
    'Anubis',
    'Armos',
    'Beamos',
    'Floormaster',
    'Gold Skulltula',
    'Green Bubble',
    'Iron Knuckle',
    'Keese',
    'Like Like',
    'Lizalfos',
    'Skullwalltula',
    'Stalfos',
    'Torch Slug',
    'Wallmaster',
    'White Bubble',
    'Wolfos',
  ],
};

class EnemyGoal extends Component {
  onEnemyClick = (dungeon, enemy) => () => {
    const newVal = this.props.data ? !this.props.data[dungeon].get(enemy) : true;
    this.props.toggleEnemy(this.props.twitch, dungeon, enemy, newVal);
  }

  renderDungeon(name, enemies) {
    return (
      <div key={name} className={styles.dungeon}>
        <div className={styles.name}>
          {name}
        </div>
        <div className={styles.enemies}>
          {enemies.map(enemy => (
            <div
              key={enemy}
              className={cx('enemy', { selected: this.props.data && this.props.data[name].get(enemy) })}
              onClick={this.onEnemyClick(name, enemy)}
              style={{backgroundImage: `url(${images(`./${enemy.replace(/ /g, '-')}.png`)}`}}
            >
              <div className={styles.enemyName}>
                {enemy}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.enemyGoal}>
        <div className={styles.left}>
          {Object.keys(data).map(key => this.renderDungeon(key, data[key]))}
        </div>
        <div className={styles.right}>
          <div className={styles.desc}>
            <div>Goal: Beat Shadow, Beat Spirit, Get Bow, enter Light Arrows CS</div>
            <div>Defeat all of the listed enemies in the proper dungeons</div>
            <div>Enemies listed more than once must be defeated once per dungeon that they are listed in</div>
            <div>No IM/WW</div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    if (state.has(props.twitch)) {
      return { data: state.get(props.twitch) };
    }
    return { data: null };
  },
  {
    toggleEnemy,
  },
)(EnemyGoal);
