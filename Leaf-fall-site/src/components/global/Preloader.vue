<template lang="pug">
  .c-preloader(v-if="isVisible")
    .c-preloader__inner
      .c-preloader__text Loading...
      .c-preloader__progress
        .c-preloader__bar(:style="{ width: progress + '%' }")
</template>

<script>
export default {
  name: 'Preloader',
  computed: {
    isVisible() {
      return this.$store.state.isShownPreloader && !this.$store.state.isLoaded;
    },
    progress() {
      const { preloadProgress, preloadMax } = this.$store.state;
      return preloadMax > 0 ? (preloadProgress / preloadMax) * 100 : 0;
    }
  }
}
</script>

<style lang="scss">
.c-preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  &__inner {
    text-align: center;
  }
  
  &__text {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 2rem;
  }
  
  &__progress {
    width: 200px;
    height: 4px;
    background: #eee;
    border-radius: 2px;
    overflow: hidden;
  }
  
  &__bar {
    height: 100%;
    background: #333;
    transition: width 0.3s ease;
  }
}
</style>