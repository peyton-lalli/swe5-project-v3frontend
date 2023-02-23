<template>
    <v-dialog width="auto">
      <v-card>
        <v-card-title color="darkBlue">Add to Repertoire </v-card-title>
        <v-card-subtitle> Instrument </v-card-subtitle>
        <v-select
          label="Instrument"
          :items="['Voice', 'Piano', 'Trumpet']"
          variant="solo"
        ></v-select>
        <v-card-subtitle> Piece Title </v-card-subtitle>
        <v-text-field 
            label="Piece Title" 
            variant="solo"
            color="mediumBlue">
        </v-text-field>
        <v-card-subtitle> Composer </v-card-subtitle>
        <v-select
          label="Start typing for suggestions"
          :items="['Beethoven', 'Bach', 'Tchaikovsky']"
          variant="solo"
        ></v-select>
        <v-spacer></v-spacer>
        <v-checkbox label="Foreign Piece"></v-checkbox>
        <v-card-subtitle> Translation </v-card-subtitle>
        <v-text-field 
            label="Translation" 
            variant="solo"
            color="mediumBlue">
        </v-text-field>
        <v-card-actions>
          <v-btn color="darkBlue">Add</v-btn>
          <v-btn color="red">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>