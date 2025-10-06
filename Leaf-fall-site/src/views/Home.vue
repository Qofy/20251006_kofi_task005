<script>
import normalizeWheel from 'normalize-wheel';
import sleep from '@/utils/sleep';

export default {
  name: 'Home',
  metaInfo: {
    title: ''
  },
  components: {
    // Remove HomeHeading for now since it might not exist yet
  },
  beforeRouteEnter(to, from, next) {
    // Fix: use this.$store instead of importing store
    next(vm => {
      vm.$store.commit('transit', {
        globalId: 0
      });
    });
  },
  created() {
    window.addEventListener('wheel', this.wheel, { passive: false });
    window.addEventListener('touchmove', this.touchmove);
  },
  async mounted() {
    this.$store.commit('changeBackground', {
      isHome: true,
      hasDelay: true
    });
    this.$store.commit('showHomeObjs', true);
    this.$store.commit('showWorksObjs', {
      index: 0,
      direction: -1
    });
    this.$store.commit('showWhoIAmObjs', false);
    await sleep(1000); // Reduced from 5000ms
    this.$store.commit('showUI');
  },
  destroyed() {
    window.removeEventListener('wheel', this.wheel, { passive: false });
    window.removeEventListener('touchmove', this.touchmove);
  },
  methods: {
    wheel(e) {
      e.preventDefault();

      const n = normalizeWheel(e);
      const { state, commit } = this.$store;

      // Run at the first wheel event only.
      if (state.isWheeling === false) {
        if (Math.abs(n.pixelY) < 10) return;
        commit('startWheeling');

        if (n.pixelY > 0) {
          // Fix: check if works exist first
          if (state.works && state.works[0]) {
            this.$router.push(`/works/${state.works[0].key || state.works[0].id}/`);
          }
        }
      }
    },
    touchmove() {
      const { state, commit, dispatch } = this.$store;

      if (state.isTouchMoving === true) {
        if (state.touchMove.y < -10) {
          if (state.works && state.works[0]) {
            dispatch('debounceRouterPush', `/works/${state.works[0].key || state.works[0].id}/`);
          }
          commit('touchEnd');
        }
      }
    }
  }
};
</script>

<template lang="pug">
  .home
    .home-content
      h1.home-title Yoichi Kobayashi
      p.home-subtitle I'm a Web Developer. Just love World-Wide-Web.
      .home-hint Scroll down to explore works
</template>

<style lang="scss">
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.home-content {
  text-align: center;
  color: white;
  z-index: 10;
}

.home-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 300;
}

.home-subtitle {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.home-hint {
  font-size: 1rem;
  opacity: 0.7;
  animation: fadeInOut 2s infinite;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.9; }
}
</style>
