<template>
  <v-row dense id="row" justify="center">
    <v-card outlined tile id="card">
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-icon>mdi-twitter</v-icon>
      </v-card-title>
      <v-card-subtitle> {{ sub_title }} </v-card-subtitle>
      <v-card-text>
        <div v-html="span(content)"></div>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "Post",
  props: {
    title: String,
    sub_title: String,
    content: String,
  },
  methods: {
    span(text) {
      return "<span>" + text + "</span>";
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
</style>