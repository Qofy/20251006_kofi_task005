<template lang="pug">
  .c-global-title
    h1.c-global-title__text {{ title }}
</template>

<script>
export default {
  name: 'GlobalTitle',
  computed: {
    title() {
      return this.$route.meta?.title || 'Yoichi Kobayashi';
    }
  }
}
</script>

<style lang="scss">
.c-global-title {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
  
  &__text {
    font-size: 1.2rem;
    color: #333;
    margin: 0;
  }
}
</style>
