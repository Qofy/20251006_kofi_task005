<template lang="pug">
  .c-who-i-am-heading
    h1.c-who-i-am-heading__title Yoichi Kobayashi
    p.c-who-i-am-heading__subtitle I'm a Web Developer. Just love World-Wide-Web.
</template>

<script>
export default {
  name: 'WhoIAmHeading'
}
</script>

<style lang="scss">
.c-who-i-am-heading {
  text-align: center;
  padding: 60px 0;
  
  &__title {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  &__subtitle {
    font-size: 1.2rem;
    color: #666;
    opacity: 0.9;
  }
}
</style>
