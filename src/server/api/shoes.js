// src/server/api/shoes.js
const express = require('express');
const shoeRouter = express.Router();
const { getAllShoes, getShoeByName } = require('../db/shoes');

// /api/shoes routes
shoeRouter.get('/', async (req, res, next) => {
  try {
    const shoes = await getAllShoes();
    res.send(shoes);
  } catch (error) {
    next(error);
  }
});

shoeRouter.get('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const shoe = await getShoeByName(name);
    if (!shoe) {
      res.status(404).send('No shoe found.');
    } else {
      res.send(shoe);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = shoeRouter;
