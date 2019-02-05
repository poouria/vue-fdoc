<template>
  <v-dialog
    v-model="$store.state.showConfirmDialog"
    width="500"
  >
    <v-card>
      <v-card-title
        class="subheading grey lighten-2"
        primary-title
      >
        {{$store.state.confirmDialogTitle}}
      </v-card-title>

      <v-card-text>
        <h3>
          {{$store.state.confirmDialogMessage}}
        </h3>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          flat
          @click="clickNo()"
        >
          خیر
        </v-btn>
        <v-btn
          color="primary"
          flat
          @click="clickOk()"
        >
          بله
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'confirm',
  methods: {
    clickNo () {
      this.$store.dispatch('hide_dialog')
      this.$emit('confirmDialog', false)
    },
    clickOk () {
      this.$emit('confirmDialog', this.$store.state.confirmUserId)
      this.$store.dispatch('hide_dialog')
    }
  }
}
</script>

<style scoped>

</style>
