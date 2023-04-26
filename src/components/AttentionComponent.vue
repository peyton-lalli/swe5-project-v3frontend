<template>
  <v-container fluid class="eventComponent pb-5 px-0">
    <v-row>
      <v-col>
        <v-card class="eventsGradient fullBorderCurve mainBlur">
          <v-card class="ma-3 fullBorderCurve" elevation="0">
            <v-card-title class="font-weight-bold text-black">
              <v-row>
                <v-col class="pb-0">{{ eventData.title }} </v-col>
                <v-col class="text-right">
                  <v-btn
                    @click="editEventDialog = true"
                    elevation="0"
                    size="small"
                    rounded="pill"
                    class="buttonGradient text-white font-weight-bold mr-2 text-none"
                    v-if="this.userStore.userInfo.roles.default.roleId === 3">
                    Edit
                  </v-btn>
                  <v-dialog
                    persistent
                    v-model="editEventDialog"
                    max-width="600px">
                    <AdminEditEvent
                      :eventData="this.eventData"
                      @closeEditEventDialogEvent="
                        this.editEventDialog = false
                      "></AdminEditEvent>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle class="font-weight-bold text-darkBlue">
              {{ formatDate(eventData.date) }}
            </v-card-subtitle>
            <v-card-subtitle class="font-weight-bold text-darkBlue pb-1">
              {{ createTimesInfoString(eventData.times) }}
            </v-card-subtitle>
          </v-card>
          <v-card-actions class="pt-0">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonWhite text-mediumBlue font-weight-bold ml-1 text-none"
              @click="viewSignUpsDialog = true"
              v-if="this.userStore.userInfo.roles.default.roleId === 3">
              View Signups
            </v-btn>
            <v-dialog v-model="viewSignUpsDialog" max-width="1000px">
              <ViewSignUps
                :eventData="this.eventData"
                @closeViewSignUpsDialogEvent="
                  closeViewSignUpsDialog
                "></ViewSignUps>
            </v-dialog>
            <v-btn
              @click="critiqueDialog = true"
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonWhite text-mediumBlue font-weight-bold text-none"
              v-if="this.userStore.userInfo.roles.default.roleId === 2">
              Critiques
            </v-btn>
            <v-dialog v-model="critiqueDialog" max-width="1000px">
              <CritiqueListComponent
                :currentEvent="this.eventData"
                @closeCritiqueDialogEvent="
                  closeCritiqueDialog
                "></CritiqueListComponent>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CritiqueListComponent from "./Faculty/CritiqueListComponent.vue";
  import ViewSignUps from "./Faculty/ViewSignUps.vue";
  import AdminEditEvent from "./Admin/AdminEditEvent.vue";
  import { useUserStore } from "../stores/UserStore.js";
  import { useEventsStore } from "../stores/EventsStore.js";
  import { mapStores } from "pinia";
  import { DateTimeMixin } from "../mixins/DateTimeMixin.js";
  export default {
    name: "AttentionComponent",
    components: {
      CritiqueListComponent,
      ViewSignUps,
      AdminEditEvent,
    },
    data() {
      return {
        viewSignUpsDialog: false,
        critiqueDialog: false,
        editEventDialog: false,
      };
    },
    mixins: [DateTimeMixin],
    props: {
      eventData: {},
    },
    methods: {
      closeCritiqueDialog(val) {
        this.critiqueDialog = val;
      },
      closeViewSignUpsDialog(val) {
        this.viewSignUpsDialog = val;
      },
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .outlined.v-btn {
    background: linear-gradient(white, white) padding-box,
      linear-gradient(to right, #aabed2, #ddeaf6) border-box;
    border-radius: 50em;
    border: 4px solid transparent;
  }
  .outlined.v-card {
    background: linear-gradient(white, white) padding-box,
      linear-gradient(to right, #aabed2, #ddeaf6) border-box;
    border-radius: 10px;
    border: 7px solid transparent;
  }
</style>
