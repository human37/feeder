<template>
  <v-row dense align="center" justify="center" style="max-height: 20%">
    <v-card height="150px" min-width="80vw">
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-icon>mdi-twitter</v-icon>
      </v-card-title>
      <v-card-text>
        {{ content }}
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "Post",
  data: () => ({
    title: "twitter",
    sub_title: "social",
    content: "ooga booga sooga looba dooga",
  }),
};
</script>
