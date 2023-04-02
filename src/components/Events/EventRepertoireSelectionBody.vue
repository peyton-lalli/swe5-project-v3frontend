<template>
  <v-card class="" rounded="lg">
    <v-card-title class="font-weight-bold text-darkBlue"
      >Select piece</v-card-title
    >
    <v-card-text class="">
      <v-row class="mx-4">
        <v-col class="px-0">
          <v-row class="mb-4">
            <v-text-field
              autofocus
              v-model="input"
              append-icon="mdi-magnify"
              placeholder="Search"
              single-line
              hide-details></v-text-field>
          </v-row>
          <v-row class="px-0 pt-0">
            <v-col class="px-0 pt-0">
              <v-sheet
                class="overflow-y-auto"
                max-height="300px"
                min-height="300px">
                <v-row v-for="piece in filteredList()" class="mx-0 px-0">
                  <v-col class="px-0 mx-0">
                    <v-card
                      flat
                      class="rounded-lg"
                      @click="setSelectedPiece(piece)"
                      :class="
                        this.selectedPiece.id === piece.id
                          ? 'selectedSong'
                          : 'unSelectedSong'
                      "
                      :key="piece">
                      <v-card-text>
                        <v-row>
                          <v-col cols="1">
                            <v-avatar class="bg-white">
                              <!-- Need to get composer API working to get image -->
                              <v-img></v-img>
                            </v-avatar>
                          </v-col>
                          <v-col cols="11" class="">
                            <v-card-subtitle
                              class="font-weight-bold"
                              :class="
                                this.selectedPiece.id === piece.id
                                  ? 'text-white'
                                  : 'text-darkGray'
                              ">
                              {{ piece.name }}
                            </v-card-subtitle>
                            <v-card-subtitle
                              class="font-weight-bold"
                              :class="
                                this.selectedPiece.id === piece.id
                                  ? 'text-lightBlue'
                                  : 'text-darkBlue'
                              ">
                              {{ piece.composer.name }}
                            </v-card-subtitle>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        rounded="lg"
        elevation="0"
        class="text-none buttonCancel ml-auto text-white font-weight-bold"
        @click="closeDialog()">
        Cancel
      </v-btn>
      <v-btn
        rounded="lg"
        elevation="0"
        class="text-none buttonGradient text-white font-weight-bold"
        @click="emitSelectedPiece()">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  import { ref } from "vue";
  import { VVirtualScroll } from "vuetify/labs/VVirtualScroll";
  export default {
    name: "EventRepertoireSelectionBody",
    data() {
      return {
        input: ref(""),
        selectedPiece: this.sentSelectedPiece,
      };
    },
    props: {
      sentSelectedPiece: {
        type: [Object],
        default() {
          return {};
        },
      },
    },
    components: {
      VVirtualScroll,
    },
    computed: {
      ...mapStores(useUserStore),
    },
    methods: {
      filteredList() {
        console.log(
          this.userStore.userRoleInfo.repertoire.filter((piece) =>
            piece.name.toLowerCase().includes(this.input.toLowerCase())
          )
        );
        return this.userStore.userRoleInfo.repertoire.filter((piece) =>
          piece.name.toLowerCase().includes(this.input.toLowerCase())
        );
      },
      setSelectedPiece(piece) {
        this.selectedPiece = piece;
      },
      emitSelectedPiece() {
        this.$emit("setSelectedPiece", this.selectedPiece);
      },
      closeDialog() {
        this.$emit("closeEventRepertoireSelection");
      },
    },
    watch: {
      sentSelectedPiece(newPiece) {
        console.log(newPiece);
        this.selectedPiece = newPiece;
      },
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
</style>
