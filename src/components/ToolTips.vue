<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="$emit('updateAddRSSOpen', true)"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-rss</v-icon>
        </v-btn>
      </template>
      <span>Add RSS Feed</span>
    </v-tooltip>
    <v-dialog v-model="modal_open" max-width="690" max-height="590">
      <v-card id="add-rss-modal">
        <v-card-title>
          Add RSS Feed
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Enter your RSS feed URL"
            :value="add_rss_url"
            @change="add_rss_url = $event"
            :loading="add_rss_loading"
            :error-messages="add_rss_error"
            autocomplete="false"
            @keydown.enter="$emit('storeRSS', add_rss_url)"
            clearable
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$emit('updateAddRSSOpen', false)"> Cancel </v-btn>
          <v-btn text @click="$emit('storeRSS', add_rss_url)"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="$emit('refreshRequest')" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </template>
      <span>Refresh Feed</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-lightbulb-on-outline</v-icon>
        </v-btn>
      </template>
      <span>Toggle Day/Night Theme</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <span>Create Account or Login</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "ToolTips",
  data: () => ({
    modal_open: false,
    add_rss_url: null,
  }),
  props: {
    add_rss_open: Boolean,
    add_rss_loading: Boolean,
    add_rss_error: String,
  },
  watch: {
    add_rss_open: function() {
      this.modal_open = this.add_rss_open;
      this.add_rss_url = null;
    },
    modal_open: function() {
      if (this.modal_open === false) {
        this.$emit("updateAddRSSOpen", false);
      }
    },
  },
};
</script>

<style scoped>
#add-rss-modal {
  padding: 10px;
}
</style>
