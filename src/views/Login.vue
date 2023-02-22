<template>
  <div class="signup-buttons">
    <br /><br />
    <br /><br />
    <br /><br />
    <v-container fill-height fluid
      ><v-row align="center" justify="center">
        <v-col align="center" justify="center"
          ><v-toolbar-title class="font-weight-bold text-mediumBlue"
            ><v-img
              alt="OC Logo"
              width="400"
              src="/OC_LOGO_BLUE.svg"
            /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MUSIC
            DEPARTMENT</v-toolbar-title
          >
          <br />
          <div id="parent_id" style="padding-left: 45px"></div
        ></v-col> </v-row
    ></v-container>
  </div>
</template>

<script>
import AuthServices from "../services/AuthServices.js";
import Utils from "../config/utils.js";

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
          theme: "filled_black",
          size: "large",
          shape: "pill",
          logo_alignment: "left",
          text: "signin_with",
          width: 230,
        }
      );
    },
    async handleCredentialResponse(response) {
      let token = {
        credential: response.credential,
      };
      await AuthServices.loginUser(token)
        .then((response) => {
          this.user = response.data;
          console.log(this.user);
          Utils.setStore("user", this.user);
          this.fName = this.user.fName;
          this.lName = this.user.lName;
          console.log("user", this.user.role);
          if (this.user.role == "faculty") {
            this.$router.push({
              name: "facultyDashboard",
              params: { userId: this.user.userId },
            });
          } else {
            this.$router.push({
              name: "baseDashboard",
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
      window.google.accounts.id.renderButton(
        document.getElementById("parent_id"),
        {
          type: "standard",
          theme: "filled_black",
          size: "large",
          shape: "pill",
          logo_alignment: "left",
          text: "signin_with",
          width: 230,
        }
      );
    },
    async handleCredentialResponse(response) {
      let token = {
        credential: response.credential,
      };
      await AuthServices.loginUser(token)
        .then((response) => {
          this.user = response.data;
          Utils.setStore("user", this.user);
          this.fName = this.user.fName;
          this.lName = this.user.lName;
          if (this.user.role == "faculty") {
            console.log("Login:", this.user.userId);
            this.$router.push({
              name: "facultyDashboard",
              params: { userId: this.user.userId },
            });
          } else {
            this.$router.push({ name: "baseDashboard" });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>
