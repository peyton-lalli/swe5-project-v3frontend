<template>
  <v-container fluid class="studentComponent">
    <v-card elevation="12" class="fullBorderCurve">
      <v-card-text class="pt-0">
        <v-row justify="left" class="pl-5 mt-0">
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <v-card-title class="pb-0 font-weight-bold">
              {{ students.at(0).name }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-bold pb-0">
              {{ students.at(0).classification }}
            </v-card-subtitle>
            <v-card-subtitle class="text-darkBlue font-weight-bold pb-0">
              Level: {{ students.at(0).level }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="auto" align-self="center" justify="right">
            <v-btn color="transparent" class="buttonGradient" rounded flat>
              <v-icon size="x-large">
                <font-awesome-icon
                  icon="fa-solid fa-caret-down"
                  class="text-white"
                /> </v-icon
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "StudentComponent",
  components: {},
  data() {
    return {
      students: [
        {
          name: "Chloe Sheasby",
          classification: "Senior",
          level: "3",
        },
      ],
    };
  },
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
