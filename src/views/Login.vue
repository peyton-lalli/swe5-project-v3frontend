<template>
  <v-container fill-height fluid class="loginGrid" align="center">
    <v-card class="loginArea loginBlur pa-4" rounded="lg">
      <v-card rounded="md" flat>
        <v-card-title class="pt-8 pb-8 px-8" align="center">
          <v-img alt="OC Logo" width="300" :src="logoUrl" />
        </v-card-title>

        <v-card-title
          class="font-weight-bold text-mediumBlue px-8"
          align="center">
          MUSIC DEPARTMENT
        </v-card-title>

        <v-card-actions class="pb-4 px-8" align="center">
          <v-container id="parent_id" class="text-darkBlue"></v-container>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  import ocLogo from "../assets/OC_LOGO_BLUE_GRADIENT.svg";
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
    grid-template-rows: 2fr;
    align-items: center;
    grid-template-columns: minmax(auto, 2fr) minmax(auto, 1fr) minmax(auto, 2fr);
    grid-template-areas: ". loginArea .";
  }

  .loginArea {
    grid-area: loginArea;
  }
</style>
