<template lang="pug">
  .c-work-outline
    .c-work-outline__inner
      h2.c-work-outline__title {{ work.title }}
      p.c-work-outline__description {{ work.description }}
      .c-work-outline__meta
        span.c-work-outline__year {{ work.year }}
        span.c-work-outline__tech {{ work.tech }}
</template>

<script>
export default {
  name: 'WorkOutline',
  props: {
    work: {
      type: Object,
      default: () => ({
        title: 'Sample Work',
        description: 'A sample work description',
        year: '2023',
        tech: 'Vue.js, WebGL'
      })
    }
  }
}
</script>

<style lang="scss">
.c-work-outline {
  padding: 40px 20px;
  
  &__inner {
    max-width: 800px;
    margin: 0 auto;
  }
  
  &__title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  &__description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #666;
    margin-bottom: 2rem;
  }
  
  &__meta {
    display: flex;
    gap: 2rem;
    font-size: 0.9rem;
    color: #999;
  }
  
  &__year,
  &__tech {
    &::before {
      content: '• ';
      margin-right: 0.5rem;
    }
  }
}
</style>