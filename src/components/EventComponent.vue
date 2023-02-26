<template>
  <v-container fluid class="eventComponent">
    <v-card elevation="0" class="eventsGradient mainblur rounded-lg">
      <v-card elevation="0" class="ma-3 rounded-lg lighterBlur">
        <v-card-title class="font-weight-bold text-h5 text-darkGray pb-0">
          <v-row>
            <v-col>
              {{ title }}
            </v-col>
            <v-col class="text-right">
              <v-dialog v-model="editDialog" persistent max-width="1000px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    rounded="pill"
                    size="small"
                    class="buttonGradient text-white font-weight-bold"
                    @click="editDialog = true"
                    v-bind="attrs"
                    v-on="on">
                    Edit
                  </v-btn>
                </template>
                <EventItem @closeEventDialogEvent="closeEventDialog">
                </EventItem>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-subtitle class="font-weight-semi-bold text-darkBlue pt-0">
          {{ date }}
        </v-card-subtitle>
        <v-card-subtitle class="font-weight-semi-bold text-darkBlue pt-0">
          {{ time }}
        </v-card-subtitle>
        <v-card-subtitle class="font-weight-medium text-mediumBlue pt-0">
          {{ place }}
        </v-card-subtitle>

        <v-row justify="center" class="pl-5">
          <v-col cols="2" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="10" align-self="center">
            <v-card-title class="pb-0 font-weight-bold">
              {{ instructors.at(0).type }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              {{ instructors.at(0).person }}
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row justify="center" class="pl-5 mt-0 mb-1">
          <v-col cols="2" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="10" align-self="center">
            <v-card-title class="pb-0 font-weight-bold">
              {{ instructors.at(1).type }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              {{ instructors.at(1).person }}
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
      <v-card-subtitle class="ml-2 text-h6 text-white font-weight-bold">
        Musical Selection
      </v-card-subtitle>
      <v-card-text class="pt-0">
        <v-row justify="center" class="pl-5 mt-0">
          <v-col cols="2" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="10" align-self="center">
            <v-card-title class="pb-0 font-weight-bold">
              {{ songs.at(0).name }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              {{ songs.at(0).person }}
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventItem from "./EventItem.vue";
  export default {
    name: "EventComponent",
    components: {
      EventItem,
    },
    data() {
      return {
        editDialog: false,
        title: "Recital Hearing",
        date: "02/01/2023",
        time: "3:30 PM",
        place: "Adams Recital Hall",
        instructors: [
          {
            type: "Private Instructor",
            person: "Jane Doe",
          },
          {
            type: "Accompanist",
            person: "Jess Doe",
          },
        ],
        songs: [
          {
            name: "Bird Upon The Tree",
            person: "Blitzstein, Marc",
          },
        ],
      };
    },
    methods: {
      closeEventDialog(val) {
        this.editDialog = val;
      },
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
</style>
