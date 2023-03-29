<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">Edit Administrators</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeEditAdminsDialog()">
            <v-icon>
              <font-awesome-icon
                icon="a-solid fa-circle-xmark"
                class="text-lightBlue">
              </font-awesome-icon>
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="8" class="pl-6">
          <v-text-field></v-text-field>
        </v-col>
        <v-col cols="4" class="pl-11">
          <v-btn
            elevation="0"
            size="large"
            class="buttonGradient text-white font-weight-bold">
            Add New
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-for="admin in admins">
        <v-col>
          <v-card
            class="repertoireItemGradient fullBorderCurve mainblur ml-3 mr-3 pl-4 pr-4 mb-2">
            <v-row>
              <v-col cols="1" align-self="center">
                <v-avatar class="bg-darkBlue">
                  <v-img :src="admin.picture"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="8" align-self="center">
                <v-card-title class="pb-0 font-weight-bold">
                  {{ admin.fName }} {{ admin.lName }}
                </v-card-title>
                <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
                  {{ admin.email }}
                </v-card-subtitle>
              </v-col>
              <v-col cols="3" align-self="center" class="text-right">
                <v-btn
                  elevation="0"
                  size="small"
                  rounded="pill"
                  class="buttonWhite text-mediumBlue font-weight-bold">
                  Disable
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "EditAdmins",
    components: {},
    data() {
      return {
        admins: [],
      };
    },
    methods: {
      closeEditAdminsDialog() {
        this.$emit("closeEditAdminDialogEvent");
      },
    },
    computed: {
      ...mapStores(useUserStore),
    },
    async mounted() {
      console.log(await this.userStore.getAllAdmin());
      this.admins = await this.userStore.getAllAdmin();
    },
  };
</script>

<style></style>
