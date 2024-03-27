const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const volleyball = require('volleyball');

const usersRouter = require('./users');
const shoesRouter = require('./shoes');
const cartRouter = require('./cart');
const ordersRouter = require('./orders');

apiRouter.use(volleyball);

apiRouter.use(async (req, res, next) => {
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith('Bearer')) { 
    const token = auth.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded token:', decodedToken)
      
      req.user = decodedToken; 
      console.log('req.user:', req.user); 
      
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

apiRouter.use('/users', usersRouter);
apiRouter.use('/shoes', shoesRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/orders', ordersRouter);

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = apiRouter;
