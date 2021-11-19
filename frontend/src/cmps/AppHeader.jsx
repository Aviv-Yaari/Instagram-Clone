import LogoImg from '../assets/img/logo-small.png';
import { ReactComponent as HomeIcon } from '../assets/svg/home.svg';
import { ReactComponent as MessengerIcon } from '../assets/svg/messenger.svg';
import { ReactComponent as NewPostIcon } from '../assets/svg/new-post.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/explore.svg';
import { ReactComponent as ActivityFeedIcon } from '../assets/svg/activity-feed.svg';

export function AppHeader({ onNewPost }) {
  return (
    <header className="app-header full main-layout full-width">
      <div className="flex align-center">
        <img className="img-logo" src={LogoImg} alt="instagram clone" />
        <input className="search" type="text" placeholder="Search" />
        <div className="icons flex">
          <HomeIcon />
          <MessengerIcon />
          <NewPostIcon onClick={onNewPost} />
          <ExploreIcon />
          <ActivityFeedIcon />
        </div>
      </div>
    </header>
  );
}
