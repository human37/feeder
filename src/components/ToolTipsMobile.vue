<template>
  <div>
    <v-btn @click="add_rss_open = true" icon>
      <v-icon>mdi-rss</v-icon>
    </v-btn>
    <v-dialog v-model="add_rss_open" max-width="490">
      <v-card id="add-rss-modal">
        <v-text-field
          label="Enter your RSS feed URL"
          :value="add_rss_url"
          @change="add_rss_url = $event"
          :loading="add_rss_loading"
          :error-messages="add_rss_error"
          @emptied="add_rss_error = null"
          clearable
          required
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="add_rss_open = false"> Cancel </v-btn>
          <v-btn text @click="storeRSS"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn @click="$emit('refreshRequest')" icon>
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark" icon>
      <v-icon>mdi-lightbulb-on-outline</v-icon>
    </v-btn>
    <v-btn icon v-bind="attrs">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { getFeed } from "../utils.js";
export default {
  name: "ToolTips",
  data: () => ({
    add_rss_open: false,
    add_rss_url: null,
    add_rss_error: null,
    add_rss_loading: false,
  }),
  watch: {
    add_rss_open: function() {
      this.add_rss_url = null;
      this.add_rss_error = null;
      this.add_rss_loading = false;
    },
  },
  methods: {
    async storeRSS() {
      this.add_rss_loading = true;
      if (this.add_rss_url === null) {
        this.add_rss_open = false;
        return;
      }
      // pull existing list from local storage
      let feeds_list = JSON.parse(localStorage.getItem("feeds")) || [];
      let new_feed = { title: null, url: this.add_rss_url, is_on: true };
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
        } else {
          this.add_rss_error = "this is a bad feed URL";
          console.log("this is a bad feed");
        }
      } else {
        console.log("this feed already exists");
        this.add_rss_error = "you already have this feed added";
      }
      this.add_rss_loading = false;
      this.$emit("addNewFeed", feeds_list);
      this.$emit("refreshRequest");
    },
    async refreshFeed() {
      return true;
    },
  },
};
</script>

<style scoped>
#add-rss-modal {
  padding: 10px;
}
</style>
