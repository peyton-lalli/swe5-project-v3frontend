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
        placeholder="Instrument"
        :items="['Voice', 'Piano', 'Trumpet']"
        variant="solo"></v-select>
    </v-card-text>
    <v-card-subtitle class="font-weight-bold"> Piece Title </v-card-subtitle>
    <v-card-text>
      <v-text-field
        bg-color="lightBlue"
        placeholder="Piece Title"
        variant="solo"
        class="text-mediumBlue">
      </v-text-field>
    </v-card-text>
    <v-card-subtitle class="font-weight-bold"> Composer </v-card-subtitle>
    <v-card-text>
      <v-select
        bg-color="lightBlue"
        class="text-blue"
        placeholder="Start typing for suggestions"
        :items="['Beethoven', 'Bach', 'Tchaikovsky']"
        variant="solo"></v-select>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col
          ><v-checkbox class="font-weight-bold" label="Foreign"></v-checkbox
        ></v-col>
        <!-- Opens missing information pop-up-->
        <v-col class="text-right">
          <v-btn
            @click="createDialog = true"
            elevation="0"
            class="text-lightBlue mt-16">
            Missing some information? Request it here.
          </v-btn>
          <v-dialog v-model="createDialog" persistent max-width="600px">
            <MissingInformation
              @closeCourseDialogEvent="closeCreateDialog"></MissingInformation>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-subtitle> Translation </v-card-subtitle>
    <v-card-text>
      <v-text-field
        bg-color="lightBlue"
        placeholder="Translation"
        variant="solo"
        color="mediumBlue">
      </v-text-field>
    </v-card-text>
    <v-card-actions class="mx-auto font-weight-bold">
      <v-btn @click="closeDialog()" color="darkBlue">Add</v-btn>
      <v-btn @click="closeDialog()" color="red">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import MissingInformation from "../MissingInformation.vue";
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
        createDialog: false,
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
