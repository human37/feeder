<template>
  <div>
    <ToolTips
      v-if="!if_mobile"
      :add_rss_open="add_rss_open"
      :add_rss_loading="add_rss_loading"
      :add_rss_error="add_rss_error"
      @storeRSS="storeRSS"
      @updateAddRSSOpen="updateAddRSSOpen"
      @updateAddRSSURL="updateAddRSSURL"
      @refreshRequest="$emit('refreshRequest')"
      @addNewFeed="$emit('addNewFeed')"
    />
    <ToolTipsMobile
      v-else
      :add_rss_open="add_rss_open"
      :add_rss_loading="add_rss_loading"
      :add_rss_error="add_rss_error"
      @storeRSS="storeRSS"
      @updateAddRSSOpen="updateAddRSSOpen"
      @updateAddRSSURL="updateAddRSSURL"
      @refreshRequest="$emit('refreshRequest')"
      @addNewFeed="$emit('addNewFeed')"
    />
  </div>
</template>

<script>
import ToolTips from "./ToolTips.vue";
import ToolTipsMobile from "./ToolTipsMobile.vue";
import { isMobile } from "mobile-device-detect";
import { getFeed } from "../utils.js";
export default {
  name: "NavIcons",
  data: () => ({
    if_mobile: isMobile,
    add_rss_open: false,
    add_rss_url: null,
    add_rss_error: null,
    add_rss_loading: false,
  }),
  components: {
    ToolTips,
    ToolTipsMobile,
  },
  watch: {
    add_rss_open: function() {
      this.add_rss_url = null;
      this.add_rss_error = null;
      this.add_rss_loading = false;
    },
  },
  methods: {
    async storeRSS(url) {
      this.add_rss_loading = true;
      if (url === null) {
        this.add_rss_open = false;
        return;
      }
      // pull existing list from local storage
      let feeds_list = JSON.parse(localStorage.getItem("feeds")) || [];
      let new_feed = { title: null, url: url, is_on: true };
      const stored_feed = feeds_list.findIndex(
        (feed) => feed.url == new_feed.url
      );
      // feed url is not already added
      if (stored_feed == -1) {
        // feed url is a valid rss feed
        let valid_response = await getFeed(new_feed.url);
        if (valid_response) {
          this.add_rss_loading = false;
          new_feed.title = valid_response[0].feed_title;
          feeds_list.push(new_feed);
          localStorage.setItem("feeds", JSON.stringify(feeds_list));
          this.add_rss_error = null;
          this.add_rss_loading = false;
          this.add_rss_open = false;
          this.$emit("addNewFeed", feeds_list);
          this.$emit("refreshRequest");
        } else {
          this.add_rss_error = "this is a bad feed URL";
        }
      } else {
        this.add_rss_error = "you already have this feed added";
      }
      this.add_rss_loading = false;
    },
    updateAddRSSOpen(payload) {
      this.add_rss_open = payload;
    },
    updateAddRSSURL(payload) {
      this.add_rss_url = payload;
    },
  },
};
</script>

<style scoped>
#add-rss-modal {
  padding: 10px;
}
</style>
