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
import reducers from './reducers/chestGoal';
import socketMiddleware from './util/serverSocketMiddleware';
import socketio from 'socket.io';
import 'source-map-support/register'

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({ secret:'verysecretetc1234' }));
app.use(passport.initialize());
app.use(passport.session());

function isAdmin(user) {
  return ['prettybigjoe', 'tdavpat', 'whatthehellshappened', 'senn__'].includes(user.username);
}

const playersOnStream = [];

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
    res.redirect('/chest-goal');
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
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
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
    <script>window.INITIAL_STATE=${JSON.stringify(store.getState().toJS())};</script>
    <script src="${sourcePath}/leaderboard.js"></script>
  </body>
</html>`
  );
});

app.get('/admin', (req, res) => {
  if (!isAdmin(req.user)) res.send('404');
  res.send(
`<html>
  <head>
    <link href="${sourcePath}/admin.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
  </head>
  <body>
    <div id="react-root"></div>
    <script>window.INITIAL_STATE=${JSON.stringify(store.getState().toJS())};</script>
    <script src="${sourcePath}/admin.js"></script>
  </body>
</html>`
  );
});

app.post('/stream', (req, res) => {
  try {
    console.log('post stream');
    console.log(req.body);
    playersOnStream.length = 0;
    playersOnStream.push(...req.body.map(player => player.toLowerCase()));
    console.log(store.getState().toJS());
    res.send(JSON.stringify(store.getState().filter((value, key) => playersOnStream.includes(key.toLowerCase())).toJS()))
  } catch (err) {
    console.log(err);
    res.send();
  }
});

app.get('/chest-goal', (req, res) => {
  if (!req.user) res.redirect('/login');
  let username = req.user.username;
  if (isAdmin(req.user) && req.query.player) {
    username = req.query.player;
  }
  console.log(store.getState())
  res.send(
`<html>
  <head>
    <link href="${sourcePath}/chestGoal.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
  </head>
  <body>
    <div id="react-root"></div>
    <script>window.INITIAL_STATE=${JSON.stringify(store.getState().toJS())};window.USER='${username}'</script>
    <script src="${sourcePath}/chestGoal.js"></script>
  </body>
</html>`
  );
});

// app.get('/rupee-goal', (req, res) => {
//   if (!req.user) res.redirect('/login');
//   res.send(
// `<html>
//   <head>
//     <link href="${sourcePath}/rupeeGoal.css" rel="stylesheet">
//     <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
//   </head>
//   <body>
//     <div id="react-root"></div>
//     <script>window.INITIAL_STATE=${JSON.stringify(store.getState().toJS())};window.USER='${req.user.username}'</script>
//     <script src="${sourcePath}/rupeeGoal.js"></script>
//   </body>
// </html>`
//   );
// });

app.use((req, res) => {
  if (!req.user) res.redirect('/login');
  res.send('404');
//   res.send(
// `<html>
//   <head>
//     <link href="${sourcePath}/app.css" rel="stylesheet">
//     <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
//   </head>
//   <body>
//     <div id="react-root"></div>
//     <script>window.INITIAL_STATE=${JSON.stringify(store.getState().toJS())};window.USER='${req.user.username}'</script>
//     <script src="${sourcePath}/app.js"></script>
//   </body>
// </html>`
//   );
});

server.listen(process.env.PORT || config.port);
