import axios from "axios";
// const URL = "http://localhost:80";
// const URL = "http://18.223.101.191:80";
// const URL = "http://10.130.33.218:5000";
const URL = "http://54.185.34.163:80";
// const URL = "http://192.168.17.202:80";
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
    return instance.get(`/tweets`, { params });
  }
  getReddit(params) {
    return instance.get(`/hotreddit`, { params });
  }
  getYoutube(params) {
    return instance.get(`/youtube`, { params });
  }
  getYoutubeDay(params) {
    return instance.get(`/youtube_day`, { params });
  }
  getYoutube3Days(params) {
    return instance.get(`/youtube_3day`, { params });
  }
  getYoutubeAllTime(params) {
    return instance.get(`/youtube_all_time`, { params });
  }
  getNews(params) {
    return instance.get(`/news`, { params });
  }
  getRedditStats(params) {
    return instance.get(`/reddit_stats/`, { params });
  }
  getTwitterStats(params) {
    return instance.get(`/twitter_stats`, { params });
  }
  getInstagramStats(params) {
    return instance.get(`/instagram_stats`, { params });
  }
  postAllEvents(params) {
    return instance.post(`/allevents`, params);
  }
  getAllEvents(params) {
    return instance.get(`/allevents`, { params });
  }
  putEvent(id, params) {
    return instance.put(`/event/${id}`, params);
  }
  getEvent(params) {
    return instance.get(`/event/${id}`, { params });
  }
  deleteEvent(id, params) {
    return instance.delete(`/event/${id}`, params);
  }
}
export default new BackendUtils();
