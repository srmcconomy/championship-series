import React, { Component } from 'react';

import styles from './login.scss';

export default class Login extends Component {
  render() {
    return (
      <a className={styles['login-button']} href='/auth/twitch'>Login with Twitch</a>
    )
  }
}
