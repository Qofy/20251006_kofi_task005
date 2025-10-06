<template lang="pug">
  .c-who-i-am-links
    h3.c-who-i-am-links__title Connect with me
    .c-who-i-am-links__list
      a.c-who-i-am-links__item(href="#") Portfolio
      a.c-who-i-am-links__item(href="#") GitHub
      a.c-who-i-am-links__item(href="#") Contact
</template>

<script>
export default {
  name: 'WhoIAmLinks'
}
</script>

<style lang="scss">
.c-who-i-am-links {
  text-align: center;
  padding: 40px 0;
  
  &__title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #333;
  }
  
  &__list {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  &__item {
    padding: 10px 20px;
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