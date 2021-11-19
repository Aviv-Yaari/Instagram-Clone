import { HeroImage } from '../cmps/landing-page/HeroImage';
import { LoginForm } from '../cmps/landing-page/LoginForm';
import AppStoreImg from '../assets/img/landing-page/app-store.png';
import GooglePlayImg from '../assets/img/landing-page/google-play.png';

export function LandingPage({ onLogin }) {
  return (
    <main className="landing-page flex align-center justify-center">
      <section className="content flex align-center justify-center">
        <HeroImage />
        <div className="flex column align-center">
          <LoginForm onLogin={onLogin} />
          <p className="get-the-app">Get the app.</p>
          <div className="stores">
            <img src={AppStoreImg} alt="Download on the app store" />
            <img src={GooglePlayImg} alt="Get it on google play" />
          </div>
        </div>
      </section>
    </main>
  );
}
