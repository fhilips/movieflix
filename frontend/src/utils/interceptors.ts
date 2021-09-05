import axios from "axios";
import history from "./history";

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if(error.response.status === 401 || error.response.status === 403) {
      history.push('/');
    }
    return Promise.reject(error);
  }
);