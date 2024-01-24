import axios from "axios";
import cookie from "react-cookies";

const createInstance = () => {
  const instance = axios.create();
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + cookie.load("token");
  return instance;
};  

const ApiCall = {
  get: (url, callback) => {
    createInstance()
      .get(url)
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {});
  },

  post: (url, data, callback) => {
    createInstance()
      .post(url, data)
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {});
  },

  patch: (url, data, callback) => {
    createInstance()
      .patch(url, data)
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {});
  },

  delete: (url, data, callback) => {
    createInstance()
      .delete(url, data)
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {});
  },
};

export default ApiCall;
