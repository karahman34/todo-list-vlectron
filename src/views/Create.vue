<template>
  <div>
    <todo-form @submit="formSubmit"></todo-form>
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
      lastItem: 'lastItem'
    })
  },

  methods: {
    ...mapMutations('todo', {
      addTodo: 'ADD_ITEM'
    }),
    formSubmit(payload) {
      payload.id = this.lastItem ? this.lastItem.id + 1 : 1
      payload.createdAt = new Date().toISOString()

      this.addTodo(payload)

      this.$toasted.show('New todo item added.', {
        type: 'success',
        icon: 'check'
      })

      this.$router.push('/')
    }
  }
}
</script>
