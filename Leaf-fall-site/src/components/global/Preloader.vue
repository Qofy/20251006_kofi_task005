<template lang="pug">
  .c-preloader(v-if="isVisible")
    .c-preloader__inner
      .c-preloader__text Loading... {{ progress.toFixed(0) }}%
      .c-preloader__progress
        .c-preloader__bar(:style="{ width: progress + '%' }")
</template>

<script>
export default {
  name: 'Preloader',
  computed: {
    isVisible() {
      // Auto-hide preloader after 2 seconds for development
      return this.$store.state.isShownPreloader && !this.$store.state.isLoaded;
    },
    progress() {
      const { preloadProgress, preloadMax } = this.$store.state;
      return preloadMax > 0 ? (preloadProgress / preloadMax) * 100 : 0;
    }
  },
  mounted() {
    // Auto-complete preloader for development
    setTimeout(() => {
      if (!this.$store.state.isLoaded) {
        // Force complete the preloader
        for (let i = 0; i < 100; i++) {
          this.$store.commit('updatePreloadProgress');
        }
      }
    }, 1000);
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
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  &__inner {
    text-align: center;
    color: white;
  }
  
  &__text {
    font-size: 1.2rem;
    color: white;
    margin-bottom: 2rem;
  }
  
  &__progress {
    width: 200px;
    height: 4px;
    background: #333;
    border-radius: 2px;
    overflow: hidden;
  }
  
  &__bar {
    height: 100%;
    background: white;
    transition: width 0.3s ease;
  }
}
</style>