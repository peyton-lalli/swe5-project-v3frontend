<template>
  <v-container fill-height fluid align="center">
    <v-row>
      <v-col>
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
        <v-row>
          <v-col>
            <v-img alt="OC Logo" width="400" :src="logoUrl" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-bold text-mediumBlue text-h5 pl-12"
            >MUSIC DEPARTMENT</v-col
          >
        </v-row>
        <v-row>
          <v-col><div id="parent_id" style="padding-left: 45px"></div></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ocLogo from "/OC_LOGO_BLUE.svg";
  import AuthServices from "../services/authServices.js";
  import { useUserStore } from "../stores/UserStore.js";
  import { useEventsStore } from "../stores/EventsStore.js";
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
      ...mapStores(useUserStore, useEventsStore),
    },
    async mounted() {
      await this.loginWithGoogle();
    },
    methods: {
      async loginWithGoogle() {
        window.handleCredentialResponse = await this.handleCredentialResponse;
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
          .then(async (response) => {
            this.user = response.data;
            await this.userStore.setUser(this.user);
            await this.eventsStore.setEvents();

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
