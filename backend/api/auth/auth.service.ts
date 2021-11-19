const bcrypt = require('bcrypt');
const userService = require('../user/user.service');

async function login(username: string, password: string) {
  const user = await userService.getByUsername(username);
  if (!user) throw 'Invalid username or password';
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw 'Invalid username or password';
  delete user.password;
  user._id = user._id.toString();
  return user;
}

async function signup(username: string, password: string, imgUrl: string) {
  const saltRounds = 10;
  if (!username || !password) return Promise.reject('username and password are required!');
  const existingUser = await userService.getByUsername(username);
  if (existingUser) throw 'Username already exists';
  else {
    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({ username, password: hash, imgUrl });
  }
}

module.exports = {
  signup,
  login,
};
