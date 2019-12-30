import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Div,
  Label,
  Input,
  FormTitle,
  FormBtn,
} from './styles/styles';
import logIn from '../../store/actions/logIn';
import togglePopUp from '../../store/actions/togglePopUp';
import toLocalStorage from '../../store/actions/toLocalStorage';
import useFetch from '../actions/fetch.hook';

const LogIn = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const {
    fetching,
    isLoading,
    error,
    clearErr,
  } = useFetch();
  const dispatch = useDispatch();

  const handleLogInOnSubm = async (e) => {
    e.preventDefault();
    if (mail && password) {
      const userData = {
        mail,
        password,
      };
      try {
        const data = await fetching(
          '/auth/login',
          'POST',
          {
            'Content-Type': 'application/json; charset=utf-8',
          },
          JSON.stringify(userData),
        );
        // set Token and userName into local storage
        dispatch(logIn(data.name, data.id));
        dispatch(toLocalStorage(data.token, data.refreshToken));
        // if result ok hide Pop-Up window with REG- LOG mode
        dispatch(togglePopUp());
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };
  const clearErrMessHandler = () => {
    if (error) {
      clearErr();
    }
  };

  return (
    <>
      <FormTitle>
        Войти
      </FormTitle>
      {error && <FormTitle>{error}</FormTitle>}
      <Form onSubmit={handleLogInOnSubm} onChange={clearErrMessHandler}>
        <Div>
          <Label>
            <Input
              type="text"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              required
              placeholder="Электронная почта"
            />
          </Label>
        </Div>
        <Div>
          <Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              placeholder="Пароль"
            />
          </Label>
        </Div>
        <FormBtn type="submit" disabled={isLoading}>
          Войти
        </FormBtn>
      </Form>
    </>
  );
};

export default LogIn;
