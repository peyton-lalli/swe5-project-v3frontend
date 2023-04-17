<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">Send Email</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeSendEmailDialog()">
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
      <v-row class="pb-4">
        <v-col cols="9">
          <v-card-subtitle class="font-weight-bold">
            Select a group
          </v-card-subtitle>
          <v-select
            :items="[
              'Vocal Students',
              'Band Students',
              'Faculty',
              'Administrators',
            ]"
            class="lighterBlur font-weight-semi-bold text-darkBlue"
            multiple></v-select>
        </v-col>
        <v-col cols="3" class="pl-7 pt-8">
          <v-btn
            elevation="0"
            class="buttonGradient text-white font-weight-bold">
            Add New
          </v-btn>
        </v-col>
      </v-row>
      <v-card-subtitle class="font-weight-bold">
        Write your message
      </v-card-subtitle>
      <v-textarea
        class="lighterBlur font-weight-semi-bold text-darkBlue"
        rows="5" />
    </v-card-text>
    <v-card-text class="text-center">
      <v-btn
        rounded="pill"
        class="buttonGradient text-white mr-3"
        @click="closeSendEmailDialog()">
        Send
      </v-btn>
      <v-btn
        rounded="pill"
        color="#DA9B9B"
        class="text-white mr-3"
        @click="closeSendEmailDialog()">
        Cancel
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "SendEmail",
    components: {},
    data() {
      return {};
    },
    methods: {
      closeSendEmailDialog() {
        this.$emit("closeSendEmailDialogEvent");
      },
    },
  };
</script>

<style></style>
