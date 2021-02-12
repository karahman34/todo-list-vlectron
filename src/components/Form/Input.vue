<template>
  <div class="my-2 w-full">
    <label :for="componentId" class="font-medium text-gray-700">{{
      label
    }}</label>
    <input
      type="text"
      :id="componentId"
      class="block w-full py-1 px-3 rounded-md shadow-sm border border-gray-300 transition-shadow focus:outline-none"
      :class="{
        'border-red-500': errorMessage,
        'focus:ring-2 focus:ring-indigo-500': !errorMessage
      }"
      :placeholder="label"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />

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
