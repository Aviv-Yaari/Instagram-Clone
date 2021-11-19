import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';

export function Modal({ title, children, onClose, onBack, onNext, nextText }) {
  return (
    <div className="modal">
      <div className="overlay" onClick={onClose}>
        <CloseIcon style={{ position: 'absolute', top: 0, right: 0 }} onClick={onClose} />
        <section className="content flex column" onClick={ev => ev.stopPropagation()}>
          <header className="flex align-center">
            {onBack && (
              <button className="btn-link" onClick={onBack}>
                Back
              </button>
            )}
            <div className="grow text-center">{title}</div>
            {onNext && (
              <button className="btn-link" onClick={onNext}>
                {nextText || 'Next'}
              </button>
            )}
          </header>
          {children}
        </section>
      </div>
    </div>
  );
}
