<template>
  <v-container fluid class="adminMainGrid">
    <v-container fluid class="eventsRepPane adminHomeLeftGrid noPadMarg">
      <v-card class="eventsPane mainBlur rounded-lg">
        <v-card-title class="font-weight-bold text-darkBlue">
          <v-row>
            <v-col> Events </v-col>
            <v-col class="text-right">
              <v-btn
                @click="createEventDialog = true"
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient text-white font-weight-bold mr-2">
                Add new
              </v-btn>
              <v-btn
                @click="viewAllEvents = true"
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient text-white font-weight-bold">
                View All
              </v-btn>
              <v-dialog v-model="viewAllEvents" max-width="800px">
                <ViewAllEvents
                  :eventsData="this.eventsStore.events"
                  @closeViewAllEventsDialogEvent="
                    this.viewAllEvents = false
                  "></ViewAllEvents>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row v-for="event in this.eventsStore.events">
            <AttentionComponent :eventData="event" />
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="attentionPane mainBlur rounded-lg">
        <v-card-title class="font-weight-bold text-darkBlue">
          Alerts Requiring Your Attention
        </v-card-title>
        <v-card-text>
          <v-row> </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <v-card class="adminControlPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue">
        Admin Controls
      </v-card-title>
      <v-card-text>
        <!-- These buttons will be constant -->
        <v-btn
          @click="createEventDialog = true"
          class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
          block>
          Create Events
        </v-btn>
        <v-dialog v-model="createEventDialog" max-width="600px">
          <AdminCreateEvent
            @closeCreateEventDialogEvent="
              this.createEventDialog = false
            "></AdminCreateEvent>
        </v-dialog>
        <v-btn
          @click="editUsersDialog = true"
          class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
          block>
          Edit Users
        </v-btn>
        <v-dialog v-model="editUsersDialog" max-width="1000px">
          <EditUsers
            @closeEditUsersDialogEvent="
              this.editUsersDialog = false
            "></EditUsers>
        </v-dialog>
        <v-btn
          @click="editInstDialog = true"
          class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
          block>
          Edit Instruments/Vocals
        </v-btn>
        <v-dialog v-model="editInstDialog" max-width="600px">
          <EditInstruments
            @closeEditInstDialogEvent="
              this.editInstDialog = false
            "></EditInstruments>
        </v-dialog>
        <v-btn
          @click="editComposersDialog = true"
          class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
          block>
          Edit Composers
        </v-btn>
        <v-dialog v-model="editComposersDialog" max-width="600px">
          <EditComposers
            @closeEditComposersDialogEvent="
              this.editComposersDialog = false
            "></EditComposers>
        </v-dialog>
        <v-btn
          @click="sendEmailDialog = true"
          class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
          block>
          Send Email
        </v-btn>
        <v-dialog v-model="sendEmailDialog" max-width="600px">
          <SendEmail
            @closeSendEmailDialogEvent="
              this.sendEmailDialog = false
            "></SendEmail>
        </v-dialog>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventComponent from "../Events/EventComponent.vue";
  import StudentComponent from "../StudentComponent.vue";
  import AttentionComponent from "../AttentionComponent.vue";
  import AdminCreateEvent from "./AdminCreateEvent.vue";
  import EditUsers from "./EditUsers.vue";
  import EditInstruments from "./EditInstruments.vue";
  import EditComposers from "./EditComposers.vue";
  import SendEmail from "./SendEmail.vue";
  import ViewAllEvents from "./ViewAllEvents.vue";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "AdminHomeDashboard",
    components: {
      EventComponent,
      StudentComponent,
      AttentionComponent,
      AdminCreateEvent,
      EditUsers,
      EditInstruments,
      EditComposers,
      SendEmail,
      ViewAllEvents,
    },
    data() {
      return {
        createEventDialog: false,
        editUsersDialog: false,
        editInstDialog: false,
        editComposersDialog: false,
        sendEmailDialog: false,
        viewAllEvents: false,
      };
    },
    methods: {},
    computed: {
      ...mapStores(useEventsStore),
    },
  };
</script>

<style scoped>
  .noPadMarg {
    padding: 0 !important;
    margin: 0 !important;
  }
  .buttonControl {
    justify-content: left !important;
  }
  .adminMainGrid {
    display: grid;
    grid-template-columns: 4fr 3fr;
    grid-template-rows: minmax(auto, 1fr);
    grid-template-areas: "eventsRepPane adminControlPane";
    grid-gap: 1.5rem;
    padding-left: 0;
  }

  .adminHomeLeftGrid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(auto, 1fr), minmax(auto, 1fr);
    grid-template-areas:
      "eventsPane"
      "attentionPane";
    grid-gap: 1.5rem;
  }

  .attentionPane {
    grid-area: attentionPane;
  }

  .eventsPane {
    grid-area: eventsPane;
  }

  .eventsRepPane {
    grid-area: eventsRepPane;
  }
  .adminControlPane {
    grid-area: adminControlPane;
  }
</style>
