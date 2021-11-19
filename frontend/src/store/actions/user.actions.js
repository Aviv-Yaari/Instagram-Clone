import { userService } from '../../services/user.service.js';

export function login(username, password) {
  return async dispatch => {
    try {
      const user = await userService.login(username, password);
      dispatch({
        type: 'SET_USER',
        user,
      });
      return user;
    } catch (err) {
      console.log('Cannot login', err);
      throw err;
    }
  };
}

export function signup(username, password, img) {
  return async dispatch => {
    try {
      const user = await userService.signup(username, password, img);
      dispatch({
        type: 'SET_USER',
        user,
      });
      return user;
    } catch (err) {
      throw err;
    }
  };
}

export function logout() {
  return async dispatch => {
    try {
      await userService.logout();
      dispatch({
        type: 'SET_USER',
        user: null,
      });
    } catch (err) {
      console.log('Cannot logout', err);
    }
  };
}
