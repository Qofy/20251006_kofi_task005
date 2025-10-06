<template lang="pug">
  .c-guide(v-if="isVisible")
    .c-guide__content
      h3 Welcome to the Site
      p Use mouse to interact with the falling leaves
      button.c-guide__close(@click="close") Got it!
</template>

<script>
export default {
  name: 'Guide',
  data() {
    return {
      isVisible: true
    }
  },
  methods: {
    close() {
      this.isVisible = false;
    }
  }
}
</script>

<style lang="scss">
.c-guide {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 200;
  max-width: 250px;
  
  &__content h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }
  
  &__content p {
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  &__close {
    background: #333;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background: #555;
    }
  }
}
</style>