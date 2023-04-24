<template>
  <v-card>
    <v-row>
      <v-col
        ><v-card-title class="text-darkBlue font-weight-bold"
          >Missing Information Request</v-card-title
        ></v-col
      >
      <v-col class="text-right">
        <v-btn elevation="0" @click="closeDialog()">
          <v-icon>
            <font-awesome-icon
              icon="a-solid fa-circle-xmark"
              class="text-lightBlue">
            </font-awesome-icon>
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-card-subtitle class="font-weight-bold ml-2">
      Type of Information
    </v-card-subtitle>
    <v-card-text>
      <v-select
        class="lighterBlur font-weight-semi-bold text-darkBlue"
        :items="this.types"
        v-model="this.typeOfInformation"></v-select>
    </v-card-text>
    <v-card-text class="pa-2" v-if="this.typeOfInformation === 'Composer'">
      <v-card-subtitle class="font-weight-bold">
        Composer Name
      </v-card-subtitle>
      <v-card-text>
        <v-text-field> </v-text-field>
      </v-card-text>
      <v-row>
        <v-col
          ><v-card-subtitle class="font-weight-bold"
            >Composer Birthday</v-card-subtitle
          >
          <v-card-text><v-text-field type="date"></v-text-field></v-card-text
        ></v-col>
        <v-col
          ><v-card-subtitle class="font-weight-bold">
            Composer Death Date</v-card-subtitle
          >
          <v-card-text><v-text-field type="date"></v-text-field></v-card-text>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="pa-2" v-if="this.typeOfInformation === 'Instrument'">
      <v-card-subtitle class="font-weight-bold">
        Instrument Name
      </v-card-subtitle>
      <v-card-text>
        <v-text-field> </v-text-field>
      </v-card-text>
      <v-card-subtitle class="font-weight-bold">
        Type of Instrument
      </v-card-subtitle>
      <v-card-text>
        <v-select
          class="lighterBlur font-weight-semi-bold text-darkBlue"
          :items="this.typeOfInstrument"
          v-model="this.instrumentType"></v-select>
      </v-card-text>
    </v-card-text>
    <v-card-actions class="mx-auto font-weight-bold">
      <v-btn @click="closeDialog()" color="darkBlue">Request</v-btn>
      <v-btn @click="closeDialog()" color="red">Cancel</v-btn>
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
