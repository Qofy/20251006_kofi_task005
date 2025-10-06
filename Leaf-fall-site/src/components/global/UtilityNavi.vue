<template lang="pug">
  .c-utility-navi
    nav.nav-list
      router-link.nav-item(
        to="/"
        :class="{ 'active': currentRoute === 'Home' }"
      ) Home
      router-link.nav-item(
        to="/works"
        :class="{ 'active': currentRoute === 'Works' }"
      ) Works
      router-link.nav-item(
        to="/who-i-am"
        :class="{ 'active': currentRoute === 'WhoIAm' }"
      ) About
</template>

<script>
export default {
  name: 'UtilityNavi',
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  }
}
</script>

<style lang="scss">
.c-utility-navi {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
  
  .nav-list {
    display: flex;
    gap: 1.5rem;
    
    @media (max-width: 768px) {
      gap: 1rem;
    }
  }
  
  .nav-item {
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7); // Semi-transparent white
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    
    &:hover {
      color: #FFD700; // Gold on hover
      border-color: rgba(255, 215, 0, 0.5);
      background: rgba(255, 215, 0, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
    }
    
    &.active {
      color: #FF6B6B; // Coral red for active
      border-color: rgba(255, 107, 107, 0.6);
      background: rgba(255, 107, 107, 0.15);
      box-shadow: 0 2px 10px rgba(255, 107, 107, 0.3);
    }
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 0.4rem 0.8rem;
    }
  }
}
</style>