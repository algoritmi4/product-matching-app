import './LogInPopupForm.css';
import { useForm, FieldValues } from 'react-hook-form';
import {
  NAME_MAX_LENGTH,
  NAME_MAX_LENGTH_ERROR_MESSAGE,
  NAME_MIN_LENGTH,
  NAME_MIN_LENGTH_ERROR_MESSAGE,
  NAME_REGEXP,
  NAME_VALIDATION_ERROR_MESSAGE,
  PASSWORD_HINT,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE,
  PASSWORD_REGEXP,
  PASSWORD_VALIDATION_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE
} from '../../utils/constants';
import { Dispatch, SetStateAction, useContext } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { MarkingContext } from '../../contexts/MarkingContext';

export function LogInPopupForm({
  setLoggedIn
}: {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' });

  const navigate = useNavigate();

  const { loggedIn } = useContext(MarkingContext);

  function logIn(password: string, name: string, setLoggedIn: Dispatch<SetStateAction<boolean>>) {
    api
      .login(password, name)
      .then(() => {
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => console.log(err.message));
  }

  function logout(setLoggedIn: Dispatch<SetStateAction<boolean>>) {
    api
      .logout()
      .then(() => {
        setLoggedIn(false);
      })
      .catch((err) => console.log(err.message));
  }

  const onSubmit = (data: FieldValues) => {
    logIn(data.password, data.name, setLoggedIn);
  };

  const handleLogoutBtnClick = () => {
    logout(setLoggedIn);
  };

  const handleCancelBtnClick = () => {
    navigate('/');
  };

  return (
    <div className="login-popup__background">
      <div className="login-popup">
        {!loggedIn ? (
          <form onSubmit={handleSubmit(onSubmit)} className="login-popup__form">
            <p className="login-popup__field-text">Имя пользователя</p>
            <input
              type="text"
              {...register('name', {
                required: REQUIRED_ERROR_MESSAGE,
                minLength: {
                  value: NAME_MIN_LENGTH,
                  message: NAME_MIN_LENGTH_ERROR_MESSAGE
                },
                maxLength: {
                  value: NAME_MAX_LENGTH,
                  message: NAME_MAX_LENGTH_ERROR_MESSAGE
                },
                pattern: {
                  value: NAME_REGEXP,
                  message: NAME_VALIDATION_ERROR_MESSAGE
                }
              })}
              className="login-popup__field"
              placeholder="Имя пользователя"
            />
            {errors?.name && (
              <div className="login-popup__field-error">{errors.name.message?.toString()}</div>
            )}

            <p className="login-popup__field-text">Пароль</p>
            <input
              type="password"
              {...register('password', {
                required: REQUIRED_ERROR_MESSAGE,
                minLength: {
                  value: PASSWORD_MIN_LENGTH,
                  message: PASSWORD_MIN_LENGTH_ERROR_MESSAGE
                },
                pattern: {
                  value: PASSWORD_REGEXP,
                  message: PASSWORD_VALIDATION_ERROR_MESSAGE
                }
              })}
              className="login-popup__field login-popup__field_password"
              placeholder="Пароль"
              title={PASSWORD_HINT}
            />
            {errors?.password && (
              <span className="login-popup__field-error">
                {errors.password.message?.toString()}
              </span>
            )}
            <div
              className={`login-popup__submit-btn-background ${
                !isValid ? 'login-popup__submit-btn_diabled' : ''
              } `}>
              <button disabled={!isValid} className={`login-popup__submit-btn common-button`}>
                Вход
              </button>
            </div>
          </form>
        ) : (
          <>
            <div>Выйти из программы?</div>
            <div className="login-popup__btn-container">
              <div className="login-popup__submit-btn-background">
                <button
                  className="login-popup__submit-btn common-button"
                  onClick={handleLogoutBtnClick}>
                  Выход
                </button>
              </div>
              <div className="login-popup__submit-btn-background">
                <button
                  className="login-popup__submit-btn common-button"
                  onClick={handleCancelBtnClick}>
                  Отмена
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
