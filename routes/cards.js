const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(path.resolve(__dirname, '..'), 'data', 'cards.json');

cardsRouter.get('/cards', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'файл не найден' });
      return;
    }
    const cards = JSON.parse(data);
    res.send(cards);
  });
});

module.exports = cardsRouter;
