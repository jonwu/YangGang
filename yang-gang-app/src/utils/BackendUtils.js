import axios from "axios";
// const URL = "http://localhost:80";

// const URL = "http://34.217.208.191:80"; //dev
const URL = "http://54.185.34.163:80";

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
  postNotifications(eventId, expoId, params) {
    return instance.post(`/notifications/${eventId}/${expoId}`, params);
  }
  deleteNotifications(params) {
    return instance.delete(`/notifications`, params);
  }
  getNotifications(params) {
    return instance.get(`/notifications`, { params });
  }
  getInstagram(params) {
    return instance.get(`/instagram`, { params });
  }
  postMessage(params) {
    return instance.post(`/message`, params);
  }
}
export default new BackendUtils();
