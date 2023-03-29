<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">Edit Faculty</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeEditFacultyDialog()">
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
      <v-card
        class="repertoireItemGradient fullBorderCurve mainblur ml-3 mr-3 pl-4 pr-4 mb-2">
        <v-row>
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="8" align-self="center">
            <v-card-title class="pb-0 font-weight-bold"> Name </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              Email?
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
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "EditFaculty",
    components: {},
    data() {
      return {};
    },
    methods: {
      closeEditFacultyDialog() {
        this.$emit("closeEditFacultyDialogEvent");
      },
    },
  };
</script>

<style></style>
