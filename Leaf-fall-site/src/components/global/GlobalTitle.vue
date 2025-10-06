<template lang="pug">
  .c-global-title
    router-link.title-link(to="/")
      h1.title Yoichi Kobayashi
      p.subtitle(:class="{ 'home-subtitle': isHome }") Creative Developer
</template>

<script>
export default {
  name: 'GlobalTitle',
  computed: {
    isHome() {
      return this.$route.name === 'Home';
    }
  }
}
</script>

<style lang="scss">
.c-global-title {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  
  .title-link {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      .title {
        color: #FFD700; // Gold on hover
        transform: translateY(-2px);
      }
    }
  }
  
  .title {
    font-size: 1.8rem;
    font-weight: 300;
    margin: 0;
    color: #FFFFFF; // White default
    transition: all 0.3s ease;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
  
  .subtitle {
    font-size: 0.9rem;
    margin: 0.2rem 0 0 0;
    color: #87CEEB; // Sky blue default
    opacity: 0.9;
    font-weight: 400;
    transition: all 0.3s ease;
    
    &.home-subtitle {
      color: #98FB98; // Light green for home page
    }
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
}
</style>
