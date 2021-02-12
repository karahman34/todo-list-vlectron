<template>
  <div class="my-2 w-full">
    <label :for="componentId" class="font-medium text-gray-700">{{
      label
    }}</label>
    <textarea
      :id="componentId"
      class="w-full h-full block px-3 py-1 rounded-md shadow-sm transition-shadow border border-gray-300 outline-none"
      rows="5"
      :class="{
        'border-red-500': errorMessage,
        'focus:ring-2 focus:ring-indigo-500': !errorMessage
      }"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ></textarea>

    <span v-if="errorMessage" class="font-medium text-red-500">{{
      errorMessage
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    errorMessage: {
      type: String,
      default: null
    }
  },

  computed: {
    componentId() {
      return this._uid
    }
  }
}
</script>
