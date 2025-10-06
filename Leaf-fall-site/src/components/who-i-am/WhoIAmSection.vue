<template lang="pug">
  section.c-who-i-am-section
    .c-who-i-am-section__inner
      slot
</template>

<script>
export default {
  name: 'WhoIAmSection'
}
</script>

<style lang="scss">
.c-who-i-am-section {
  padding: 40px 20px;
  
  &__inner {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>