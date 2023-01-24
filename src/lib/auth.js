const setToken = (token) => localStorage.setItem('token', token);

const isSuperUser = (status) => localStorage.setItem('is_superuser', status);

const getToken = () => {
  return localStorage.getItem('token');
};

const getSuperUser = () => {
  return localStorage.getItem('is_superuser');
};

const getPayload = () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  const tokenParts = getToken().split('.');

  if (tokenParts.length < 3) {
    return false;
  }

  return JSON.parse(Buffer.from(tokenParts[1], 'base64'));
};

const deleteToken = () => {
  localStorage.removeItem('token');
};

const isOwner = (objectId) => objectId === getPayload().userId;

export const AUTH = {
  setToken,
  getToken,
  getPayload,
  deleteToken,
  isOwner,
  isSuperUser,
  getSuperUser
};
