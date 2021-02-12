<template>
  <div class="w-full bg-indigo-600 flex justify-between items-center py-3 px-3">
    <!-- Title -->
    <h1 v-if="atHome" class="text-white text-2xl font-bold">Todo List</h1>

    <!-- Go Back -->
    <router-link v-if="!atHome" to="/">
      <button class="bg-transparent text-white text-xl focus:outline-none">
        <i class="mdi mdi-arrow-left"></i>
      </button>
    </router-link>

    <!-- Search -->
    <div class="relative max-w-sm">
      <i
        class="mdi mdi-magnify cursor-pointer text-xl absolute right-2 text-gray-500 font-bold top-1/2 transform -translate-y-1/2"
        @click="goToHome"
      ></i>
      <input
        v-model="search"
        class="w-full py-1 px-3 rounded transition-shadow focus:outline-none focus:ring focus:ring-indigo-400"
        type="text"
        placeholder="Search todos.."
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      search: '',
      searchTimeout: null
    }
  },

  computed: {
    atHome() {
      return this.$route.path === '/'
    }
  },

  watch: {
    search(val) {
      clearTimeout(this.searchTimeout)

      this.searchTimeout = setTimeout(() => {
        this.goToHome()
        this.setNavbarSearch(val)
      }, 450)
    }
  },

  methods: {
    ...mapMutations('event', {
      setNavbarSearch: 'SET_NAVBAR_SEARCH'
    }),
    goToHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>
