import './ErrorMesssagePopup.css';
import { SetStateAction, Dispatch } from 'react';

export function ErrorMesssagePopup({
  requestError,
  setRequestError
}: {
  requestError: string;
  setRequestError: Dispatch<SetStateAction<string>>;
}) {
  const handleCloseBtnClick = () => {
    setRequestError('');
  };

  return (
    <div className={`error-popup ${requestError !== '' && 'error-popup_show'}`}>
      <p className="error-popup__message">{requestError}</p>
      <button className="error-popup__close-btn" onClick={handleCloseBtnClick}>
        ✖
      </button>
    </div>
  );
}
