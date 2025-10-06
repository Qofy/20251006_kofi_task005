<template lang="pug">
  .c-works-navi(v-if="isWorksPage")
    .works-counter
      .counter-text {{ currentWorkIndex + 1 }} / {{ totalWorks }}
      .progress-bar
        .progress-fill(:style="{ width: ((currentWorkIndex + 1) / totalWorks) * 100 + '%' }")
</template>

<script>
export default {
  name: 'WorksNavi',
  computed: {
    isWorksPage() {
      return this.$route.name === 'Works';
    },
    currentWorkIndex() {
      return this.$store.state.currentWorkIndex || 0;
    },
    totalWorks() {
      return this.$store.state.works?.length || 3;
    }
  }
}
</script>

<style lang="scss">
.c-works-navi {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 100;
  
  .works-counter {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(15px);
    border-radius: 25px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    .counter-text {
      color: #98FB98; // Light green
      font-size: 1.1rem;
      font-weight: 500;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
    
    .progress-bar {
      width: 100px;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      overflow: hidden;
      
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #FF6B6B, #FFD700, #98FB98);
        border-radius: 2px;
        transition: width 0.3s ease;
      }
    }
  }
}
</style>