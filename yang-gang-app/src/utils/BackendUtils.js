import axios from "axios";

const URL = "http://localhost:8000";
const instance = axios.create({ timeout: 10000, baseURL: URL });

instance.interceptors.request.use(
  i_config => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `\n(${i_config.method.toUpperCase()}) ${i_config.url} ${
          i_config.params
            ? JSON.stringify(i_config.params)
            : JSON.stringify(i_config.data)
        }`
      );
    }
    return i_config;
  },
  error => {
    return Promise.reject(error);
  }
);

class BackendUtils {
  getTwitter(id, params) {
    return instance.get(`/twitter`, { params });
  }
  getReddit(params) {
    return instance.get(`/hotreddit`, { params });
  }
  getYoutube(params) {
    return instance.get(`/youtube`, { params });
  }
}
export default new BackendUtils();
