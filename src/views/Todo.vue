<template>
  <div id="todo-page" data-aos="fade-right">
    <div class="flex space-x-3 mb-2">
      <!-- Important -->
      <span
        v-if="todo.category.toLowerCase() === 'important'"
        class="inline-block px-3 rounded-xl text-center text-white bg-red-500"
      >
        Important
        <i class="mdi mdi-exclamation-thick"></i>
      </span>

      <!-- Complete -->
      <span
        v-if="todo.complete"
        class="inline-block px-4 text-center rounded-xl text-white bg-green-500"
      >
        Complete
        <i class="mdi mdi-check"></i>
      </span>
    </div>

    <!-- The Card -->
    <div class="bg-white rounded text-gray-700 shadow px-5 py-3">
      <!-- Header -->
      <div class="flex flex-wrap justify-between items-center">
        <!-- Title -->
        <p class="text-2xl text-gray-700">{{ todo.title }}</p>

        <!-- Created At -->
        <p class="text-gray-500 text-sm">
          <i class="mdi mdi-clock"></i> {{ todo.createdAt | formatTime }}
        </p>
      </div>

      <!-- Description -->
      <p class="mt-1 text-gray-500">{{ todo.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  filters: {
    formatTime: function(value) {
      return moment(value).calendar()
    }
  },

  computed: {
    ...mapGetters('todo', {
      findById: 'findById'
    }),
    todo() {
      return this.findById(this.$route.params.id)
    }
  }
}
</script>
