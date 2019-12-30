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
import modeLog from '../../store/actions/modeLog';
import useFetch from '../actions/fetch.hook';

const Registration = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [checkPass, setCheckPass] = useState('');
  const {
    fetching,
    error,
    isLoading,
    clearErr,
  } = useFetch();
  const dispatch = useDispatch();

  const handleRegOnSubmit = async (e) => {
    e.preventDefault();
    if (password === checkPass) {
      const user = {
        name,
        mail,
        phone,
        password,
      };
      try {
        const data = await fetching(
          '/reg/users/registration',
          'POST',
          {
            'Content-Type': 'application/json',
          },
          JSON.stringify(user),
        );
        dispatch(modeLog());
      } catch (err) {
        //console.log(JSON.parse(err));
        console.error(err);
      }
    } else {
      setMessage('Пароль не соответствует');
      setCheckPass('');
    }
  };

  const checkPassHandler = (e) => {
    setCheckPass(e.target.value);
    if (message) {
      setMessage(null);
    }
  };

  return (
    <>
      <FormTitle>
        Зарегистрировать аккаунт на сайте:
      </FormTitle>
      {(error && !error.startsWith('{')) && <FormTitle style={{ color: 'red' }}>{error}</FormTitle>}
      <Form onSubmit={handleRegOnSubmit} onChange={() => clearErr()}>
        <Div>
          <Label>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Имя"
              required
            />
          </Label>
        </Div>
        <Div>
          <Label>
            <Input
              type="text"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              required
              placeholder="Электронная почта"
            />
            {(error && error.startsWith('{') && JSON.parse(error).mail) && JSON.parse(error).mail}
          </Label>
        </Div>
        <Div>
          <Label>
            <Input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              placeholder="Телефон"
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
            {(error && error.startsWith('{') && JSON.parse(error).password) && JSON.parse(error).password}
          </Label>
        </Div>
        <Div>
          <Label>
            <Input
              type="password"
              onChange={checkPassHandler}
              value={checkPass}
              required
              placeholder="Подтверждение пароля"
            />
            {message}
          </Label>
        </Div>
        <FormBtn type="submit" disabled={isLoading}>
          Зарегистрироваться
        </FormBtn>
      </Form>
    </>
  );
};

export default Registration;
