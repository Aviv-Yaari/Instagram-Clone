import PhoneImg from '../../assets/img/landing-page/phone.png';

export function HeroImage() {
  return (
    <div className="hero-image">
      <img className="hero-img" alt="phone" src={PhoneImg} />
      <div className="screenshot"></div>
    </div>
  );
}
