<template>
  <div data-aos="fade-up">
    <!-- Header -->
    <h1 class="w-max mx-auto text-header text-gray-600 font-semibold text-2xl">
      <template v-if="!isEdit">
        <i class="mdi mdi-plus"></i>
        Add Todo
      </template>

      <template v-else>
        <i class="mdi mdi-pencil"></i>
        Edit Todo
      </template>
    </h1>

    <!-- Content -->
    <div class="mt-1">
      <!-- The Form -->
      <form @submit.prevent="formSubmitHandler">
        <div class="grid grid-cols-2 gap-3">
          <!-- Title -->
          <custom-input
            label="Title"
            :error-message="formError.title"
            v-model="form.title"
          ></custom-input>

          <!-- Category -->
          <custom-select
            label="Category"
            :options="categoryOptions"
            :error-message="formError.category"
            v-model="form.category"
          ></custom-select>
        </div>

        <custom-textarea
          label="Description"
          placeholder="Description"
          :error-message="formError.description"
          v-model="form.description"
        ></custom-textarea>

        <!-- Actions -->
        <button
          type="submit"
          class="mt-2 w-full text-white bg-indigo-600 rounded py-1 px-3 focus:outline-none hover:bg-indigo-500 focus:ring focus:indigo-500 focus:ring-opacity-50"
        >
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import CustomInput from '@/components/Form/Input'
import CustomSelect from '@/components/Form/Select'
import CustomTextarea from '@/components/Form/Textarea'

export default {
  components: {
    CustomInput,
    CustomSelect,
    CustomTextarea
  },

  props: {
    todo: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      form: {
        title: null,
        category: 'General',
        description: null
      },
      formError: {
        title: null,
        category: null,
        description: null
      },
      categoryOptions: ['General', 'Important']
    }
  },

  computed: {
    isEdit() {
      return this.todo !== null
    }
  },

  mounted() {
    if (this.isEdit) {
      this.syncTodoProp()
    }
  },

  methods: {
    syncTodoProp() {
      this.form.title = this.todo.title
      this.form.category = this.todo.category
      this.form.description = this.todo.description
    },
    validateInput() {
      let success = true

      // Validate
      for (const key in this.form) {
        const field = this.form[key]
        if (!field || (field && !field.length)) {
          success = false
          this.formError[key] = `The ${key} field is required.`
        } else {
          this.formError[key] = null
        }
      }

      return success
    },
    formSubmitHandler() {
      if (this.validateInput()) {
        this.$emit('submit', this.form)
      }
    }
  }
}
</script>
