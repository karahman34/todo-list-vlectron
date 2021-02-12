<template>
  <div
    v-if="deleteDialog.text"
    class="fixed z-50 top-0 left-0 bg-gray-700 bg-opacity-50 min-h-screen w-full"
  >
    <div class="flex items-center justify-center min-h-screen">
      <!-- The Card -->
      <div
        class="px-8 py-5 bg-white rounded shadow max-w-lg flex flex-col items-center space-y-5"
      >
        <!-- Icon -->
        <i
          class="mdi mdi-exclamation py-2 px-2 text-6xl border-4 border-red-500 text-red-500 rounded-full"
        ></i>

        <!-- Text -->
        <p class="text-2xl text-gray-600">{{ deleteDialog.text }}</p>

        <!-- Actions -->
        <div class="flex space-x-4">
          <button
            class="py-1 px-3 rounded shadow transition-all bg-gray-300 text-gray-600 focus:outline-none hover:bg-gray-400"
            @click="closeDialog"
          >
            Cancel
          </button>

          <button
            class="py-1 px-3 rounded shadow transition-all bg-gray-700 text-white focus:outline-none hover:bg-red-500"
            @click="confirm"
          >
            Yes, delete it!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('event', {
      deleteDialog: state => state.deleteDialog
    })
  },

  methods: {
    ...mapMutations('event', {
      setDeleteDialog: 'SET_DELETE_DIALOG'
    }),
    closeDialog() {
      this.setDeleteDialog(false)
    },
    confirm() {
      this.deleteDialog.callback()

      this.closeDialog()
    }
  }
}
</script>
