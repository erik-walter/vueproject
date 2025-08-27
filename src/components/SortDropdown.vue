<template>
  <select v-model="sortValue">
    <option value="asc">Von ältesten zu neuesten</option>
    <option value="desc">Von neuesten zu ältesten</option>
  </select>
</template>

<script>
export default {
  name: 'SortDropdown',
  props: {
    modelValue: String
  },
  computed: {
    sortValue: {
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
select {
  padding: 5px 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
