import { Modal } from './shared/Modal';
import { ReactComponent as GalleryIcon } from '../assets/svg/gallery.svg';
import { ReactComponent as LocationIcon } from '../assets/svg/location.svg';
import { ReactComponent as SmileyIcon } from '../assets/svg/smiley-gray.svg';
import { useRef, useState } from 'react';
import { cloudinaryService } from '../services/cloudinary.service';
import { Avatar } from './shared/Avatar';
import { useSelector } from 'react-redux';

// pages: { 1: 'Upload file', 2: 'Crop', 3: 'Edit', 4: 'Create Post' };

export function CreatePost({ onClose, onUploadPost }) {
  // const [url, setUrl] = useState('');
  const [url, setUrl] = useState(
    'http://res.cloudinary.com/avivyaari/image/upload/v1637227201/s7j3rhwc2mntshfoagux.jpg'
  ); // for dev
  // const [page, setPage] = useState(1);
  const [page, setPage] = useState(2); // for dev

  const handleUploadImage = async ev => {
    const url = await cloudinaryService.uploadFile(ev);
    setUrl(url);
    setPage(2);
  };

  const handleBack = () => {
    setPage(page => page - 1);
  };

  switch (page) {
    case 1:
      return <UploadFile onClose={onClose} onUploadImage={handleUploadImage}  />;
    case 2:
      return <EditImage onClose={onClose} url={url} onNext={() => setPage(page => page + 1)} onBack={handleBack} />;
    case 3:
      return <UploadPost onClose={onClose} url={url} onUploadPost={onUploadPost} onBack={handleBack} />;
    default:
      return <UploadFile onClose={onClose} onUploadImage={handleUploadImage} />;
  }
}

function UploadFile({ onUploadImage, onClose }) {
  const inputRef = useRef();
  return (
    <Modal title="Create new post" onClose={onClose}>
      <div className="grow upload-file">
        <GalleryIcon />
        <h2>Drag photos and videos here</h2>
        <button className="btn-primary" onClick={() => inputRef.current.click()}>
          Select from computer
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/gif, image/jpeg"
          name="img"
          style={{ visibility: 'hidden' }}
          onChange={onUploadImage}
        />
      </div>
    </Modal>
  );
}

function EditImage({ url, onClose, onNext, onBack }) {
  return (
    <Modal title="Edit" onClose={onClose} onNext={onNext} onBack={onBack}>
      <div className="grow edit-image flex">
        <div>
          <img src={url} alt="Uploaded file" />
        </div>
        <section className="panel">Edit panel</section>
      </div>
    </Modal>
  );
}

function UploadPost({ url, onClose, onUploadPost, onBack }) {
  const [text, setText] = useState('');
  const user = useSelector(state => state.userModule.user);

  return (
    <Modal
      title="Create new post"
      onClose={onClose}
      nextText="Share"
      onNext={() => onUploadPost(url, text)}
      onBack={onBack}>
      <div className="grow upload-post flex">
        <div>
          <img src={url} alt="Uploaded file" />
        </div>
        <section className="panel panel-layout">
          <div className="user flex align-center">
            <Avatar width={28} height={28} src={user.imgUrl} alt={user.username} />
            <span className="bold">{user.username}</span>
          </div>
          <textarea
            className="full-width"
            value={text}
            onChange={ev => setText(ev.target.value)}
            name="text"
            cols="30"
            rows="10"
            placeholder="Write a caption..."
            style={{ resize: 'none' }}
          />
          <div className="flex space-between align-center">
            <SmileyIcon />
            <span className="letter-count">{text.length}/2,200</span>
          </div>
          <div className="options full">
            <div className="flex align-center">
              <input className="grow" type="text" placeholder="Add location" />
              <LocationIcon />
            </div>
            <div>Accessibility</div>
            <div>Advanced settings</div>
          </div>
        </section>
      </div>
    </Modal>
  );
}
