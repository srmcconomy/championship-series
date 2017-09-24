import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { acquireRupees, spendRupees, setWallet } from '../actions/rupeeGoal';
import styles from './rupeeGoal.scss';

const cx = classNames.bind(styles);

class RupeeGoal extends Component {
  onAcquireClick = amount => () => {
    this.props.acquireRupees(this.props.twitch, amount);
  }

  onSpendClick = amount => () => {
    this.props.spendRupees(this.props.twitch, amount);
  }

  onSetWalletClick = amount => () => {
    this.props.setWallet(this.props.twitch, amount);
  }


  render() {
    return (
      <div className={styles.rupeeGoal}>
        <div className={styles.desc}>
          Goal: Spend at least 1200 rupees, then talk to the carpenter boss with at least 200 rupees<br/><br/>
          Restriction: You may not pick up any rupees except from chests.  If you accidentally pick up a rupee you must immediately reset your game<br/><br/>
          Each item can ONLY be bought once, choose carefully which price you buy them at.<br/><br/>
          YOU MAY PICK UP NON-CHEST RUPEES IF YOUR WALLET IS FULL<br/><br/>
        </div>
        <div className={styles.tool}>
          Wallet:
          <div className={styles.wallets}>
            <button className={cx({ baseWallet: true, selected: this.props.wallet === 99})} onClick={this.onSetWalletClick(99)}>99</button>
            <button className={cx({ adultWallet: true, selected: this.props.wallet === 200})} onClick={this.onSetWalletClick(200)}>200</button>
            <button className={cx({ giantsWallet: true, selected: this.props.wallet === 500})} onClick={this.onSetWalletClick(500)}>500</button>
          </div>
          <div className={styles.acquired}>
            <div className={styles.amount}>
              Amount in wallet: <span>{this.props.acquired}</span>
            </div>
            <div className={styles.clear} onClick={this.onAcquireClick()}>
            </div>
            <div className={styles.controls}>
              <button onClick={this.onAcquireClick(200)} className={styles.gold}>+200</button>
              <button onClick={this.onAcquireClick(50)} className={styles.purple}>+50</button>
              <button onClick={this.onAcquireClick(20)} className={styles.red}>+20</button>
              <button onClick={this.onAcquireClick(5)} className={styles.blue}>+5</button>
            </div>
          </div>
          <div className={styles.spent}>
            <div className={styles.amount}>
              Amount spent: <span>{this.props.spent}</span>/1200
            </div>
            <div className={styles.clear} onClick={this.onSpendClick()}>
            </div>
            <div className={styles.controls}>
              <button disabled={this.props.acquired < 100} onClick={this.onSpendClick(100)}>+100</button>
              <button disabled={this.props.acquired < 50} onClick={this.onSpendClick(50)}>+50</button>
              <button disabled={this.props.acquired < 10} onClick={this.onSpendClick(10)}>+10</button>
              <button disabled={this.props.acquired < 5} onClick={this.onSpendClick(5)}>+5</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    if (state.has(props.twitch)) {
      return {
        acquired: state.get(props.twitch).acquired,
        spent: state.get(props.twitch).spent,
        wallet: state.get(props.twitch).wallet,
      };
    }
    return {
      acquired: 0,
      spent: 0,
      wallet: 99,
    };
  },
  {
    acquireRupees,
    spendRupees,
    setWallet,
  },
)(RupeeGoal);
