import { Request, Response } from 'express';
const userService = require('./user.service');

async function getUser(req: Request, res: Response) {
  try {
    const user = await userService.getById(req.params.id);
    res.send(user);
  } catch (err) {
    console.error('Failed to get user', err);
    res.status(500).send({ err: 'Failed to get user' });
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const filterBy = {
      name: req.query?.name || '',
    };
    const users = await userService.query(filterBy);
    res.send(users);
  } catch (err) {
    console.error('Failed to get users', err);
    res.status(500).send({ err: 'Failed to get users' });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const user = req.body;
    const savedUser = await userService.update(user);
    res.send(savedUser);
  } catch (err) {
    console.error('Failed to update user', err);
    res.status(500).send({ err: 'Failed to update user' });
  }
}

module.exports = {
  getUser,
  getUsers,
  updateUser,
};

export {};
