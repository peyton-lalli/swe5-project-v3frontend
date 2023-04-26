<template>
  <v-container fluid class="studentComponent pa-0">
    <v-card class="mainCardBorder mb-4 pa-2">
      <v-card-text class="pt-0">
        <v-row justify="left" class="mt-0 flex-nowrap">
          <v-col cols="1" align-self="center" class="pa-0">
            <v-avatar class="bg-darkBlue" size="64">
              <v-img :src="student.picture"></v-img>
            </v-avatar>
          </v-col>
          <v-spacer cols="1"></v-spacer>
          <v-col cols="9" class="pa-0">
            <v-card-title class="py-0 font-weight-bold text-darkGray">
              {{ student.fName + " " + student.lName }}
            </v-card-title>
            <v-card-subtitle
              class="text-darkBlue font-weight-semi-bold pb-0 text-capitalize">
              {{ student.classification }}
            </v-card-subtitle>
            <v-card-subtitle class="text-mediumBlue font-weight-semi-bold pb-0">
              Vocal Level: {{ student.level }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="auto" align-self="center" justify="left">
            <v-btn color="transparent" class="buttonGradient" rounded flat>
              <v-icon size="x-large">
                <font-awesome-icon
                  icon="fa-solid fa-caret-down"
                  class="text-white" /> </v-icon
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { useUserStore } from "../stores/UserStore.js";
  import { mapStores } from "pinia";

  export default {
    name: "StudentComponent",
    components: {},
    data() {
      return {};
    },
    props: {
      student: {
        type: [Array],
        default() {
          return {};
        },
      },
    },
    computed: {
      ...mapStores(useUserStore),
    },
    mounted() {
      console.log(this.student);
    },
    methods: {},
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .v-btn {
    opacity: 100%;
  }
</style>
