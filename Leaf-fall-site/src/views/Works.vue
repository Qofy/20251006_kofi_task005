<script>
import normalizeWheel from 'normalize-wheel';
import sleep from '@/utils/sleep';
import WorkOutline from '@/components/works/WorkOutline.vue';

export default {
  name: 'Works',
  metaInfo: {
    title: 'Works / '
  },
  components: {
    WorkOutline
  },
  data() {
    return {
      currentWorkIndex: 0,
      works: [
        {
          id: 1,
          title: 'Interactive Leaf Animation',
          description: 'A WebGL experience featuring realistic falling leaves with natural physics and beautiful autumn colors.',
          year: '2023',
          tech: ['Three.js', 'WebGL', 'Canvas API', 'JavaScript'],
          url: '#'
        },
        {
          id: 2,
          title: 'Particle Symphony',
          description: 'Dynamic particle system that responds to music and user interaction with fluid motion.',
          year: '2023',
          tech: ['Vue.js', 'Three.js', 'Web Audio API'],
          url: '#'
        },
        {
          id: 3,
          title: 'Nature Simulation',
          description: 'Organic motion simulation with realistic wind effects and environmental interactions.',
          year: '2023',
          tech: ['WebGL', 'GLSL', 'Physics Engine'],
          url: '#'
        }
      ]
    }
  },
  computed: {
    currentWork() {
      return this.works[this.currentWorkIndex] || this.works[0];
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit('transit', {
        globalId: 1
      });
    });
  },
  created() {
    window.addEventListener('wheel', this.wheel, { passive: false });
    window.addEventListener('keydown', this.keydown);
  },
  async mounted() {
    this.$store.commit('changeBackground', {
      isHome: false,
      hasDelay: false
    });
    this.$store.commit('showHomeObjs', false);
    this.$store.commit('showWorksObjs', {
      index: this.currentWorkIndex,
      direction: 1
    });
    this.$store.commit('showWhoIAmObjs', false);
    await sleep(500);
    this.$store.commit('showUI');
  },
  destroyed() {
    window.removeEventListener('wheel', this.wheel, { passive: false });
    window.removeEventListener('keydown', this.keydown);
  },
  methods: {
    wheel(e) {
      e.preventDefault();
      const n = normalizeWheel(e);
      
      if (Math.abs(n.pixelY) < 10) return;
      
      if (n.pixelY < 0) {
        // Scroll up - previous work
        this.previousWork();
      } else {
        // Scroll down - next work or go to about
        if (this.currentWorkIndex < this.works.length - 1) {
          this.nextWork();
        } else {
          this.$router.push('/who-i-am');
        }
      }
    },
    keydown(e) {
      if (e.key === 'ArrowUp') {
        this.previousWork();
      } else if (e.key === 'ArrowDown') {
        this.nextWork();
      }
    },
    nextWork() {
      if (this.currentWorkIndex < this.works.length - 1) {
        this.currentWorkIndex++;
        this.updateWorkDisplay();
      }
    },
    previousWork() {
      if (this.currentWorkIndex > 0) {
        this.currentWorkIndex--;
        this.updateWorkDisplay();
      }
    },
    updateWorkDisplay() {
      this.$store.commit('showWorksObjs', {
        index: this.currentWorkIndex,
        direction: 1
      });
    }
  }
};
</script>

<template lang="pug">
  .works
    .works-content
      .works-header
        h1.works-title Works
        .works-counter {{ currentWorkIndex + 1 }} / {{ works.length }}
      
      .works-main
        .work-info
          h2.work-title {{ currentWork.title }}
          p.work-description {{ currentWork.description }}
          
          .work-details
            .work-year
              span.label Year:
              span.value {{ currentWork.year }}
            
            .work-tech
              span.label Tech:
              .tech-list
                span.tech-item(v-for="tech in currentWork.tech" :key="tech") {{ tech }}
        
        .work-navigation
          button.nav-btn.prev(@click="previousWork" :disabled="currentWorkIndex === 0")
            | ← Previous
          button.nav-btn.next(@click="nextWork" :disabled="currentWorkIndex === works.length - 1")
            | Next →
      
      .works-hint
        p Scroll to navigate • Arrow keys work too
</template>

<style lang="scss">
@import '@/assets/scss/foundation/mixins';

.works {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 10;
}

.works-content {
  max-width: 800px;
  width: 100%;
  color: white;
  text-align: left;
}

.works-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  
  .works-title {
    font-size: 3rem;
    font-weight: 300;
    margin: 0;
  }
  
  .works-counter {
    font-size: 1.2rem;
    opacity: 0.7;
  }
}

.works-main {
  margin-bottom: 3rem;
}

.work-info {
  margin-bottom: 2rem;
  
  .work-title {
    font-size: 2.5rem;
    font-weight: 400;
    margin-bottom: 1rem;
    color: #FFD700; // Golden color
  }
  
  .work-description {
    font-size: 1.3rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
}

.work-details {
  display: flex;
  gap: 3rem;
  margin-bottom: 2rem;
  
  @include l-mobile {
    flex-direction: column;
    gap: 1rem;
  }
  
  .work-year, .work-tech {
    .label {
      display: block;
      font-size: 0.9rem;
      opacity: 0.7;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .value {
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
  
  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    .tech-item {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}

.work-navigation {
  display: flex;
  gap: 1rem;
  
  .nav-btn {
    padding: 0.8rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
}

.works-hint {
  text-align: center;
  opacity: 0.6;
  font-size: 0.9rem;
  
  p {
    margin: 0;
    animation: fadeInOut 2s infinite;
  }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
</style>
