import routes from './routes';
import { Switch, Route } from 'react-router-dom';
import './assets/styles/main.scss';
import { useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/actions/user.actions';

export function App() {
  const user = useSelector(state => state.userModule.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login('avivyar1', '1234'));
  }, [dispatch]); // for dev

  const handleLogin = async (username, password) => {
    try {
      dispatch(login(username, password));
    } catch (err) {
      console.error('failed to login', err);
    }
  };

  if (!user) return <LandingPage onLogin={handleLogin} />;
  return (
    <main className="app main-layout">
      <Switch>
        {routes.map(route => (
          <Route key={route.path} exact component={route.component} path={route.path} />
        ))}
      </Switch>
    </main>
  );
}
