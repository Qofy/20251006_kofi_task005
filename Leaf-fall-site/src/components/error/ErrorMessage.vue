<template lang="pug">
  .c-error-message
    .c-error-message__inner
      h1.c-error-message__title 404
      p.c-error-message__text Page not found
      router-link.c-error-message__link(to="/") Go Home
</template>

<script>
export default {
  name: 'ErrorMessage'
}
</script>

<style lang="scss">
.c-error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  
  &__inner {
    padding: 2rem;
  }
  
  &__title {
    font-size: 6rem;
    margin-bottom: 1rem;
    color: #333;
    font-weight: 300;
  }
  
  &__text {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 2rem;
  }
  
  &__link {
    padding: 12px 24px;
    border: 2px solid #333;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #333;
      color: white;
    }
  }
}
</style>