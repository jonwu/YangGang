import axios from "axios";
const URL = "http://localhost:80";

// const URL = "http://34.217.208.191:80"; //dev
// const URL = "http://54.185.34.163:80";

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
  getTwitter(candidate = "andrew_yang", params) {
    if (candidate === "andrew_yang") candidate = "";
    return instance.get(`/tweets/${candidate}`, { params });
  }
  getReddit(candidate = "andrew_yang", params) {
    if (candidate === "andrew_yang") candidate = "";
    if (candidate === "donald_trump") return new Promise(resolve => resolve());
    return instance.get(`/hotreddit/${candidate}`, { params });
  }
  getYoutube(candidate = "andrew_yang", params) {
    if (candidate === "andrew_yang") candidate = "";
    return instance.get(`/youtube/${candidate}`, { params });
  }
  getYoutubeDay(candidate = "andrew_yang", params) {
    if (candidate === "andrew_yang") candidate = "";
    return instance.get(`/youtube_day/${candidate}`, { params });
  }
  getYoutube3Days(candidate = "andrew_yang", params) {
    if (candidate === "andrew_yang") candidate = "";
    return instance.get(`/youtube_3day/${candidate}`, { params });
  }
  getYoutubeAllTime(candidate = "andrew_yang", params) {
    if (candidate === "andrew_yang") candidate = "";
    return instance.get(`/youtube_all_time/${candidate}`, { params });
  }
  getNews(candidate = "andrew_yang", params) {
    if (candidate === "andrew_yang") candidate = "";
    return instance.get(`/news/${candidate}`, { params });
  }
  getInstagram(candidate = "andrew_yang", params) {
    if (candidate === "andrew_yang") candidate = "";
    return instance.get(`/instagram/${candidate}`, { params });
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
  postNotifications(expoid, params) {
    return instance.post(`/simplepush/${expoid}`, params);
  }
  deleteNotifications(params) {
    return instance.delete(`/simplepush`, params);
  }
  getNotifications(params) {
    return instance.get(`/getpush`, { params });
  }
  postMessage(params) {
    return instance.post(`/getpush`, params);
  }
  postUser(params) {
    return instance.post(`/user`, params);
  }
  getUser(userId, params) {
    return instance.get(`/user/${userId}`, params);
  }
}
export default new BackendUtils();
