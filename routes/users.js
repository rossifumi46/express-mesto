const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(path.resolve(__dirname, '..'), 'data', 'users.json');

usersRouter.get('/users', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
  });
});

usersRouter.get('/users/:_id', (req, res) => {
  const { _id } = req.params;

  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const users = JSON.parse(data);
    const user = users.find((x) => x._id === _id);
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res.send(user);
  });
});

module.exports = usersRouter;
