<template>
  <v-row dense align="center" justify="center" style="padding:10px">
    <v-card min-height="150px" min-width="80vw" style="padding:10px">
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
    title: "How to Know If Your Android Phone Is Victim of Malicious Acts",
    sub_title: "social",
    content:
      "Androids highly customizable ecosystem makes it more prone to malware and viruses. Android malware can do much harm to your smartphone like stealing personal data, sending text messages to premium numbers, downloading infected apps, and using the phone for launching DDoS attacks. If you suspect that your smartphone is being used for malicious acts, or",
  }),
};
</script>
