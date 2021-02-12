<template>
  <div id="app" class="text-gray-800">
    <!-- Navbar -->
    <navbar></navbar>

    <!-- Todo Nav -->
    <todo-nav></todo-nav>

    <delete-dialog></delete-dialog>

    <!-- Main Content -->
    <div class="px-4 py-4 mx-auto w-full lg:max-w-3xl xl:max-w-5xl">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import TodoNav from '@/components/TodoNav'
import DeleteDialog from '@/components/DeleteDialog'

export default {
  components: {
    Navbar,
    TodoNav,
    DeleteDialog
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/app.scss';
</style>
