<template>
  <v-container fluid class="repertoireComponent px-0 pt-0">
    <v-card elevation="0" class="repertoireItemGradient fullBorderCurve">
      <v-card-text class="pt-0">
        <v-row justify="center" class="pl-5 mt-0">
          <v-col cols="1" align-self="center" class="py-0">
            <v-avatar class="bg-darkBlue">
              <v-img :src="sentPiece.composer.picture"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9" class="py-0">
            <v-card-title class="pb-0 font-weight-bold text-h9">
              {{ sentPiece.name }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              {{ sentPiece.composer.name }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="2" class="text-right py-0">
            <v-btn
              @click="this.editRepertoire = true"
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonWhite text-mediumBlue font-weight-bold mt-5">
              Edit
            </v-btn>
            <v-dialog v-model="editRepertoire" max-width="600px">
              <RepertoireEdit
                :pieces="sentPiece"
                @closeEditRepertoireDialogEvent="
                  this.editRepertoire = false
                "></RepertoireEdit>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import RepertoireEdit from "./RepertoireEdit.vue";
  export default {
    name: "Repertoire Component",
    components: {
      RepertoireEdit,
    },
    props: {
      sentPiece: {},
    },
    data() {
      return {
        editRepertoire: false,
      };
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .v-btn {
    opacity: 100%;
  }
</style>
