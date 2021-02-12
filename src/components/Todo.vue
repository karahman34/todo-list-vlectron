<template>
  <div class="todo px-4 py-4 bg-white rounded shadow">
    <!-- Header -->
    <div class="flex items-center space-x-2">
      <!-- Title -->
      <router-link
        :to="{ name: 'Todo', params: { id: todo.id } }"
        class="text-xl text-gray-700"
      >
        {{ todo.title }}
      </router-link>

      <!-- Important -->
      <span
        v-if="todo.category.toLowerCase() === 'important'"
        class="inline-block px-3 rounded-xl text-center text-white bg-red-500"
      >
        <span class="hidden sm:inline">Important</span>
        <i class="mdi mdi-exclamation-thick sm:ml-1"></i>
      </span>

      <!-- Complete -->
      <span
        v-if="todo.complete"
        class="inline-block px-4 text-center rounded-xl text-white bg-green-500"
      >
        <span class="hidden sm:inline">Complete</span>
        <i class="mdi mdi-check sm:ml-1"></i>
      </span>
    </div>

    <!-- Description -->
    <p class="text-gray-500 my-1">{{ todo.description | todoDescription }}</p>

    <!-- Bottom -->
    <div class="flex justify-between space-x-3 text-sm">
      <!-- Left -->
      <div class="flex space-x-4">
        <!-- Created At -->
        <div class="text-gray-500">
          <i class="mdi mdi-clock mr-1"></i>
          <span>{{ todo.createdAt | formatTime }}</span>
        </div>

        <!-- Complete -->
        <div
          class="cursor-pointer text-gray-500"
          :class="{ 'text-green-500 font-semibold': todo.complete }"
          @click="setComplete(todo.id)"
        >
          <i class="mdi mdi-check mr-1"></i>
          <span>Complete</span>
        </div>
      </div>

      <!-- Right -->
      <div class="flex space-x-4">
        <!-- Edit -->
        <router-link
          :to="{ name: 'Edit', params: { id: todo.id } }"
          class="cursor-pointer text-yellow-500"
        >
          <i class="mdi mdi-pencil mr-1"></i>
          <span>Edit</span>
        </router-link>

        <!-- Delete -->
        <div class="cursor-pointer text-red-500" @click="removeTodo(todo)">
          <i class="mdi mdi-trash-can mr-1"></i>
          <span>Delete</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapMutations } from 'vuex'

export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  filters: {
    formatTime: function(value) {
      return moment(value).calendar()
    },
    todoDescription: function(value) {
      return value.length <= 140 ? value : value.slice(0, 140) + '...'
    }
  },

  methods: {
    ...mapMutations('event', {
      setDeleteDialog: 'SET_DELETE_DIALOG'
    }),
    ...mapMutations('todo', {
      toggleComplete: 'TOGGLE_COMPLETE',
      removeTodoItem: 'REMOVE_ITEM'
    }),
    setComplete(id) {
      this.toggleComplete(id)

      this.$toasted.show('Item updated.', {
        type: 'success',
        icon: 'check'
      })
    },
    removeTodo(todo) {
      this.setDeleteDialog({
        text: `Are you sure wan't to remove "${todo.title}" ?`,
        callback: () => {
          this.removeTodoItem(todo.id)

          this.$emit('todo:delete', todo)

          this.$toasted.show('Item successfully deleted.', {
            type: 'success',
            icon: 'check'
          })
        }
      })
    }
  }
}
</script>
