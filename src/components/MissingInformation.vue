<template>
    <v-dialog width="auto">
      <v-card>
        <v-card-title color="darkBlue">Request Missing Information</v-card-title>
        <v-card-subtitle> Missing Information Type </v-card-subtitle>
        <v-select
          label="Missing Information Type"
          :items="['Composer', 'Accompanist', 'Voice/Instrument']"
          variant="solo"
          text="darkBlue"
        ></v-select>
        <v-card-subtitle> Composer Name </v-card-subtitle>
        <v-text-field 
            label="Piece Title" 
            variant="solo"
            color="mediumBlue"
            text="darkBlue">
        </v-text-field>
        <v-card-subtitle> Composer Birthday</v-card-subtitle>
        <v-date-picker></v-date-picker>
        <v-card-subtitle> Composer Nationality </v-card-subtitle>
        <v-text-field 
            label="Nationality" 
            variant="solo"
            color="mediumBlue"
            text="darkBlue">
        </v-text-field>
        <v-card-subtitle> Composer Death Date</v-card-subtitle>
        <v-date-picker></v-date-picker>
        <v-card-subtitle> Identifiable Pieces </v-card-subtitle>
        <v-text-field 
            label="indentifable" 
            variant="solo"
            color="mediumBlue">
        </v-text-field>
        <v-card-actions>
          <v-btn color="darkBlue">Request</v-btn>
          <v-btn color="red">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>