<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">Edit Instruments</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeEditInstDialog()">
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
      <v-row class="mb-3">
        <v-col cols="4" class="pl-6">
          <v-card-subtitle class="font-weight-bold pr-13">
            Name
          </v-card-subtitle>
          <v-text-field v-model="this.name"></v-text-field>
        </v-col>
        <v-col cols="4" class="pl-6">
          <v-card-subtitle class="font-weight-bold"> Type </v-card-subtitle>
          <v-select
            class="lighterBlur font-weight-semi-bold text-darkBlue"
            v-model="type"
            :items="this.types"
            return-object>
          </v-select>
        </v-col>
        <v-col cols="4" class="pl-15">
          <v-btn
            elevation="0"
            class="buttonGradient text-white font-weight-bold mt-5"
            @click="addInstrument()">
            Add New
          </v-btn>
        </v-col>
      </v-row>
      <v-card
        v-for="instrument of this.instruments"
        class="repertoireItemGradient fullBorderCurve mainblur ml-3 mr-3 pl-4 pr-4 mb-2">
        <v-row>
          <v-col cols="9" align-self="center">
            <v-card-title class="pb-0 font-weight-bold">
              {{ instrument.name }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              {{ instrument.type }}
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
  import InstrumentDataService from "../../services/instruments.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "EditInstruments",
    components: {},
    data() {
      return {
        instruments: [],
        name: "",
        type: "",
        types: ["Vocal", "Instrument"],
      };
    },
    async mounted() {
      await this.getInstrumentList();
    },
    methods: {
      async addInstrument() {
        let instrumentData = {
          name: this.name,
          type: this.type,
        };
        let instrumentObject = await this.userStore.createIntrument(
          instrumentData
        );
        this.instruments.push(instrumentObject);
        this.name = "";
        this.type = "";
      },
      async getInstrumentList() {
        await InstrumentDataService.getAll()
          .then((response) => {
            this.instruments = response.data.Instruments;
          })
          .catch((e) => {
            console.log(e);
          });
      },
      closeEditInstDialog() {
        this.$emit("closeEditInstDialogEvent");
      },
    },
    computed: {
      ...mapStores(useUserStore),
    },
  };
</script>

<style></style>
