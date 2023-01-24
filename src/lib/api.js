import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allItems: 'http://localhost:8000/api/items/',
  singleItem: (pk) => `/api/items/${pk}`,
  allComments: '/api/comments/',
  singleComment: (pk) => `/api/comments/${pk}`,
  allUsers: '/api/users/',
  singleUser: (pk) => `/api/users/${pk}`,
  allPockets: '/api/pockets/',
  singlePocket: (pk) => `/api/pockets/${pk}/`,
  login: '/api/users/login/',
  register: '/api/users/register/',
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
