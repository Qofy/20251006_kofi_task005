<template lang="pug">
  nav.c-utility-navi
    .c-utility-navi__list
      router-link.c-utility-navi__item(to="/") Home
      router-link.c-utility-navi__item(to="/who-i-am") About
      router-link.c-utility-navi__item(to="/works") Works
</template>

<script>
export default {
  name: 'UtilityNavi'
}
</script>

<style lang="scss">
.c-utility-navi {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  
  &__list {
    display: flex;
    gap: 1rem;
  }
  
  &__item {
    color: #333;
    text-decoration: none;
    padding: 5px 10px;
    
    &:hover,
    &.router-link-active {
      background-color: #333;
      color: white;
    }
  }
}
</style>