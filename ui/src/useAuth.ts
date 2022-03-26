import { useState } from "react";

const STORAGE_KEY = "auth-demo";

export interface AuthValue {
  token: string;
}

const useAuth = () => {
  const getAuth = (): AuthValue | undefined => {
    const auth = localStorage.getItem(STORAGE_KEY);
    return auth ? JSON.parse(auth) : undefined;
  };

  const [auth, setAuth] = useState(getAuth());

  const saveAuth = (authValue?: AuthValue) => {
    if (authValue) localStorage.setItem(STORAGE_KEY, JSON.stringify(authValue));
    else localStorage.removeItem(STORAGE_KEY);
    setAuth(authValue);
  };

  return {
    setToken: saveAuth,
    auth,
  };
};

export default useAuth;
