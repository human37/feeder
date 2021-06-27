<template>
  <v-row dense id="row" justify="center">
    <v-card id="card" >
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon :href="link" target="_blank" v-bind="attrs" v-on="on">
              <v-icon>mdi-link</v-icon>
            </v-btn>
          </template>
          <span>Visit Source</span>
        </v-tooltip>
      </v-card-title>
      <v-card-subtitle> {{ creator || date }} </v-card-subtitle>
      <v-card-text>
        <div v-html="span(content)" id="content"></div>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "Post",
  props: {
    title: String,
    creator: String,
    link: String,
    date: String,
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