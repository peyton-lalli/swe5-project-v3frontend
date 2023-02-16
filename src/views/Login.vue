<template>
  <div class="signup-buttons">
    <br /><br />
    <br /><br />
    <br /><br />
    <v-row justify="center">
      <v-img
        alt="OC Logo"
        class="shrink mr-4"
        contain
        src="/OC_LOGO_BLUE.svg"
        transition="scale-transition"
        fill="#558CCB"
      />
      <v-toolbar-title class="font-weight-bold darkBlue--text"
        >MUSIC PERFORMANCE MANAGEMENT SYSTEM</v-toolbar-title
      >
    </v-row>
    <v-row justify="center">
      <div display="flex" id="parent_id"></div>
    </v-row>
  </div>
</template>

<script>
import AuthServices from "../services/AuthServices.js";
import Utils from "../config/Utils.js";

export default {
  name: "LoginPage",
  data() {
    return {
      fName: "",
      lName: "",
      roleCounter: 0,
      user: {},
    };
  },
  created() {},
  mounted() {
    this.loginWithGoogle();
  },
  methods: {
    async loginWithGoogle() {
      window.handleCredentialResponse = this.handleCredentialResponse;
      const client = import.meta.env.VITE_APP_CLIENT_ID;
      console.log(client);
      window.google.accounts.id.initialize({
        client_id: client,
        cancel_on_tap_outside: false,
        auto_select: true,
        callback: window.handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("parent_id"),
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signup_with",
          width: 400,
        }
      );
    },
    handleCredentialResponse(response) {
      let token = {
        credential: response.credential,
      };
      AuthServices.loginUser(token)
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
          Utils.setStore("user", this.user);
          this.fName = this.user.fName;
          this.lName = this.user.lName;
          this.$router.push({ name: "baseDashboard" });
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>
