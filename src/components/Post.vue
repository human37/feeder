<template>
  <v-row dense id="row" justify="center">
    <v-card id="card" flat outlined>
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-tooltip v-if="!if_mobile" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon :href="link" target="_blank" v-bind="attrs" v-on="on">
              <v-icon>mdi-link</v-icon>
            </v-btn>
          </template>
          <span>Visit Source</span>
        </v-tooltip>
        <v-btn
          v-else
          icon
          :href="link"
          target="_blank"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-link</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        {{ (formatDate(date) || creator) + "  |  " + feed_title }}
      </v-card-subtitle>
      <v-card-text>
        <div v-html="span(content)" id="content"></div>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import { isMobile } from "mobile-device-detect";
export default {
  name: "Post",
  data: () => ({
    if_mobile: isMobile,
  }),
  props: {
    title: String,
    feed_title: String,
    creator: String,
    link: String,
    date: Number,
    content: String,
  },
  methods: {
    span(text) {
      return "<span>" + text + "</span>";
    },
    formatDate(date) {
      if (date === null) {
        return false;
      }
      let pretty_date = new Date(date);
      return pretty_date.toDateString();
    },
  },
};
</script>

<style scoped>
#row {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  min-height: 150px;
}
#card {
  min-height: inherit;
  max-height: inherit;
  min-width: 100%;
}
.v-card__text,
.v-card__title {
  word-break: normal;
}
</style>
