// import path from 'path';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import config from './webpack.config';
// import Express from 'express';

const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const Express = require('express');

const app = new Express();
const port = 3000; 

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(port, error => {
	if(error) {
		console.error(error);
	} else {
		console.log(`Server is running on port ${port}`);
	}
});