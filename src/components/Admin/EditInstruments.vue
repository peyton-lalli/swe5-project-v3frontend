<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-6">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-guitar"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2">
            Edit Instruments
          </v-card-title>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-2 pt-0 mt-2">
      <v-row class="pa-0">
        <v-col class="pa-0">
          <v-text-field
            class="mx-4"
            autofocus
            v-model="input"
            append-icon="mdi-magnify"
            placeholder="Search"
            single-line
            hide-details></v-text-field>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col class="pa-0">
          <v-sheet
            class="overflow-y-auto lightCardBorder pa-4 ma-4"
            max-height="400px"
            min-height="400px">
            <v-card
              v-for="instrument of this.filteredList()"
              elevation="0"
              class="repertoireItemGradient fullBorderCurve pa-1 mb-4 pr-2">
              <v-row>
                <v-col cols="9" align-self="center">
                  <v-card-title class="pb-0 font-weight-bold text-darkGray">
                    {{ instrument.name }}
                  </v-card-title>
                  <v-card-subtitle
                    class="text-darkBlue font-weight-medium pb-2">
                    {{ instrument.type }}
                  </v-card-subtitle>
                </v-col>
                <v-col cols="3" align-self="center" class="text-right">
                  <v-btn
                    elevation="0"
                    size="small"
                    rounded="pill"
                    class="buttonWhite text-mediumBlue font-weight-bold text-none">
                    Disable
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row class="">
        <v-col cols="4" class="pl-6 pt-0">
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
            Name
          </v-card-text>
          <v-text-field v-model="this.name"></v-text-field>
        </v-col>
        <v-col cols="4" class="pl-6 pt-0">
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
            Type
          </v-card-text>
          <v-select v-model="type" :items="this.types" return-object>
          </v-select>
        </v-col>
        <v-col align-self="end" cols="4" class="pl-15 pt-0">
          <v-btn
            elevation="0"
            class="buttonGradient text-white font-weight-bold mt-5"
            @click="addInstrument()">
            Add New
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import InstrumentDataService from "../../services/instruments.js";
  import { ref } from "vue";
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
        input: ref(""),
      };
    },
    async mounted() {
      await this.getInstrumentList();
    },
    methods: {
      filteredList() {
        return this.instruments.filter((instrument) =>
          instrument.name.toLowerCase().includes(this.input.toLowerCase())
        );
      },
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
