<template>
  <div>
    <v-divider></v-divider>
    <v-list-item>
      <v-switch
        :input-value="isToggleAllFeedsOn"
        label="All"
        @change="handleToggleAllFeeds"
        inset
      ></v-switch>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('refreshRequest')" icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider v-if="!isFeedsEmpty"></v-divider>
    <v-list>
      <v-list-item
        v-for="feed in getFeedsList"
        class="feed-switch"
        :key="feed.title"
        link
      >
        <v-switch
          :input-value="feed.is_on"
          :label="feed.title"
          @change="handleToggleFeed(feed)"
          inset
        ></v-switch>
        <v-spacer></v-spacer>
        <v-btn @click="handleDeleteFeed" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SideBar",
  data: () => ({
    all_switch: false,
    all_selected: [],
  }),
  computed: {
    ...mapGetters(["getFeedsList", "isToggleAllFeedsOn"]),
    isFeedsEmpty() {
      return this.getFeedsList.length == 0;
    },
  },
  methods: {
    ...mapActions(["toggleFeed", "deleteFeed", "handleToggleAllFeeds"]),
    handleToggleFeed(feed) {
      this.toggleFeed(feed);
    },
    handleDeleteFeed(feed) {
      this.deleteFeed(feed);
    },
  },
};
</script>

<style scoped>
.feed-switch {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
