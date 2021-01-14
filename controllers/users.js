const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => res.status(404).send({ message: 'Пользователь не найден' }))
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.errors) {
        const errors = [];
        if (err.errors.name) errors.push(err.errors.name.message);
        if (err.errors.about) errors.push(err.errors.about.message);
        if (err.errors.avatar) errors.push(err.errors.avatar.message);
        res.status(400).send({ message: errors });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.errors) {
        const errors = [];
        if (err.errors.name) errors.push(err.errors.name.message);
        if (err.errors.about) errors.push(err.errors.about.message);
        res.status(400).send({ message: errors });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.errors.avatar) {
        res.status(400).send({ message: err.errors.avatar.message });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};
