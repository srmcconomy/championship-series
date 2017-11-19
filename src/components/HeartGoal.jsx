import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { List } from 'immutable';

import { addFullHeart, addHeartPiece, removeHeart } from '../actions/heartGoal';
import styles from './heartGoal.scss';

const cx = classNames.bind(styles);

class HeartGoal extends Component {
  onFullHeartClick = () => {
    this.props.addFullHeart(this.props.twitch);
  }

  onHeartPieceClick = () => {
    this.props.addHeartPiece(this.props.twitch);
  }

  onRemoveHeartClick = () => {
    this.props.removeHeart(this.props.twitch);
  }

  render() {
    const { full, piece } = this.props.data;
    return (
      <div className={styles.heartGoal}>
        <div className={styles.left}>
          <div className={styles.heartsContainer}>
            <div className={styles.hearts}>
              {[...Array(full + 3)].map(() => <div className={styles.heart} />)}
              {piece ? <div className={styles[`piece-${piece}`]} /> : null}
            </div>
          </div>
          <div className={styles.controlsContainer}>
            <div className={styles.controls}>
              <button className={styles.addContainer} onClick={this.onFullHeartClick}>
                Add heart container
              </button>
              <button className={styles.addPiece} onClick={this.onHeartPieceClick}>
                Add heart piece
              </button>
              <button className={styles.removeHeart} onClick={this.onRemoveHeartClick}>
                Remove heart
              </button>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.desc}>
            <div>Goal: Get 12 hearts</div>
            <div>You may not enter the following areas until you have the proper amount of hearts:</div>
            <div><span className={styles.fixed}>Kakariko Village</span>4 hearts</div>
            <div><span className={styles.fixed}>Temple of Time</span>6 hearts</div>
            <div><span className={styles.fixed}>Graveyard</span>7 hearts</div>
            <div><span className={styles.fixed}>Any dungeon with a blue warp</span>8 hearts</div>
            <div>Duping hearts is banned</div>
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
    return { data: { full: 0, piece: 0 } };
  },
  {
    addFullHeart,
    addHeartPiece,
    removeHeart,
  },
)(HeartGoal);
