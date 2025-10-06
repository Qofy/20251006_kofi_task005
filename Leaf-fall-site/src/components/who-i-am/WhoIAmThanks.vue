<template lang="pug">
  .c-who-i-am-thanks
    h2.c-who-i-am-thanks__title Thank you for visiting
    p.c-who-i-am-thanks__text Feel free to explore my work and get in touch!
</template>

<script>
export default {
  name: 'WhoIAmThanks'
}
</script>

<style lang="scss">
.c-who-i-am-thanks {
  text-align: center;
  padding: 40px 0;
  
  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  &__text {
    font-size: 1.1rem;
    color: #666;
  }
}
</style>