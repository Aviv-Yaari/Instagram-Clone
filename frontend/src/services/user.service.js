import { httpService } from './http.service';
export const userService = {
  login,
  logout,
  signup,
  load,
};

async function login(username, password) {
  try {
    const user = await httpService.post('auth/login', { username, password });
    if (user) return _saveLocalUser(user);
  } catch (err) {
    console.error(err);
  }
}

async function signup(username, password, img) {
  const user = await httpService.post('auth/signup', { username, password, img });
  return _saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem('user');
  return await httpService.post('auth/logout');
}

function load() {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function _saveLocalUser(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
  return user;
}
