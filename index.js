require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');

const { targets, port } = require('./config');

const app = express();

// app.use(morgan('dev'));

app.use('/api/music-player/*', proxy({ target: targets.musicplayer, changeOrigin: true }));
app.use('/api/comments/*', proxy({ target: targets.comments, changeOrigin: true }));
app.use('/api/description/*', proxy({ target: targets.description, changeOrigin: true }));
app.use('/api/sidebar/*', proxy({ target: targets.sidebar, changeOrigin: true }));
app.use('/graphql', proxy({ target: targets.sidebar, changeOrigin: true }));


app.use('/scripts', express.static(path.resolve(__dirname, 'node_modules')));
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/song/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('*', (req, res) => {
  res.redirect(301, '/song/1');
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
