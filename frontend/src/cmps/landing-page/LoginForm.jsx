import { Link } from 'react-router-dom';
import logoImg from '../../assets/img/logo.png';
import facebookImg from '../../assets/img/facebook-logo.png';
import { Container } from '../shared/Container';

export function LoginForm({ onLogin }) {
  const handleSubmit = ev => {
    ev.preventDefault();
    onLogin(ev.target.username.value, ev.target.password.value);
  };
  return (
    <section className="login-form full-width">
      <Container className="flex column align-center">
        <img className="img-logo" src={logoImg} alt="Instagram Clone" />
        <form className="flex column full-width" onSubmit={handleSubmit}>
          <input name="username" type="text" placeholder="Phone number, username, or email" />
          <input name="password" type="password" placeholder="Password" />
          <button className="btn-primary">Log In</button>
        </form>
        <div className="or flex full-width">
          <span></span>
          <span>Or</span>
          <span></span>
        </div>
        <button className="btn-facebook btn-link flex align-center">
          <img src={facebookImg} alt="Facebook" />
          <span>Log in with Facebook</span>
        </button>
        <Link to="/" className="forgot-password">
          Forgot password?
        </Link>
      </Container>
      <Container>
        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/" className="sign-up">
            Sign up
          </Link>
        </p>
      </Container>
    </section>
  );
}
