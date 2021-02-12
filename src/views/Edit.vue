<template>
  <div>
    <todo-form :todo="todo" @submit="formSubmit"></todo-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TodoForm from '@/components/TodoForm'

export default {
  components: {
    TodoForm
  },

  computed: {
    ...mapGetters('todo', {
      findById: 'findById'
    }),
    todo() {
      return this.findById(this.$route.params.id)
    }
  },

  methods: {
    ...mapMutations('todo', {
      updateTodo: 'UPDATE_ITEM'
    }),
    formSubmit(value) {
      value.id = this.todo.id

      this.updateTodo(value)

      this.$toasted.show('Item updated.', {
        type: 'success',
        icon: 'check'
      })
    }
  }
}
</script>
