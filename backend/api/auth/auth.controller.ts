import { User } from '../../api/user/user.service';
import { Request, Response } from 'express';

const authService = require('./auth.service');

async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const user: User = await authService.login(username, password);
    req.session.userId = <string>user._id;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(403).send({ err: 'Failed to Login: ' + err });
  }
}

async function signup(req: Request, res: Response) {
  try {
    const { username, password, imgUrl } = req.body;
    const user: User = await authService.signup(username, password, imgUrl);
    // if (!user) res.status(500).send({ err: 'Username already exists' });
    req.session.userId = <string>user._id;
    res.json(user);
  } catch (err) {
    res.status(500).send({ err: 'Failed to signup: ' + err });
  }
}

async function logout(req: Request, res: Response) {
  try {
    req.session.userId = '';
    res.send({ msg: 'Logged out successfully' });
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' });
  }
}

module.exports = {
  login,
  signup,
  logout,
};
