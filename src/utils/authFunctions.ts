import api from './api';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

function logIn(password: string, name: string, setLoggedIn: Dispatch<SetStateAction<boolean>>) {
  api
    .login(password, name)
    .then((userObject) => {
      setLoggedIn(true);
      navigate('/');
    })
    .catch((err) => console.log(err.message));
}

function logout(setLoggedIn: Dispatch<SetStateAction<boolean>>) {
  api
    .logout()
    .then((res) => {
      setLoggedIn(false);
    })
    .catch((err) => console.log(err.message));
}
