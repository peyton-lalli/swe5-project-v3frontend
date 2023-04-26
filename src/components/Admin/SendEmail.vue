<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-6">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-envelope"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2">
            Send Email
          </v-card-title>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-2 pb-4 pt-0">
      <v-row class="pb-4">
        <v-col align-self="center" cols="9" class="pt-0">
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
            Selct a Group
          </v-card-text>
          <v-select
            :items="[
              'Vocal Students',
              'Band Students',
              'Faculty',
              'Administrators',
            ]"
            class="font-weight-semi-bold text-darkBlue"
            multiple></v-select>
        </v-col>
        <v-col align-self="end" cols="3" class="pl-7 pt-8">
          <v-btn
            elevation="0"
            class="buttonGradient text-white font-weight-bold">
            Add New
          </v-btn>
        </v-col>
      </v-row>
      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Message
      </v-card-text>
      <v-textarea class="font-weight-semi-bold text-darkBlue" rows="5" />
    </v-card-text>
    <v-card-actions class="ml-auto pa-0 pr-1">
      <v-btn
        elevation="0"
        class="text-none buttonCancel ml-auto text-white font-weight-bold buttonBorder"
        @click="closeSendEmailDialog()">
        Cancel
      </v-btn>
      <v-btn
        elevation="0"
        class="text-none buttonGradient ml-3 text-white font-weight-bold buttonBorder"
        @click="closeSendEmailDialog()">
        Save
      </v-btn>
    </v-card-actions>
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
