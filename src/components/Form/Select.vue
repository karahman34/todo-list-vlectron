<template>
  <div class="my-2">
    <label v-if="label" :for="componentId" class="font-medium text-gray-700"
      >Category</label
    >
    <select
      :id="componentId"
      class="w-full py-1.5 px-3 block rounded-md shadown-sm border border-gray-300 outline-none transition-colors"
      :class="{
        'border-red-500': errorMessage,
        'focus:ring-2 focus:ring-indigo-500': !errorMessage
      }"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <option v-for="option in options" :key="option" :value="option">{{
        option
      }}</option>
    </select>

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
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
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
