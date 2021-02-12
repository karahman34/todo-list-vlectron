<template>
  <!-- Header Nav -->
  <div
    v-if="atHome"
    class="todo-nav leading-10 flex text-center text-lg text-white bg-indigo-600"
  >
    <div
      v-for="navItem in navItems"
      :key="navItem.text"
      class="cursor-pointer"
      :class="{ active: navItem.active }"
      @click="toggleActive(navItem)"
    >
      <i class="mdi mr-1" :class="navItem.icon"></i>
      {{ navItem.text }}
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      navItems: [
        {
          icon: 'mdi-clipboard-text',
          text: 'All',
          active: true
        },
        {
          icon: 'mdi-rocket-launch',
          text: 'Active',
          active: false
        },
        {
          icon: 'mdi-check-circle',
          text: 'Complete',
          active: false
        }
      ]
    }
  },

  computed: {
    atHome() {
      return this.$route.path === '/'
    }
  },

  methods: {
    ...mapMutations('event', {
      setTabActive: 'SET_TODO_NAV_TAB'
    }),
    toggleActive(navItem) {
      this.navItems.forEach(item => (item.active = false))

      navItem.active = true

      this.setTabActive(navItem.text)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-nav {
  & > * {
    flex-grow: 1;

    &.active {
      border-bottom: 5px solid #ff9100;
    }
  }
}
</style>
