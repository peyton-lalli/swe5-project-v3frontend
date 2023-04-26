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
            >Add to Repertoire</v-card-title
          >
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-4 pt-0">
      <v-row class="pa-0">
        <v-col class="pa-0 pb-4">
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
            Instrument
          </v-card-text>
          <v-select
            :items="instruments"
            item-title="name"
            item-value="id"
            class="lighterBlur font-weight-semi-bold text-darkBlue"
            v-model="selectedInstrument"
            return-object>
          </v-select>
        </v-col>
      </v-row>

      <v-row class="pa-0">
        <v-col class="pa-0 pb-4">
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
            Piece Title
          </v-card-text>
          <v-text-field
            class="lighterBlur font-weight-semi-bold text-darkBlue"
            v-model="this.titlePiece">
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="pa-0">
        <v-col class="pa-0 pb-4">
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
            Composer
          </v-card-text>
          <v-select
            :items="composers"
            item-title="name"
            item-value="id"
            class="lighterBlur font-weight-semi-bold text-darkBlue"
            v-model="selectedComposer"
            return-object>
          </v-select>
        </v-col>
      </v-row>

      <v-row class="pa-0">
        <v-col class="pa-0 pb-4">
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
            Lyrics
          </v-card-text>
          <v-textarea
            class="lighterBlur font-weight-semi-bold text-darkBlue"
            v-model="this.lyrics">
          </v-textarea>
        </v-col>
      </v-row>

      <v-row class="pa-0">
        <v-col class="pa-0 pb-4">
          <v-checkbox
            class="font-weight-bold"
            label="Foreign"
            v-model="showTranslation"></v-checkbox>
        </v-col>
        <v-col v-if="showTranslation" align-self="start">
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
            Language
          </v-card-text>

          <v-text-field
            class="lighterBlur font-weight-semi-bold text-darkBlue"
            v-model="this.language">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="showTranslation">
        <v-col class="pa-0 pb-4">
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
            Translation
          </v-card-text>
          <v-textarea
            class="lighterBlur font-weight-semi-bold text-darkBlue"
            v-model="this.translation">
          </v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pa-0 pb-4 text-center">
          <v-btn
            @click="createDialog = true"
            elevation="0"
            class="buttonGradient text-white font-weight-semi-bold">
            Missing some information? Request it here.
          </v-btn>
          <v-dialog v-model="createDialog" persistent max-width="600px">
            <MissingInformation
              @closeCourseDialogEvent="closeCreateDialog"></MissingInformation>
          </v-dialog>
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
        @click="closeAndAddDialog()">
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import MissingInformation from "../MissingInformation.vue";
  import ComposersDataService from "../../services/composers.js";
  import InstrumentsDataService from "../../services/instruments.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "RepertoireCreate",
    components: {
      MissingInformation,
    },
    data() {
      return {
        songs: [
          {
            name: "Bird Upon The Tree",
            person: "Blitzstein, Marc",
          },
        ],
        composers: [{}],
        instruments: [{}],
        selectedComposer: "",
        selectedInstrument: "",
        lyrics: "",
        translation: "",
        titlePiece: "",
        language: "",
        createDialog: false,
        showTranslation: false,
      };
    },
    methods: {
      closeDialog() {
        this.$emit("closeCourseDialogEvent", false);
      },
      closeAndAddDialog() {
        let studentInstrumentId =
          this.userStore.userRoleInfo.instruments.filter(
            (i) => i.instrumentId === this.selectedInstrument.id
          )[0].studentinstrumentId;

        let repertoireId = this.userStore.userRoleInfo.repertoires.filter(
          (r) => r.studentinstrumentId === studentInstrumentId
        )[0].repertoireId;
        if (!this.showTranslation) {
          this.language = "English";
        }
        let data = {
          repertoireId: repertoireId,
          name: this.titlePiece,
          composerId: this.selectedComposer.id,
          lyrics: this.lyrics,
          translation: this.translation,
          language: this.language,
        };
        this.userStore.createPiece(data);
        this.$emit("closeCourseDialogEvent", false);
      },
      closeCreateDialog(val) {
        this.createDialog = val;
      },
      async getInstruments() {
        let data = [];
        await InstrumentsDataService.getAll()
          .then((response) => {
            data = response.data.Instruments;
          })
          .catch((e) => {
            console.log(e);
          });
        return data;
      },
      async getComposers() {
        let data = [];
        await ComposersDataService.getAll()
          .then((response) => {
            data = response.data.Composers;
          })
          .catch((e) => {
            console.log(e);
          });

        return data;
      },
    },
    computed: {
      ...mapStores(useUserStore),
    },
    async mounted() {
      this.composers = await this.getComposers();
      this.instruments = await this.getInstruments();
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .v-text-field {
    border-radius: 100px;
  }
  .checkbox-noGradient {
    background-color: white !important;
  }
</style>
