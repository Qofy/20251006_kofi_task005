<template lang="pug">
  nav.c-works-navi(v-if="$route.name === 'works'")
    .c-works-navi__list
      .c-works-navi__item Work 1
      .c-works-navi__item Work 2
      .c-works-navi__item Work 3
</template>

<script>
export default {
  name: 'WorksNavi'
}
</script>

<style lang="scss">
.c-works-navi {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 100;
  
  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  &__item {
    color: #666;
    font-size: 0.9rem;
    cursor: pointer;
    
    &:hover {
      color: #333;
    }
  }
}
</style>