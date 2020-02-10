import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_DEMO_API_BASE_URL,
  timeout: 500000
});

export default instance;
