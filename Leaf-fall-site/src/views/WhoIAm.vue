<script>
import normalizeWheel from 'normalize-wheel';
import sleep from '@/utils/sleep';
import WhoIAmHeading from '@/components/who-i-am/WhoIAmHeading.vue';
import WhoIAmSection from '@/components/who-i-am/WhoIAmSection.vue';
import WhoIAmLinks from '@/components/who-i-am/WhoIAmLinks.vue';
import WhoIAmThanks from '@/components/who-i-am/WhoIAmThanks.vue';

export default {
  name: 'WhoIAm',
  metaInfo: {
    title: 'Who I Am / '
  },
  components: {
    WhoIAmHeading,
    WhoIAmSection,
    WhoIAmLinks,
    WhoIAmThanks
  },
  data() {
    return {
      skills: [
        'JavaScript', 'Vue.js', 'Three.js', 'WebGL', 'GLSL',
        'HTML5', 'CSS3', 'Node.js', 'Creative Coding', 'Interactive Design'
      ],
      experience: [
        {
          title: 'Creative Developer',
          company: 'Digital Agency',
          period: '2022 - Present',
          description: 'Creating interactive web experiences with WebGL and modern JavaScript frameworks.'
        },
        {
          title: 'Frontend Developer',
          company: 'Tech Startup',
          period: '2020 - 2022',
          description: 'Built responsive web applications and implemented complex animations.'
        }
      ]
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit('transit', {
        globalId: 2
      });
    });
  },
  created() {
    window.addEventListener('wheel', this.wheel, { passive: false });
  },
  async mounted() {
    this.$store.commit('changeBackground', {
      isHome: false,
      hasDelay: false
    });
    this.$store.commit('showHomeObjs', false);
    this.$store.commit('showWorksObjs', {
      direction: -1
    });
    this.$store.commit('showWhoIAmObjs', true);
    await sleep(500);
    this.$store.commit('showUI');
  },
  destroyed() {
    window.removeEventListener('wheel', this.wheel, { passive: false });
  },
  methods: {
    wheel(e) {
      e.preventDefault();
      const n = normalizeWheel(e);
      
      if (Math.abs(n.pixelY) < 10) return;
      
      if (n.pixelY < 0) {
        // Scroll up - go back to works
        this.$router.push('/works');
      }
    }
  }
};
</script>

<template lang="pug">
  .who-i-am
    .who-i-am-content
      .section.intro
        h1.main-title Who I Am
        p.intro-text
          | I'm a passionate web developer who loves creating beautiful, 
          | interactive experiences on the World Wide Web. I specialize in 
          | combining modern web technologies with creative coding to bring 
          | digital ideas to life.
      
      .section.about
        h2.section-title About Me
        p.about-text
          | With a background in both design and development, I bridge the gap 
          | between aesthetics and functionality. I'm particularly fascinated by 
          | WebGL, creative animations, and the endless possibilities of what 
          | we can create in the browser.
        
        p.about-text
          | When I'm not coding, you can find me exploring nature, drawing 
          | inspiration from organic forms and natural phenomena - which often 
          | find their way into my digital creations.
      
      .section.skills
        h2.section-title Skills & Technologies
        .skills-grid
          .skill-item(v-for="skill in skills" :key="skill") {{ skill }}
      
      .section.experience
        h2.section-title Experience
        .experience-list
          .experience-item(v-for="exp in experience" :key="exp.title")
            .exp-header
              h3.exp-title {{ exp.title }}
              span.exp-period {{ exp.period }}
            .exp-company {{ exp.company }}
            p.exp-description {{ exp.description }}
      
      .section.contact
        h2.section-title Let's Connect
        p.contact-text
          | I'm always interested in new opportunities and collaborations. 
          | Feel free to reach out if you'd like to work together!
        
        .contact-links
          a.contact-link(href="mailto:hello@example.com") Email
          a.contact-link(href="#") GitHub
          a.contact-link(href="#") LinkedIn
          a.contact-link(href="#") Twitter
      
      .who-i-am-hint
        p Scroll up to go back to works
</template>

<style lang="scss">
@import '@/assets/scss/foundation/mixins';

.who-i-am {
  min-height: 100vh;
  padding: 4rem 2rem;
  position: relative;
  z-index: 10;
  
  @include l-mobile {
    padding: 2rem 1rem;
  }
}

.who-i-am-content {
  max-width: 900px;
  margin: 0 auto;
  color: white;
}

.section {
  margin-bottom: 4rem;
  
  &.intro {
    text-align: center;
    margin-bottom: 5rem;
    
    .main-title {
      font-size: 4rem;
      font-weight: 300;
      margin-bottom: 2rem;
      
      @include l-mobile {
        font-size: 2.5rem;
      }
    }
    
    .intro-text {
      font-size: 1.4rem;
      line-height: 1.7;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #FFD700;
  
  @include l-mobile {
    font-size: 2rem;
  }
}

.about-text {
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  
  .skill-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-3px);
    }
  }
}

.experience-list {
  .experience-item {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    border-left: 4px solid #FFD700;
    
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      
      @include l-mobile {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .exp-title {
        font-size: 1.5rem;
        font-weight: 500;
        margin: 0;
      }
      
      .exp-period {
        font-size: 0.9rem;
        opacity: 0.7;
        background: rgba(255, 255, 255, 0.1);
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
      }
    }
    
    .exp-company {
      font-size: 1.1rem;
      color: #87CEEB;
      margin-bottom: 1rem;
    }
    
    .exp-description {
      font-size: 1rem;
      line-height: 1.6;
      opacity: 0.9;
      margin: 0;
    }
  }
}

.contact-text {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.contact-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  
  .contact-link {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  }
}

.who-i-am-hint {
  text-align: center;
  margin-top: 4rem;
  opacity: 0.6;
  
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
