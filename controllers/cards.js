const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find()
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.errors) {
        const errors = [];
        if (err.errors.name) errors.push(err.errors.name.message);
        if (err.errors.link) errors.push(err.errors.link.message);
        res.status(400).send({ message: errors });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => res.status(404).send({ message: 'Карточка не найдена' }))
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};
