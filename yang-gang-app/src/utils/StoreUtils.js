import BackendUtils from "./BackendUtils";
import create from "zustand";
import { useDispatch } from "react-redux";
import { load } from "modules/loading/actions";
import lodash from "lodash";

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

export const useRefreshStats = () => {
  const dispatch = useDispatch();
  const updateTwitterStats = useStatsStore(state => state.updateTwitterStats);
  const updateRedditStats = useStatsStore(state => state.updateRedditStats);
  const getInstagramStats = useStatsStore(state => state.getInstagramStats);
  const getStats = () =>
    Promise.all([
      updateTwitterStats(),
      updateRedditStats(),
      getInstagramStats()
    ]);

  return () => dispatch(load("stats", getStats()));
};

const [useEventsStore] = create(set => ({
  events: [],
  fetchEvents: () => {
    BackendUtils.getAllEvents().then(response => {
      const events = response.data;
      events.forEach(e => {
        e.event_date = e.event_date + "Z";
      });
      set({ events });
    });
  }
}));

export { useStatsStore, useEventsStore };
