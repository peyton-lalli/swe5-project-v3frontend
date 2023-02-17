<template>
  <div class="signup-buttons">
    <br /><br />
    <br /><br />
    <br /><br />
    <v-row justify="center">
      <table>
        <tr>
          <th>
            <v-toolbar-title class="font-weight-bold mediumBlue--text"
              ><v-img
                alt="OC Logo"
                width="400"
                src="/OC_LOGO_BLUE.svg"
              /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MUSIC
              DEPARTMENT</v-toolbar-title
            >
            <br />
          </th>
        </tr>
        <tr>
          <td>
            <div id="parent_id"></div>
          </td>
        </tr>
      </table>
    </v-row>
  </div>
</template>

<style>
table {
  padding-right: 25px;
}
td {
  padding-left: 105px;
}
</style>

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
          theme: "filled_black",
          size: "large",
          shape: "pill",
          logo_alignment: "left",
          text: "signin_with",
          width: 230,
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
