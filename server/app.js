const express = require('express');
const path = require('path');

const app = express();

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use('/api', require('./router/api'));

app.use((err, req, res, next) => {
	res.status(500).send(err);
});

module.exports = app;
