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
import { mapActions, mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["getFeedsList"]),
  },
  methods: {
    ...mapActions(["addNewFeed", "refreshPostsFromFeeds"]),
    async storeRSS(url) {
      this.add_rss_loading = true;
      if (url === null) {
        this.add_rss_open = false;
        return;
      }
      let feeds_list = this.getFeedsList;
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
          this.addNewFeed(new_feed);
          this.add_rss_error = null;
          this.add_rss_loading = false;
          this.add_rss_open = false;
          await this.refreshPostsFromFeeds();
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
