import BackendUtils from "./BackendUtils";
import create from "zustand";

const [useStatsStore] = create(set => ({
  twitterStats: null,
  redditStats: null,
  instagramStats: null,
  updateTwitterStats: () =>
    BackendUtils.getTwitterStats().then(response =>
      set({ twitterStats: response.data })
    ),
  updateRedditStats: () =>
    BackendUtils.getRedditStats().then(response =>
      set({ redditStats: response.data })
    ),
  getInstagramStats: () =>
    BackendUtils.getInstagramStats().then(response =>
      set({ instagramStats: response.data })
    )
}));

export { useStatsStore };
