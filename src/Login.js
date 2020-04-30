import React, { useContext, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { AppContext } from './AppContext';

const Login = () => {
  const { appToken, user, setUser, setUserToken } = useContext(AppContext);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const [loginState, setLoginState] = useState({
    isSubmitting: false,
    errorMessage: null,
  });
  const history = useHistory();

  useEffect(() => {
    if (user.id) history.push('/');
  }, [user, history]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setLoginState({
      ...loginState,
      isSubmitting: true,
      errorMessage: null,
    });

    axios
      .get(`${process.env.REACT_APP_API_URL}/tokens/user`, {
        params: {
          userName: usernameInput.current.value,
          password: passwordInput.current.value,
        },
        headers: {
          Authorization: appToken,
        },
      })
      .then(({ data }) => {
        const userToken = data.access_token;
        sessionStorage.setItem('userToken', userToken);
        setUserToken(userToken);
        return axios.get(`${process.env.REACT_APP_API_URL}/myAccount`, {
          headers: {
            Authorization: userToken,
          },
        });
      })
      .then(({ data }) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      })
      .catch(({ response }) => {
        const errorMessage = response.data ? response.data.message : response.statusText;
        setLoginState({
          ...loginState,
          isSubmitting: false,
          errorMessage,
        });
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded mx-5 p-5 w-full md:w-1/2 lg:w-1/2 xl:w-1/3"
        onSubmit={handleFormSubmit}
      >
        <div className="text-2xl mb-4 text-center text-gray-700">
          <i className="fas fa-map-marked-alt" />
          &nbsp;PedidosMap
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Usuario
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Usuario"
              required
              ref={usernameInput}
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="********"
              required
              ref={passwordInput}
            />
          </label>
          {loginState.errorMessage && (
            <p className="text-red-500 text-xs italic">{loginState.errorMessage}</p>
          )}
        </div>
        <div className="">
          <button
            disabled={loginState.isSubmitting}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 w-full"
            type="submit"
          >
            {loginState.isSubmitting ? 'Enviando...' : 'Ingresar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
