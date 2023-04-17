<template>
  <v-card>
    <v-row>
      <v-col
        ><v-card-title class="text-darkBlue font-weight-bold"
          >Add to Repertoire</v-card-title
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
      Instrument
    </v-card-subtitle>
    <v-card-text>
      <v-select
        :items="instruments"
        item-title="name"
        item-value="id"
        class="lighterBlur font-weight-semi-bold text-darkBlue"
        v-model="selectedInstrument"
        return-object>
      </v-select>
    </v-card-text>
    <v-card-subtitle class="font-weight-bold ml-2">
      Piece Title
    </v-card-subtitle>
    <v-card-text>
      <v-text-field
        class="lighterBlur font-weight-semi-bold text-darkBlue"
        v-model="this.titlePiece">
      </v-text-field>
    </v-card-text>
    <v-card-subtitle class="font-weight-bold ml-2"> Composer </v-card-subtitle>
    <v-card-text>
      <v-select
        :items="composers"
        item-title="name"
        item-value="id"
        class="lighterBlur font-weight-semi-bold text-darkBlue"
        v-model="selectedComposer"
        return-object>
      </v-select>
    </v-card-text>
    <v-card-subtitle class="font-weight-bold ml-2"> Lyrics </v-card-subtitle>
    <v-card-text>
      <v-textarea
        class="lighterBlur font-weight-semi-bold text-darkBlue"
        v-model="this.lyrics">
      </v-textarea>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col>
          <v-checkbox
            class="font-weight-bold checkbox-noGradient"
            label="Foreign"
            v-model="showTranslation"></v-checkbox>
        </v-col>
        <v-col v-if="showTranslation">
          <v-card-subtitle class="font-weight-bold mb-3" v-if="showTranslation">
            Language
          </v-card-subtitle>
          <v-text-field
            class="lighterBlur font-weight-semi-bold text-darkBlue ml-3"
            v-model="this.language">
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-subtitle class="font-weight-bold ml-2" v-if="showTranslation">
      Translation
    </v-card-subtitle>
    <v-card-text v-if="showTranslation">
      <v-textarea
        class="lighterBlur font-weight-semi-bold text-darkBlue"
        v-model="this.translation">
      </v-textarea>
    </v-card-text>
    <v-btn @click="createDialog = true" elevation="0" class="text-darkBlue">
      Missing some information? Request it here.
    </v-btn>
    <v-dialog v-model="createDialog" persistent max-width="600px">
      <MissingInformation
        @closeCourseDialogEvent="closeCreateDialog"></MissingInformation>
    </v-dialog>
    <v-card-actions class="mx-auto font-weight-bold">
      <v-btn @click="closeAndAddDialog()" color="darkBlue">Save</v-btn>
      <v-btn @click="deletePiece()" color="red">Delete</v-btn>
      <v-btn @click="closeDialog()" color="red">Cancel</v-btn>
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
    name: "RepertoireEdit",
    components: {
      MissingInformation,
    },
    props: {
      pieces: {},
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
        this.$emit("closeEditRepertoireDialogEvent", false);
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
        this.userStore.editPiece(data, this.pieces.pieceId);
        this.$emit("closeEditRepertoireDialogEvent", false);
      },
      deletePiece() {
        this.userStore.deletePiece(
          this.pieces.pieceId,
          this.pieces.repertoireId
        );
        this.$emit("closeEditRepertoireDialogEvent", false);
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
      this.selectedComposer = {
        id: this.pieces.composer.composerId,
        name: this.pieces.composer.name,
      };
      let instrumentId = await this.userStore.userRoleInfo.repertoires.filter(
        (r) => r.repertoireId === this.pieces.repertoireId
      )[0].studentinstrumentId;
      let instrumentName = await this.userStore.userRoleInfo.instruments.filter(
        (i) => i.instrumentId === instrumentId
      )[0].name;
      this.selectedInstrument = {
        name: instrumentName,
        id: instrumentId,
      };
      this.lyrics = this.pieces.lyrics;
      this.translation = this.pieces.translation;
      this.titlePiece = this.pieces.name;
      if (this.pieces.language !== "English") {
        this.language = this.pieces.language;
        this.showTranslation = true;
      }
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
