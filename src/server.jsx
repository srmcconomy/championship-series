import express from 'express';
import path from 'path';
import config from '../config';
import passport from 'passport';
import http from 'http';
import { Strategy } from 'passport-twitch';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import socketMiddleware from './util/serverSocketMiddleware';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({ secret:'verysecretetc1234' }));
app.use(passport.initialize());
app.use(passport.session());

const store = createStore(reducers, applyMiddleware(socketMiddleware(io)));

passport.use(new Strategy(
  {
    clientID: 'rpj60fikezo717h9d7lka7zq7r1w97',
    clientSecret: 'j4jbu16f73hkksncxfspvzx6q770dz',
    callbackURL: process.env.NODE_ENV === 'production' ?
      'http://challenge-series.prettybigjoe.me/auth/twitch/callback' :
      'http://localhost:3000/auth/twitch/callback',
    scope: 'user_read',
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});



app.get('/auth/twitch', passport.authenticate('twitch'));
app.get('/auth/twitch/callback',
passport.authenticate('twitch', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  },
);

const sourcePath = process.env.NODE_ENV === 'production' ?
  '/dist' :
  'http://localhost:9000/assets';

app.get('/login', (req, res) => {
  res.send(
`<html>
  <head>
    <link href="${sourcePath}/login.css" rel="stylesheet">
  </head>
  <body>
    <div id="react-root"></div>
    <script src="${sourcePath}/login.js"></script>
  </body>
</html>`
  );
});

app.get('/leaderboard', (req, res) => {
  res.send(
`<html>
  <head>
    <link href="${sourcePath}/leaderboard.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
  </head>
  <body>
    <div id="react-root"></div>
    <script>window.INITIAL_STATE=${JSON.stringify(store.getState().toJS())};window.USER='${req.user.username}'</script>
    <script src="http://localhost:9000${sourcePath}/leaderboard.js"></script>
  </body>
</html>`
  );
});

app.use((req, res) => {
  if (!req.user) res.redirect('/login');
  res.send(
`<html>
  <head>
    <link href="${sourcePath}/app.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
  </head>
  <body>
    <div id="react-root"></div>
    <script>window.INITIAL_STATE=${JSON.stringify(store.getState().toJS())};window.USER='${req.user.username}'</script>
    <script src="${sourcePath}/app.js"></script>
  </body>
</html>`
  );
});

server.listen(process.env.PORT || config.port);
