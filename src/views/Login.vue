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
              :src="
                logoUrl
              " /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MUSIC
            DEPARTMENT</v-toolbar-title
          >
          <br />
          <div id="parent_id" style="padding-left: 45px"></div
        ></v-col> </v-row
    ></v-container>
  </div>
</template>

<script>
  import ocLogo from "/OC_LOGO_BLUE.svg";
  import AuthServices from "../services/authServices.js";
  import { useLoginStore } from "../stores/LoginStore.js";
  import { mapStores } from "pinia";

  export default {
    name: "LoginPage",
    components: { ocLogo },
    data() {
      return {
        fName: "",
        lName: "",
        roleCounter: 0,
        user: {},
        logoUrl: "",
      };
    },
    async created() {
      this.logoUrl = ocLogo;
    },
    computed: {
      ...mapStores(useLoginStore),
    },
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
            this.loginStore.setLoginUser(this.user);
            this.fName = this.user.fName;
            this.lName = this.user.lName;
            this.$router.push({
              name: "baseDashboard",
            });
          })
          .catch((error) => {
            console.log("error", error);
          });
      },
    },
  };
</script>
