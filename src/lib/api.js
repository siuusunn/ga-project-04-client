import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allItems: `${process.env.REACT_APP_BASE_URL}/api/items/`,
  singleItem: (pk) => `${process.env.REACT_APP_BASE_URL}/api/items/${pk}`,
  allComments: `${process.env.REACT_APP_BASE_URL}/api/comments/`,
  singleComment: (pk) => `/api/comments/${pk}`,
  allUsers: `${process.env.REACT_APP_BASE_URL}/api/users/`,
  singleUser: (pk) => `${process.env.REACT_APP_BASE_URL}/api/users/${pk}`,
  allPockets: `${process.env.REACT_APP_BASE_URL}/api/pockets/`,
  singlePocket: (pk) => `${process.env.REACT_APP_BASE_URL}/api/pockets/${pk}/`,
  login: `${process.env.REACT_APP_BASE_URL}/api/users/login/`,
  register: `${process.env.REACT_APP_BASE_URL}/api/users/register/`,
  cloudinary: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
};

const GET = (endpoint) => axios.get(endpoint);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${AUTH.getToken()}` }
});

export const API = { ENDPOINTS, GET, POST, PUT, DELETE, getHeaders };
