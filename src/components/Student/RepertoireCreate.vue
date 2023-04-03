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
    <v-card-subtitle class="font-weight-bold"> Instrument </v-card-subtitle>
    <v-card-text>
      <v-select
        bg-color="lightBlue"
        :items="['Voice', 'Piano', 'Trumpet']"
        variant="solo"></v-select>
    </v-card-text>
    <v-card-subtitle class="font-weight-bold"> Piece Title </v-card-subtitle>
    <v-card-text>
      <v-text-field bg-color="lightBlue" variant="solo" class="text-mediumBlue">
      </v-text-field>
    </v-card-text>
    <v-card-subtitle class="font-weight-bold"> Composer </v-card-subtitle>
    <v-card-text>
      <v-select
        bg-color="lightBlue"
        class="text-blue"
        :items="this.composerList"
        variant="solo"></v-select>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="6"
          ><v-checkbox
            class="font-weight-bold"
            label="Foreign"
            v-model="foreign"></v-checkbox
        ></v-col>
        <!-- Opens missing information pop-up-->
        <v-col v-if="foreign">
          <v-card-subtitle class="font-weight-bold"> Language </v-card-subtitle>
          <v-text-field
            bg-color="lightBlue"
            variant="solo"
            class="text-mediumBlue"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-subtitle> Translation </v-card-subtitle>
    <v-card-text>
      <v-textarea bg-color="lightBlue" variant="solo" color="mediumBlue">
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
      <v-btn @click="closeDialog()" color="darkBlue">Add</v-btn>
      <v-btn @click="closeDialog()" color="red">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import MissingInformation from "../MissingInformation.vue";
  import ComposerDataService from "../../services/composers.js";
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
        composers: [],
        createDialog: false,
        foreign: false,
      };
    },
    computed: {
      composers: ComposerDataService.getAll(),
      composerList: this.getNamesForComposers(composers),
    },
    methods: {
      closeDialog() {
        this.$emit("closeCourseDialogEvent", false);
      },

      closeCreateDialog(val) {
        this.createDialog = val;
      },

      getNamesForComposers(composers) {
        let composerList = [];
        for (let composer of composers) {
          composerList.push(composer.name);
        }
        return composerList;
      },
    },
  };
</script>
