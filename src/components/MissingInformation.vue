<template>
      <v-card>
        <v-row>
          <v-col><v-card-title class="text-darkBlue font-weight-bold">Missing Information Request</v-card-title></v-col>
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
      <v-card-subtitle class="font-weight-bold"> Type of Information </v-card-subtitle>
        <v-card-text>
          <v-select
            bg-color="lightBlue"
            class="text-blue"    
            placeholder="Click here to select type"
            :items="['Instrument', 'Composer']"
            variant="solo"
            text="darkBlue"
          ></v-select>
        </v-card-text>
      <v-card-subtitle class="font-weight-bold"> Composer Name </v-card-subtitle>
        <v-card-text>
          <v-text-field 
            placeholder="Name" 
            variant="solo"
            bg-color="lightBlue"
            text="darkBlue">
          </v-text-field>
        </v-card-text>  
        <v-row>
          <v-col><v-card-subtitle class="font-weight-bold">Composer Birthday</v-card-subtitle>
            <v-card-text><v-date-picker v-model="picker"></v-date-picker></v-card-text></v-col>
          <v-col><v-card-subtitle class="font-weight-bold"> Composer Death Date</v-card-subtitle>
            <v-card-text><v-date-picker v-model="picker"></v-date-picker></v-card-text>
          </v-col>
        </v-row>
      <v-card-subtitle class="font-weight-bold"> Composer Nationality </v-card-subtitle>
        <v-card-text>
          <v-text-field 
            placeholder="Nationality (i.e. Italian, German)" 
            variant="solo"
            bg-color="lightBlue"
            text="darkBlue">
          </v-text-field>
        </v-card-text>
      <v-card-subtitle class="font-weight-bold"> Notable Works </v-card-subtitle>
        <v-card-text>
          <v-text-field 
            placeholder="Begin typing..." 
            variant="solo"
            bg-color="lightBlue">
          </v-text-field>
        </v-card-text>
        <v-card-actions class="mx-auto font-weight-bold">
          <v-btn @click="closeDialog()" color="darkBlue">Request</v-btn>
          <v-btn @click="closeDialog()" color="red">Cancel</v-btn>
        </v-card-actions>
      </v-card>
  </template>

<script>
  export default {
    name: "MissingInformation",
    components: {},
    data() {
      return {
        createDialog: false,
      };
    },
    methods: {
      closeDialog() {
        this.$emit("closeCourseDialogEvent", false);
      },

      closeCreateDialog(val) {
        this.createDialog = val;
      }
    },
  };
</script>