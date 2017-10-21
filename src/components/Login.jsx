import React, { Component } from 'react';

import styles from './login.scss';

export default class Login extends Component {
  render() {
    return (
      <div className={styles.login}>
        <div className={styles.title}>
          <div className={styles.sub}>
            ocarina of time
          </div>
          <div className={styles.main}>
            Championship Series
          </div>
        </div>
        <div className={styles.desc}>
          Season 2<br/>Race 7
        </div>
        <a className={styles['login-button']} href='/auth/twitch'>
          <span>Login with Twitch</span>
        </a>
      </div>
    )
  }
}
