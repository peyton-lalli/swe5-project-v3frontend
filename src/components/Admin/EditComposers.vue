<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-6">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-user"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2">
            Edit Composers
          </v-card-title>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-4">
      <v-row class="pa-0">
        <v-col class="pa-0">
          <v-row>
            <v-col class="pt-0">
              <v-card-text
                class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
                Name
              </v-card-text>
              <v-text-field v-model="this.name"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-3">
            <v-col>
              <v-card-text
                class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
                Birth Date
              </v-card-text>
              <v-text-field type="date" v-model="this.birthDate"></v-text-field>
            </v-col>
            <v-col class="pl-6">
              <v-card-text
                class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
                Death Date
              </v-card-text>
              <v-text-field type="date" v-model="this.deathDate"></v-text-field>
            </v-col>
          </v-row>
          <v-card-text class="text-center pt-0 mt-0">
            <v-btn
              elevation="0"
              class="buttonGradient text-white font-weight-bold"
              @click="addComposer()">
              Add New
            </v-btn>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row class="pa-0">
        <v-col class="pa-0">
          <v-text-field
            class=""
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
            class="overflow-y-auto lightCardBorder pa-4 pb-0 my-4"
            max-height="400px"
            min-height="400px">
            <v-card
              elevation="0"
              class="repertoireItemGradient fullBorderCurve pa-1 mb-4 pr-2"
              v-for="composers of this.filteredList()">
              <v-row>
                <v-col cols="1" align-self="center" class="pl-4">
                  <v-avatar class="bg-darkBlue">
                    <v-img
                      :src="composers.picture ? composers.picture : ''"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="8" align-self="center">
                  <v-card-title class="pb-0 font-weight-bold">
                    {{ composers.name }}
                  </v-card-title>
                  <v-card-subtitle
                    class="text-darkBlue font-weight-medium pb-2">
                    {{ composers.birthyear }} - {{ composers.deathyear }}
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
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import ComposersDataService from "../../services/composers.js";
  import { ref } from "vue";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "EditComposers",
    components: {},
    data() {
      return {
        name: "",
        birthDate: "",
        deathDate: "",
        composers: [],
        input: ref(""),
      };
    },
    async mounted() {
      await this.getComposersList();
    },
    computed: {
      ...mapStores(useUserStore),
    },
    methods: {
      filteredList() {
        return this.composers.filter((composer) =>
          composer.name.toLowerCase().includes(this.input.toLowerCase())
        );
      },
      async addComposer() {
        let composerData = {
          name: this.name,
          birthyear: this.birthDate,
          deathyear: this.deathDate,
        };
        let composerObject = await this.userStore.createComposer(composerData);
        this.composers.push(composerObject);
        this.name = "";
        this.birthDate = "";
        this.deathDate = "";
      },
      closeEditComposersDialog() {
        this.$emit("closeEditComposersDialogEvent");
      },
      async getComposersList() {
        await ComposersDataService.getAll()
          .then((response) => {
            this.composers = response.data.Composers;
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
  };
</script>

<style></style>
