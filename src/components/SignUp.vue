<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center" style="height: 60vh">
          <v-card style="min-width: 80%">
            <v-card-title> Login </v-card-title>
            <v-card-text class="pt-4">
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="Enter your e-mail address"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Enter your password"
                  v-model="password"
                  min="8"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  counter
                  required
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn
                    @click="submit"
                    :class="{
                      'blue darken-4 white--text': valid,
                      disabled: !valid,
                    }"
                    >Submit</v-btn
                  >
                  <a href="">Forgot Password</a>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({}),
};
</script>

