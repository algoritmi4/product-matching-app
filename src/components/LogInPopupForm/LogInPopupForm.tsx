import './LogInPopupForm.css';
import { useForm, FieldValues } from 'react-hook-form';
import {
  EMAIL_REGEXP,
  PASSWORD_HINT,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE,
  PASSWORD_REGEXP,
  PASSWORD_VALIDATION_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE,
  WRONG_EMAIL_MESSAGE
} from '../../utils/constants';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { MarkingContext } from '../../contexts/MarkingContext';

export function LogInPopupForm({
  setLoggedIn,
  setUser
}: {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<string>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' });

  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();

  const { loggedIn, user } = useContext(MarkingContext);

  function logIn(password: string, email: string, setLoggedIn: Dispatch<SetStateAction<boolean>>) {
    api
      .login(password, email)
      .then((email) => {
        setLoggedIn(true);
        setUser(email);
        navigate('/');
      })
      .catch((err) => {
        setErrorText('Ошибка авторизации');
        console.log(err);
      });
  }

  const onSubmit = (data: FieldValues) => {
    logIn(data.password, data.email, setLoggedIn);
  };

  const handleLogoutBtnClick = () => {
    api
      .logout()
      .then(() => {
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelBtnClick = () => {
    navigate('/');
  };

  const handleRegistrBtn = () => {
    navigate('/register');
  };

  return (
    <div className="login-popup__background">
      <div className="login-popup">
        {!loggedIn ? (
          <form onSubmit={handleSubmit(onSubmit)} className="login-popup__form">
            <p className="login-popup__field-text">Email</p>
            <input
              type="text"
              {...register('email', {
                required: REQUIRED_ERROR_MESSAGE,
                pattern: {
                  value: EMAIL_REGEXP,
                  message: WRONG_EMAIL_MESSAGE
                }
              })}
              className="login-popup__field"
              placeholder="Email"
            />
            {errors?.email && (
              <div className="login-popup__field-error">{errors.email.message?.toString()}</div>
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
            <div className="login-popup__btn-container">
              <div
                className={`login-popup__submit-btn-background ${
                  !isValid ? 'login-popup__submit-btn_diabled' : ''
                } `}>
                <button disabled={!isValid} className={`login-popup__submit-btn common-button`}>
                  Вход
                </button>
              </div>
              <div className={`login-popup__submit-btn-background`}>
                <button
                  type="button"
                  className={`login-popup__submit-btn common-button`}
                  onClick={handleRegistrBtn}>
                  Регистрация
                </button>
              </div>
            </div>
            <p className="login-popup__error-text">{errorText}</p>
          </form>
        ) : (
          <>
            <div>{`Текущий пользователь: ${user}`}</div>
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
