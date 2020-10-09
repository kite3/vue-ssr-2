<template>
  <div>
    <h1 @click="onClick">this is about page</h1>
    <ul>
      <li v-for="v in objMsg" :key="v">value: {{ v }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('fetchObjMsg')
  },
  computed: {
    objMsg() {
      return this.$store.state.objMsg
    },
  },
  created() {
    // this.$root.$options.ssrContext.title = 'hehe...'
  },
  methods: {
    onClick() {
      console.log('about')
    },
  },
}
</script>

<style></style>
