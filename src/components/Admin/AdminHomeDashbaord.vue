<template>
  <v-container fluid class="eventsMainGrid">
    <v-card class="studentsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue">
        <v-row>
          <v-col> Students </v-col>
          <v-col class="text-right">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient mr-3 text-white font-weight-bold">
              View All
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <StudentComponent />
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="attentionPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue">
        Events Requiring Your Attention
      </v-card-title>
      <v-card-text>
        <v-row>
          <AttentionComponent />
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="adminControlPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue">
        Admin Controls
      </v-card-title>
      <v-card-text>
        <!-- These buttons will be constant -->
        <v-dialog v-model="createEventDialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="createEventDialog = true"
              class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
              block>
              Create Events
            </v-btn>
          </template>
          <AdminCreateEvent
            @closeCreateEventDialogEvent="
              closeCreateEventDialog
            "></AdminCreateEvent>
        </v-dialog>

        <v-dialog v-model="editAdminDialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="editAdminDialog = true"
              class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
              block>
              Edit Administrators
            </v-btn>
          </template>
          <EditAdmins
            @closeEditAdminDialogEvent="closeEditAdminDialog"></EditAdmins>
        </v-dialog>

        <v-dialog v-model="editFacultyDialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="editFacultyDialog = true"
              class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
              block>
              Edit Faculty/Accompanists
            </v-btn>
          </template>
          <EditFaculty
            @closeEditFacultyDialogEvent="closeEditFacultyDialog"></EditFaculty>
        </v-dialog>

        <v-dialog v-model="editStudentsDialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="editStudentsDialog = true"
              class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
              block>
              Edit Students
            </v-btn>
          </template>
          <EditStudents
            @closeEditStudentsDialogEvent="
              closeEditStudentsDialog
            "></EditStudents>
        </v-dialog>

        <v-dialog v-model="editInstDialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="editInstDialog = true"
              class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
              block>
              Edit Instruments/Vocals
            </v-btn>
          </template>
          <EditInstruments
            @closeEditInstDialogEvent="closeEditInstDialog"></EditInstruments>
        </v-dialog>

        <v-dialog v-model="editComposersDialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="editComposersDialog = true"
              class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
              block>
              Edit Composers
            </v-btn>
          </template>
          <EditComposers
            @closeEditComposersDialogEvent="
              closeEditComposersDialog
            "></EditComposers>
        </v-dialog>

        <v-dialog v-model="sendEmailDialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="sendEmailDialog = true"
              class="eventsGradient rounded-lg text-white buttonControl lighterBlur mb-4"
              block>
              Send Email
            </v-btn>
          </template>
          <SendEmail
            @closeSendEmailDialogEvent="closeSendEmailDialog"></SendEmail>
        </v-dialog>
      </v-card-text>
    </v-card>
    <v-card class="eventsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue">
        <v-row>
          <v-col> Events </v-col>
          <v-col class="text-right">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient text-white font-weight-bold mr-2">
              Add new
            </v-btn>
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient text-white font-weight-bold">
              View All
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <AttentionComponent />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventComponent from "../Events/EventComponent.vue";
  import StudentComponent from "../Faculty/StudentComponent.vue";
  import AttentionComponent from "../Faculty/AttentionComponent.vue";
  import AdminCreateEvent from "./AdminCreateEvent.vue";
  import EditAdmins from "./EditAdmins.vue";
  import EditFaculty from "./EditFaculty.vue";
  import EditStudents from "./EditStudents.vue";
  import EditInstruments from "./EditInstruments.vue";
  import EditComposers from "./EditComposers.vue";
  import SendEmail from "./SendEmail.vue";
  export default {
    name: "AdminHomeDashboard",
    components: {
      EventComponent,
      StudentComponent,
      AttentionComponent,
      AdminCreateEvent,
      EditAdmins,
      EditFaculty,
      EditStudents,
      EditInstruments,
      EditComposers,
      SendEmail,
    },
    data() {
      return {
        createEventDialog: false,
        editAdminDialog: false,
        editFacultyDialog: false,
        editStudentsDialog: false,
        editInstDialog: false,
        editComposersDialog: false,
        sendEmailDialog: false,
      };
    },
    methods: {
      closeCreateEventDialog(val) {
        this.createEventDialog = val;
      },
      closeEditAdminDialog(val) {
        this.editAdminDialog = val;
      },
      closeEditFacultyDialog(val) {
        this.editFacultyDialog = val;
      },
      closeEditStudentsDialog(val) {
        this.editStudentsDialog = val;
      },
      closeEditInstDialog(val) {
        this.editInstDialog = val;
      },
      closeEditComposersDialog(val) {
        this.editComposersDialog = val;
      },
      closeSendEmailDialog(val) {
        this.sendEmailDialog = val;
      },
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
  .eventsMainGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "studentsPane attentionPane"
      "adminControlPane eventsPane";
    grid-gap: 1.5rem;
    padding-left: 0;
  }
  .facultyHomeMainGrid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(auto, 1fr), minmax(auto, 1fr);
    grid-template-areas:
      "studentAttentionPane"
      "eventsPane";
    grid-gap: 1.5rem;
    padding-left: 0;
  }
  .facultyHomeTopGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(auto, 1fr);
    grid-template-areas: "studentsPane attentionPane";
    grid-gap: 1.5rem;
  }
  .attentionPane {
    grid-area: attentionPane;
  }
  .studentAttentionPane {
    grid-area: studentAttentionPane;
  }

  .eventsPane {
    grid-area: eventsPane;
  }

  .studentsPane {
    grid-area: studentsPane;
  }
  .adminControlPane {
    grid-area: adminControlPane;
  }
</style>
