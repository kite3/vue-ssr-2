<template>
  <div>
    <h1 @click="onClick">this is home page</h1>
    <ul>
      <li v-for="item in items" :key="item.name">
        名字：{{ item.name }}，年龄：{{ item.age }}岁
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('fetchItems')
  },
  computed: {
    items() {
      return this.$store.state.items
    },
  },
  methods: {
    onClick() {
      console.log('home')
    },
  },
}
</script>

<style></style>
