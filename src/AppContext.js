import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AppContext = createContext({});
const { Provider, Consumer } = AppContext;
export const AppConsumer = Consumer;

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ fetching: true });
  const [userToken, setUserToken] = useState(null);
  const [appToken, setAppToken] = useState(null);

  useEffect(() => {
    async function fetchAppData() {
      let currentAppToken = sessionStorage.getItem('appToken');
      if (!currentAppToken) {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tokens/app`);
        currentAppToken = data.access_token;
        sessionStorage.setItem('appToken', currentAppToken);
      }
      setAppToken(currentAppToken);

      let userData = {};
      const currentUserToken = sessionStorage.getItem('userToken');
      if (currentUserToken) {
        const currentUser = sessionStorage.getItem('user');

        // TODO: handle error if currentUser is not a valid json
        userData = JSON.parse(currentUser);
        setUserToken(currentUserToken);
      }

      setUser({
        fetching: false,
        ...userData,
      });
    }

    fetchAppData();
  }, []);

  const logout = () => {
    sessionStorage.clear();
    setUser({ fetching: false });
    setUserToken(null);
    setAppToken(null);
  };

  const providerValue = {
    user,
    setUser,
    logout,
    userToken,
    setUserToken,
    appToken,
    setAppToken,
  };

  return <Provider value={providerValue}>{children}</Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default { AppContext, AppProvider, AppConsumer };
