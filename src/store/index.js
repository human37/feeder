import Vue from "vue";
import Vuex from "vuex";
import { getFeed } from "../utils.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    feeds_list: [],
    feed_refreshing: false,
    feed_refreshing_progress: 0,
    posts: [],
    loading_messages: [
      "ooga booga...",
      "raining packets...",
      "blockchain intensifying...",
      "loading NFT...",
      "never gonna give you up...",
      "never gonna let you down...",
      "hailing aliens...",
      "epic loading message...",
      "proving P = NP...",
      "killing zombies...",
      "battling GPT4...",
      "stealing the declaration of independence...",
      "hacking the pentagon...",
      "rewriting the linux kernel in rust...",
      "responding to microsoft acquisition offers...",
    ],
  },
  getters: {
    getFeedsList: (state) => {
      return state.feeds_list;
    },
    getLoadingMessages: (state) => {
      return state.loading_messages;
    },
    getFeedRefreshing: (state) => {
      return state.feed_refreshing;
    },
    getFeedRefreshingProgress: (state) => {
      return state.feed_refreshing_progress;
    },
    getPosts: (state) => {
      return state.posts;
    },
    isToggleAllFeedsOn: (state) => {
      let feeds_list = state.feeds_list;
      if (feeds_list.length === 0) {
        return false;
      }
      let is_on = true;
      for (let feed of feeds_list) {
        if (!feed.is_on) {
          is_on = false;
          break;
        }
      }
      return is_on;
    },
  },
  mutations: {
    setFeedsList(state, feeds_list) {
      state.feeds_list = feeds_list;
    },
    setFeedsRefreshing(state, feed_refreshing) {
      state.feed_refreshing = feed_refreshing;
    },
    setFeedsRefreshingProgress(state, feed_refreshing_progress) {
      state.feed_refreshing_progress = feed_refreshing_progress;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    setFeedsList({ commit, dispatch }, feeds_list) {
      commit("setFeedsList", feeds_list);
      dispatch("syncFeedsListInLocalStorage");
    },
    addNewFeed({ commit, dispatch }, feed) {
      commit("setFeedsList", [...this.state.feeds_list, feed]);
      dispatch("syncFeedsListInLocalStorage");
    },
    syncFeedsListInLocalStorage() {
      localStorage.setItem("feeds_list", JSON.stringify(this.state.feeds_list));
    },
    async refreshPostsFromFeeds({ commit, getters, dispatch }) {
      commit("setFeedsRefreshing", true);
      commit("setFeedsRefreshingProgress", 0);
      commit("setPosts", []);
      let feeds_list = getters.getFeedsList || [];
      let ratio = 2;
      for (const feed of feeds_list) {
        if (feed.is_on) {
          let currentProgress = getters.getFeedRefreshingProgress;
          let prog = (currentProgress += 100 / ratio);
          commit("setFeedsRefreshingProgress", prog);
          let posts = await getFeed(feed.url);
          commit("setPosts", [...this.state.posts, ...posts]);
          ratio *= 2;
        }
      }
      commit("setFeedsRefreshing", false);
      commit("setFeedsRefreshingProgress", 1000);
      dispatch("sortPosts");
    },
    sortPosts({ commit }) {
      commit("setPosts", this.state.posts.sort(this.compare));
    },
    toggleFeed({ commit }, feed) {
      let feeds_list = this.state.feeds_list;
      let index = feeds_list.indexOf(feed);
      feeds_list[index].is_on = !feeds_list[index].is_on;
      commit("setFeedsList", feeds_list);
    },
    handleToggleAllFeeds({ commit, dispatch }, is_on) {
      let feeds_list = this.state.feeds_list;
      for (let feed of feeds_list) {
        feed.is_on = is_on;
      }
      commit("setFeedsList", feeds_list);
      dispatch("refreshPostsFromFeeds");
    },
    deleteFeed({ commit, dispatch }, feed) {
      let feeds_list = this.state.feeds_list;
      let index = feeds_list.indexOf(feed);
      feeds_list.splice(index, 1);
      commit("setFeedsList", feeds_list);
      dispatch("refreshPostsFromFeeds");
    },
    compare(a, b) {
      if (a.date > b.date) {
        return -1;
      } else {
        return 1;
      }
    },
  },
});
