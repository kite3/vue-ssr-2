<template>
  <div>
    <a href="javascript:void(0)" @click.prevent="goHome">home</a>
    <a href="javascript:void(0)" @click.prevent="goAbout">about</a>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      location.href = location.origin + '/'
    },
    goAbout() {
      location.href = location.origin + '/about'
    },
  },
}
</script>

<style></style>
