<template lang="pug">
  .c-home-heading
    h1.c-home-heading__title Yoichi Kobayashi
    p.c-home-heading__subtitle I'm a Web Developer. Just love World-Wide-Web.
    .c-home-heading__actions
      router-link.c-home-heading__cta(to="/who-i-am") Learn More
      router-link.c-home-heading__cta(to="/works") View Works
</template>

<script>
export default {
  name: 'HomeHeading'
}
</script>

<style lang="scss">
.c-home-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
  
  &__title {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: #333;
    font-weight: 300;
  }
  
  &__subtitle {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 3rem;
    opacity: 0.9;
  }
  
  &__actions {
    display: flex;
    gap: 2rem;
  }
  
  &__cta {
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