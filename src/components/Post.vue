<template>
  <v-row dense id="row" justify="center">
    <v-card id="card">
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-icon>mdi-twitter</v-icon>
      </v-card-title>
      <v-card-subtitle> {{ sub_title }} </v-card-subtitle>
      <v-card-text>
        {{ content }}
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
};
</script>

<style scoped>
#row {
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  min-height: 150px;
  max-height: 250px;
}
#card {
  padding: 10px;
  min-height: inherit;
  max-height: inherit;
}
</style>