<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">Create Event</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeCreateEventDialog()">
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
      <v-select
        :items="['Vocal Jury', 'Instrument Jury', 'Recital Hearing']"
        variant="solo"
        color="white"
        label="Event Type"></v-select>
      <v-flex>
        <v-dialog
          ref="dialog"
          v-model="dateModal"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              readonly
              v-on="on"
              label="Date"></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dateModal = false"
              >Cancel</v-btn
            >
            <v-btn flat color="primary" @click="$refs.dialog.save(date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-row>
        <v-col>
          <v-flex xs11 sm5>
            <v-dialog
              ref="dialog"
              v-model="timeModal"
              :return-value.sync="time"
              persistent
              lazy
              full-width
              width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time"
                  readonly
                  v-on="on"
                  label="Start Time"></v-text-field>
              </template>
              <v-time-picker v-if="timeModal" v-model="time" full-width>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="timeModal = false"
                  >Cancel</v-btn
                >
                <v-btn flat color="primary" @click="$refs.dialog.save(time)"
                  >OK</v-btn
                >
              </v-time-picker>
            </v-dialog>
          </v-flex>
        </v-col>
        <v-col>
          <v-flex xs11 sm5>
            <v-dialog
              ref="dialog"
              v-model="timeModalEnd"
              :return-value.sync="timeEnd"
              persistent
              lazy
              full-width
              width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="timeEnd"
                  readonly
                  v-on="on"
                  label="End Time"></v-text-field>
              </template>
              <v-time-picker v-if="timeModalEnd" v-model="timeEnd" full-width>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="timeModalEnd = false"
                  >Cancel</v-btn
                >
                <v-btn flat color="primary" @click="$refs.dialog.save(timeEnd)"
                  >OK</v-btn
                >
              </v-time-picker>
            </v-dialog>
          </v-flex>
        </v-col>
      </v-row>

      <v-text-field label="Interval"></v-text-field>

      <v-checkbox
        v-model="this.break"
        label="Break Period"
        color="#2E6799"></v-checkbox>

      <v-row v-if="this.break">
        <v-col>
          <v-flex xs11 sm5>
            <v-dialog
              ref="dialog"
              v-model="timeModalBreak"
              :return-value.sync="timeBreak"
              persistent
              lazy
              full-width
              width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="timeBreak"
                  readonly
                  v-on="on"
                  label="Break Start Time"></v-text-field>
              </template>
              <v-time-picker
                v-if="timeModalBreak"
                v-model="timeBreak"
                full-width>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="timeModalBreak = false"
                  >Cancel</v-btn
                >
                <v-btn
                  flat
                  color="primary"
                  @click="$refs.dialog.save(timeBreak)"
                  >OK</v-btn
                >
              </v-time-picker>
            </v-dialog>
          </v-flex>
        </v-col>
        <v-col>
          <v-flex>
            <v-dialog
              ref="dialog"
              v-model="timeModalEndBreak"
              :return-value.sync="timeEndBreak"
              persistent
              lazy
              full-width
              width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="timeEndBreak"
                  readonly
                  v-on="on"
                  label="Break End Time"></v-text-field>
              </template>
              <v-time-picker
                v-if="timeModalEndBreak"
                v-model="timeEndBreak"
                full-width>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="timeModalEndBreak = false"
                  >Cancel</v-btn
                >
                <v-btn
                  flat
                  color="primary"
                  @click="$refs.dialog.save(timeEndBreak)"
                  >OK</v-btn
                >
              </v-time-picker>
            </v-dialog>
          </v-flex>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="text-center">
      <v-btn
        rounded="pill"
        class="buttonGradient text-white mr-3"
        @click="closeCreateEventDialog()">
        Save
      </v-btn>
      <v-btn
        rounded="pill"
        color="#DA9B9B"
        class="text-white mr-3"
        @click="closeCreateEventDialog()">
        Cancel
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      dateModal: false,
      time: null,
      timeModal: false,
      timeEnd: null,
      timeModalEnd: false,
      timeBreak: null,
      timeModalBreak: false,
      timeEndBreak: null,
      timeModalEndBreak: false,
      break: true,
    }),
    methods: {
      closeCreateEventDialog() {
        this.$emit("closeCreateEventDialogEvent", false);
      },
    },
  };
</script>

<style></style>
