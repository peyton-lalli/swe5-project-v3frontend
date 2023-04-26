<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-4">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-compact-disc"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2"
            >Missing Information Request</v-card-title
          >
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>

    <v-card-text class="pa-2 pb-4">
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <v-card-text
                class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
                Type of Information
              </v-card-text>
              <v-select
                class="font-weight-semi-bold text-darkBlue"
                :items="this.types"
                v-model="this.typeOfInformation"></v-select>
            </v-col>
          </v-row>
          <v-row v-if="this.typeOfInformation === 'Composer'">
            <v-col>
              <v-card-text
                class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
                Composer Name
              </v-card-text>
              <v-text-field> </v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="this.typeOfInformation === 'Composer'">
            <v-col>
              <v-card-text
                class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
                Composer Birth Date
              </v-card-text>
              <v-text-field type="date"></v-text-field>
            </v-col>
            <v-col>
              <v-card-text
                class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
                Composer Death Date
              </v-card-text>
              <v-text-field type="date"></v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="this.typeOfInformation === 'Instrument'">
            <v-col>
              <v-card-text
                class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
                Instrument Name
              </v-card-text>
              <v-text-field> </v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="this.typeOfInformation === 'Instrument'">
            <v-col>
              <v-card-text
                class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
                Instrument Type
              </v-card-text>
              <v-select
                class="font-weight-semi-bold text-darkBlue"
                :items="this.typeOfInstrument"
                v-model="this.instrumentType"></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="ml-auto pa-0 pr-1">
      <v-btn
        elevation="0"
        class="text-none buttonCancel ml-auto text-white font-weight-bold buttonBorder"
        @click="closeDialog()">
        Cancel
      </v-btn>
      <v-btn
        elevation="0"
        class="text-none buttonGradient ml-3 text-white font-weight-bold buttonBorder"
        @click="closeAndSendDialog()">
        Request
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "MissingInformation",
    components: {},
    data() {
      return {
        createDialog: false,
        typeOfInformation: "Composer",
        types: ["Composer", "Instrument"],
        typeOfInstrument: ["Instrument", "Vocal"],
        instrumentType: "",
      };
    },
    methods: {
      closeDialog() {
        this.$emit("closeCourseDialogEvent", false);
      },

      closeCreateDialog(val) {
        this.createDialog = val;
      },
    },
  };
</script>
