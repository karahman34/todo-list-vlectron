<template>
  <div class="home">
    <!-- FAB Create Button -->
    <router-link
      to="/create"
      class="z-40 fixed bottom-8 right-5 flex justify-center items-center py-1 px-2 bg-indigo-600 text-white rounded-full text-3xl"
    >
      <i class="mdi mdi-plus"></i>
    </router-link>

    <!-- Header -->
    <div class="mb-3 flex flex-wrap justify-between items-center">
      <custom-select
        v-model="order"
        :options="['newest', 'oldest']"
        style="margin: 0 !important"
      ></custom-select>

      <!-- Reset -->
      <button
        class="py-1 px-3 rounded-2xl text-white bg-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-600"
        @click="resetTodos"
      >
        <i class="mdi mdi-history"></i>
        Remove All Todos
      </button>
    </div>

    <!-- Empty Todos -->
    <div
      v-if="!todos.length"
      class="min-h-full w-full flex justify-center items-center text-gray-600 text-2xl"
    >
      No Todos.
    </div>

    <!-- Todo List -->
    <template v-else>
      <div class="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <todo
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          data-aos="zoom-in"
          data-aos-once="true"
          @todo:delete="deleteTodoHandler"
        ></todo>
      </div>

      <infinite-loading
        class="mt-2"
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      >
        <div slot="no-more" class="text-gray-700">No more todos :)</div>
        <div slot="no-results" class="hidden"></div>
      </infinite-loading>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import Todo from '@/components/Todo'
import CustomSelect from '@/components/Form/Select'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Home',

  components: {
    Todo,
    CustomSelect,
    InfiniteLoading
  },

  data() {
    return {
      category: '',
      order: 'newest',
      page: 1,
      perPage: 10,
      todos: [],
      todosTotal: null,
      infiniteId: +new Date()
    }
  },

  computed: {
    ...mapGetters('todo', {
      filterTodos: 'filter'
    }),
    ...mapState('event', {
      search: state => state.navbarSearch,
      todoTab: state => state.todoNavTabActive
    })
  },

  watch: {
    order() {
      this.todos = []
      this.page === 1 ? this.getTodos() : (this.page = 1)
    },
    search() {
      this.todos = []
      this.page === 1 ? this.getTodos() : (this.page = 1)
    },
    todoTab() {
      this.todos = []
      this.page === 1 ? this.getTodos() : (this.page = 1)
    },
    page() {
      this.getTodos()
    },
    todos(todos) {
      if (!todos.length) {
        this.todosTotal = null
        this.infiniteId += 1
      }
    }
  },

  mounted() {
    this.getTodos()
  },

  methods: {
    ...mapMutations('todo', {
      removeAllTodos: 'REMOVE_ALL'
    }),
    ...mapMutations('event', {
      setDeleteDialog: 'SET_DELETE_DIALOG'
    }),
    getTodos() {
      const res = this.filterTodos({
        search: this.search,
        tab: this.todoTab,
        order: this.order,
        page: this.page,
        limit: this.perPage
      })

      this.todos.push(...res.data)
      this.todosTotal = res.meta.total
    },
    deleteTodoHandler(todo) {
      this.todos.splice(
        this.todos.findIndex(item => parseInt(item.id) === parseInt(todo.id)),
        1
      )
    },
    resetTodos() {
      this.setDeleteDialog({
        text: 'Are you sure want to remove all todos?',
        callback: () => {
          this.todos = []
          this.removeAllTodos()
        }
      })
    },
    infiniteHandler($state) {
      if (this.todos.length === this.todosTotal) {
        return $state.complete()
      }

      this.page++

      if (this.todos.length === this.todosTotal) {
        $state.complete()
      } else {
        $state.loaded()
      }
    }
  }
}
</script>
