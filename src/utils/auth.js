import { getItem, setItem, STORAGE_KEYS } from './storage';

const AUTH_KEY = 'kai_auth_user';

export const saveAuthUser = (userData) => {
  setItem(AUTH_KEY, userData);
  setItem(STORAGE_KEYS.USER, userData);
};

export const getAuthUser = () => {
  return getItem(AUTH_KEY, null);
};

export const isAuthenticated = () => {
  const user = getAuthUser();
  return user !== null && user.email && user.email.length > 0;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem('kai_user_logged_in');
};

export const getUserDisplayName = () => {
  const user = getAuthUser();
  if (!user || !user.name) return 'Guest';
  return user.name;
};
