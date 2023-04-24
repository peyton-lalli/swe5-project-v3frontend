<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">Edit Composers</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeEditComposersDialog()">
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
      <v-row>
        <v-text-field
          class="ml-6 mr-6"
          autofocus
          v-model="input"
          append-icon="mdi-magnify"
          placeholder="Search"
          single-line
          hide-details></v-text-field>
      </v-row>
      <v-row>
        <v-col>
          <v-card-subtitle class="font-weight-bold ml-3 pl-0">
            Name
          </v-card-subtitle>
          <v-text-field v-model="this.name" class="mr-3 ml-3"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-3">
        <v-col class="pl-6">
          <v-card-subtitle class="font-weight-bold pr-13 pl-0">
            Birth Date
          </v-card-subtitle>
          <v-text-field type="date" v-model="this.birthDate"></v-text-field>
        </v-col>
        <v-col class="pl-6">
          <v-card-subtitle class="font-weight-bold pl-0">
            Death Date
          </v-card-subtitle>
          <v-text-field
            type="date"
            v-model="this.deathDate"
            class="mr-3"></v-text-field>
        </v-col>
      </v-row>
      <v-card-text class="text-center">
        <v-btn
          elevation="0"
          class="buttonGradient text-white font-weight-bold"
          @click="addComposer()">
          Add New
        </v-btn>
      </v-card-text>
      <v-card
        class="repertoireItemGradient fullBorderCurve mainblur ml-3 mr-3 pl-4 pr-4 mb-2 pt-3 pb-3"
        v-for="composers of this.filteredList()">
        <v-row>
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="8" align-self="center">
            <v-card-title class="pb-0 font-weight-bold">
              {{ composers.name }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
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
