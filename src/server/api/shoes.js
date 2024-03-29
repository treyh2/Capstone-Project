const express = require('express');
const shoeRouter = express.Router();
const { getAllShoes, getShoeByName, createShoe, getShoeById } = require('../db/shoes');

shoeRouter.get('/', async (req, res, next) => {
  try {
    const shoes = await getAllShoes();
    res.send(shoes);
  } catch (err) {
    next(err);
  }
});

shoeRouter.post('/', async (req, res) => {
  const shoe = await createShoe(req.body)
  res.send(shoe);
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
  } catch (err) {
    next(err);
  }  
});  

shoeRouter.get('/id/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const shoe = await getShoeById(id);
    if (!shoe) {
      res.status(404).send('No shoe found.');
    } else {
      res.send(shoe);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = shoeRouter;

