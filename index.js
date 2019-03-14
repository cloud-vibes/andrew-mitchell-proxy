require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();
const port = 80;

// app.use(morgan('dev'));

const targets = {
  'music-player': 'example.com/hello',
  comments: 'example.com',
  description: 'example.com',
  sidebar: 'http://localhost:8081',
};

app.use('/api/music-player/*', proxy({ target: targets['music-player'], changeOrigin: true }));
app.use('/api/comments/*', proxy({ target: targets.comments, changeOrigin: true }));
app.use('/api/description/*', proxy({ target: targets.description, changeOrigin: true }));
app.use('/api/sidebar/*', proxy({ target: targets.sidebar, changeOrigin: true }));
app.use('/graphql', proxy({ target: targets.sidebar, changeOrigin: true }));


app.use('/scripts', express.static(path.resolve(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/song/:songId', express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
