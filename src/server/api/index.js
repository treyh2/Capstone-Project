const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const volleyball = require('volleyball');

// Importing routers
const usersRouter = require('./users');
const shoesRouter = require('./shoes');

apiRouter.use(volleyball);

apiRouter.use(async (req, res, next) => {
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith('Bearer')) { // Corrected token type check
    // Extracting token from Authorization header
    const token = auth.split(' ')[1]; // Extract token after 'Bearer'

    try {
      // Verifying the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace 'YOUR_SECRET_KEY' with your actual secret key
      console.log('decoded token:', decodedToken)
      // Assuming token payload contains user id
      const userId = decodedToken.id;

      // Set req.user with user id
      req.user = userId;
      
      next();
    } catch (error) {
      console.error('JWT VERIFICATION ERROR', error)
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});

// Mounting routers
apiRouter.use('/users', usersRouter);
apiRouter.use('/shoes', shoesRouter);

// Error handling middleware
apiRouter.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = apiRouter;
