/** required libraries */
const express = require('express');

const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, './.env') });

const libs = {
    cors: (require('cors'))(),
    morgan: (require('morgan'))(process.env.MORGAN_LEVEL),
    helmet: (require('helmet'))()
};

/** require winston-cloudwatch logger */
const logger = require('./util/logger');

/** init app */
const app = express();

/** configure app */
for (let prop in libs) {
    app.use(libs[prop]);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** require routers */
fs.readdirSync(path.join(__dirname, './routes')).forEach(route => {
    app.use(`/${route.replace('.js', '')}`, require(`./routes/${route}`));
});

module.exports = app;