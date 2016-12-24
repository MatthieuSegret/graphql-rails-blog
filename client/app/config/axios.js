import axios from 'axios';
import ROOT_URL from 'config/rootUrl';

const axiosInstance = axios.create({
  baseURL: ROOT_URL,
  withCredentials: true
});

export default axiosInstance;
