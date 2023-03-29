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
      <v-row>
        <v-col cols="8">
          <v-select
            :items="[
              'Vocal Students',
              'Band Students',
              'Faculty',
              'Administrators',
            ]"
            label="Select Groups"
            variant="solo"
            color="white"
            multiple></v-select>
        </v-col>
        <v-col cols="4" class="pl-11 pt-4">
          <v-btn
            elevation="0"
            size="large"
            class="buttonGradient text-white font-weight-bold">
            Add New
          </v-btn>
        </v-col>
      </v-row>
      <v-textarea variant="solo" rows="5" label="Write Message" />
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
