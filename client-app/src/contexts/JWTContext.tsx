import React, { createContext, useEffect, useReducer, useState } from 'react';
import { observer } from "mobx-react-lite";

// third-party
// import { Chance } from 'chance';
// import jwtDecode from 'jwt-decode';
// import * as JWT from 'jwt-decode';

// reducer - state management
// import { LOGIN, LOGOUT } from 'store/reducers/actions';
// import authReducer from 'store/reducers/auth';
import { useStore } from "stores/store";


// project import
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { KeyedObject } from 'types/root';
import { AuthProps, JWTContextType } from 'types/auth';
import agent from "api/agent";
import { promises } from 'readline';

// const chance = new Chance();

// constant
// const initialState: AuthProps = {
//   isLoggedIn: false,
//   isInitialized: false,
//   user: null
// };

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  // const decoded: KeyedObject = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  // return decoded.exp > Date.now() / 1000;
  return true; // @todo: remove this line
};


// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

// @todo: does this need to be an observer of mobx?
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = observer(({ children }: { children: React.ReactElement; }) => {
  // const [state, dispatch] = useReducer(authReducer, initialState);
  // const state = { isLoggedIn: true }; // @todo: remove this line
  const { authStore, commonStore } = useStore();
  const [refreshTokenTimeoutId, setRefreshTokenTimeoutId] = useState<any>(null);

  const refreshToken = async () => {
    stopRefreshTokenTimer();
    try {
      const user = await agent.Account.refreshToken();
      commonStore.setToken(user.token);
      startRefreshTokenTimer(user.token);
    } catch (error) {
      console.log(error);
    }
  };

  const stopRefreshTokenTimer = (): void => {
    clearTimeout(refreshTokenTimeoutId);
  };

  const startRefreshTokenTimer = (token: string): void => { // this needs to be invoked anytime we receive a token
    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const expiresClaim = new Date(jwtPayload.exp * 1000);
    const millisecondsBeforeExpire = 60000; // 60 seconds
    const delay = expiresClaim.getTime() - Date.now() - millisecondsBeforeExpire; // this sets how much time before the users token expires to get another one. It should be increase to a minite or two before the token expires.
    let timeoutId = setTimeout(refreshToken, delay);
    setRefreshTokenTimeoutId(timeoutId);
  };


  // get the token from local storage and get the user
  useEffect(() => {
    const init = async () => {
      try {
        const tokenFromLocalStorage = window.localStorage.getItem('jwt');
        // if (serviceToken && verifyToken(serviceToken)) { // todo: add back in verifyToken()
        if (tokenFromLocalStorage) {
          const user = await agent.Account.current();
          commonStore.setToken(user.token); // update token as it is refreshed when getting current user
          startRefreshTokenTimer(user.token);
          authStore.setLoggedInUser(user);

        } else {
          authStore.removeLoggedInUser();
        }
      } catch (err) {
        console.error(err);
        authStore.removeLoggedInUser();
      }
    };

    init();
  }, []);

  useEffect(() => {
    // Clear the timeout when the component unmounts
    return () => {
      if (refreshTokenTimeoutId) {
        clearTimeout(refreshTokenTimeoutId);
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await agent.Account.login({ email, password });
      commonStore.setToken(user.token);
      // @todo // delete user['token'];
      authStore.setLoggedInUser(user);
      startRefreshTokenTimer(user.token);

    } catch (error) {
      throw error;
    }

  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // todo: this flow need to be recode as it not verified
    // const id = chance.bb_pin();
    const id = '1234567890';
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers!),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    commonStore.setToken(null);
    // @todo // delete user['token'];
    authStore.removeLoggedInUser();
  };

  const resetPassword = async (email: string) => { };

  const updateProfile = () => { };


  if (authStore.isInitialized !== undefined && !authStore.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...authStore, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
});

export default JWTContext;
