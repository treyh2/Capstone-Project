// src/server/api/index.js
const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const volleyball = require('volleyball');
apiRouter.use(volleyball);

// Authentication middleware
apiRouter.use(async (req, res, next) => {
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith('Bearer')) {
    const token = auth.substring(7); // Remove 'Bearer ' prefix
    try {
      const decoded = jwt.verify(token, 'your_secret_key_here'); // Verify the token
      req.user = decoded; // Set req.user with decoded token data
      next(); // Move to the next middleware
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});

// Import routes for users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const shoeRouter = require('./shoes');
apiRouter.use('/shoes', shoeRouter)

// Error handling middleware
apiRouter.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = apiRouter;
