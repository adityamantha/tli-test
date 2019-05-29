'use strict';

const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const path = require('path');
const router = express();

const { applyMiddleware } = require('./utils');
const middleWare = require('./middleware');
const errorHandlers = require('./middleware/errorHandlers');

const { router: userRoutes } = require('./routes/users/userRoutes');

const { PORT, URL } = require('./utils/constants');

applyMiddleware(middleWare, router);

router.use('/api/users', userRoutes);

applyMiddleware(errorHandlers, router);


// // 1. Change route handler to return static folder
// const publicFolder = path.resolve(__dirname, '..', 'build');
// router.use('/', express.static(publicFolder));

// // 2. Add route handler to catch all requests

// router.get('*', (req, res, next) => {
//   const indexFile = path.resolve(publicFolder, 'index.html');
//   res.sendFile(indexFile);
// });
const server = http.createServer(router);

mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(async () => {
    console.log(`Connected to database at: ${URL}`);
    try {
      await require('./utils/seed').truncate();
      await require('./utils/seed').seed();

      server.listen(PORT, () => {
        console.log(`Server is running on PORT:${PORT}`);
        if (process.send) {
          // NOTE: process is being run by pm2
          process.send('ready');
        }
      });
    } catch (e) {
      console.error(`Error starting server: ${e}`);
      throw e;
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });