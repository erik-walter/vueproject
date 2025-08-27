<template>
  <input
    type="text"
    v-model="searchText"
    placeholder="Spiel suchen..."
  />
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    modelValue: String
  },
  computed: {
    searchText: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style scoped>
input {
  padding: 5px 10px;
  font-size: 16px;
  margin-bottom: 10px;
  width: 250px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
