<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">Edit Students</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeEditStudentsDialog()">
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
      <v-text-field label="Search" class="ml-3 mr-3"></v-text-field>
      <v-card
        class="repertoireItemGradient fullBorderCurve mainblur ml-3 mr-3 pl-4 pr-4 mb-2">
        <v-row>
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="7" align-self="center">
            <v-card-title class="pb-0 font-weight-bold"> Name </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              Email?
            </v-card-subtitle>
          </v-col>
          <v-col cols="1" align-self="center" class="text-right">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonWhite text-mediumBlue font-weight-bold">
              Edit
            </v-btn>
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
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "EditStudents",
    components: {},
    data() {
      return {};
    },
    methods: {
      closeEditStudentsDialog() {
        this.$emit("closeEditStudentsDialogEvent", false);
      },
    },
  };
</script>

<style></style>
