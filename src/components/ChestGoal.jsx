import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { List } from 'immutable';

import { setChests, removeChests } from '../actions/chestGoal';
import styles from './chestGoal.scss';

const dungeons = [
  'deku',
  'dc',
  'jabu',
  'forest',
  'fire',
  'water',
  'shadow',
  'spirit',
  'ganon',
];

const cx = classNames.bind(styles);

class ChestGoal extends Component {
  onLeftDungeonClick = (index, dungeon) => () => {
    this.props.setChests(this.props.twitch, index, dungeon, this.props.data.get(index).chests + 1);
  }

  onLeftDungeonRightClick = (index) => e => {
    e.preventDefault();
    this.props.removeChests(this.props.twitch, index);
  }

  onRightDungeonClick = (dungeon) => () => {
    if (this.props.data.some(data => data.dungeon === dungeon)) return;
    this.props.setChests(this.props.twitch, this.props.data.size, dungeon, 0);
  }

  render() {
    return (
      <div className={styles.chestGoal}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={cx('capture-square')}>
              {this.props.data.map((data, index) => (
                data &&
                <div
                  key={index}
                  className={cx('left-dungeon')}
                  onClick={this.onLeftDungeonClick(index, data.dungeon)}
                  onContextMenu={this.onLeftDungeonRightClick(index)}>
                  <div className={cx(['dungeon', data.dungeon])}/>
                  <div className={cx('chests')}>
                    <span className={cx('num')}>{data.chests}</span>
                    <span className={cx('den')}>/{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
            <span>Capture this square to put it on your stream</span>
          </div>
          <div className={styles.right}>
            <div>
              {dungeons.map((name, index) => (
                <div
                  key={name}
                  className={cx('right-dungeon')}
                  onClick={this.onRightDungeonClick(name)}
                >
                  <div
                    className={cx({ dungeon: true, [name]: true, inactive: this.props.data.some(data => data.dungeon === name) })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.desc}>
          Open 1-9 chests per dungeon, based on the order you enter the dungeons in<br/><br/>
          Full rules: <a href="https://pastebin.com/YjL9PJKD">https://pastebin.com/YjL9PJKD</a><br/><br/>
          <br/><br/>
          How to use this tool:<br/><br/>
          Step 1: click on a dungeon icon when you ENTER that dungeon.<br/>
          That dungeon then moves into the column on the left.<br/><br/>
          Step 2: click on the dungeon icon in the left column when you open a chest in that dungeon<br/><br/>
          If you mess up you can right-click on a dungeon icon to remove it from the left column.
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
    return { data: new List };
  },
  {
    setChests,
    removeChests,
  },
)(ChestGoal);
