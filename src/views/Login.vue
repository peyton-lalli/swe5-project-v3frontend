<template>
  <v-container fill-height fluid class="loginGrid">
    <v-card class="loginArea mainBlur" rounded="lg">
      <v-card-title class="pt-8 pb-8">
        <v-row>
          <v-spacer></v-spacer>
          <v-img alt="OC Logo" width="200" :src="logoUrl" />
          <v-spacer></v-spacer>
        </v-row>
      </v-card-title>

      <v-card-title class="font-weight-bold text-mediumBlue text-h5">
        <v-row>
          <v-spacer></v-spacer>
          MUSIC DEPARTMENT
          <v-spacer></v-spacer>
        </v-row>
      </v-card-title>

      <v-card-actions class="pt-8 pb-8">
        <v-row>
          <v-spacer></v-spacer>
          <div id="parent_id" class="text-darkBlue"></div>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-actions>
    </v-card>
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
      this.userStore.clearLoginUser();
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
            console.log(this.userStore.userInfo);
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

<style scoped>
  .loginGrid {
    display: grid;
    grid-template-rows: 1fr;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: ". loginArea .";
  }

  .loginArea {
    grid-area: loginArea;
  }
</style>
