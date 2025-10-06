<script>
import * as THREE from 'three';
import sleep from '@/utils/sleep';
import debounce from '@/utils/debounce';

import GlobalTitle from '@/components/global/GlobalTitle.vue';
import UtilityNavi from '@/components/global/UtilityNavi.vue';
import WorksNavi from '@/components/global/WorksNavi.vue';
import Preloader from '@/components/global/Preloader.vue';
import Guide from '@/components/global/Guide.vue';

export default {
  name: 'App',
  metaInfo: {
    title: '',
    titleTemplate: '%sYoichi Kobayashi',
    meta: [
      {
        name: 'description',
        content: "I'm a Web Developer.Just love World-Wide-Web."
      }
    ]
  },
  components: {
    GlobalTitle,
    UtilityNavi, 
    WorksNavi,
    Preloader,
    Guide
  },
  data() {
    return {
      vTouchStart: new THREE.Vector2(),
      vTouchMoveStart: new THREE.Vector2(),
      vTouchMove: new THREE.Vector2(),
      isTouchMoving: false
    };
  },
  async created() {
    // Initialize WebGL
    const WebGLManager = await import('@/webgl/index.js');
    const webgl = new WebGLManager.default();
    
    this.$store.commit('initWebGL', webgl);
    
    // Start WebGL with canvas and store
    webgl.start(this.$store.state.canvas, this.$store);
    
    // Remove the continuous update loop - WebGL handles its own animation
    console.log('🚀 App created - WebGL should be running!');
  },
  computed: {
    transitionName() {
      return this.$store.state.isTransitionDescend === true
        ? 'view'
        : 'view-asc';
    }
  },
  methods: {
    resize() {
      const { canvas, resolution, webgl } = this.$store.state;

      resolution.set(document.body.clientWidth, window.innerHeight);
      canvas.width = resolution.x;
      canvas.height = resolution.y;
      this.$store.commit('changeMediaQuery', resolution.x < 768);
      webgl.resize();
    },
    mousemove(e) {
      if (
        this.$store.state.isShownUI === false ||
        this.$store.state.isEnabledTouch === true
      ) {
        return;
      }

      const { resolution, mouse, mousePrev, mouseForce } = this.$store.state;

      if (mousePrev.length() !== 0) mousePrev.copy(mouse);
      mouse.set(
        (e.clientX / resolution.x) * 2 - 1,
        -(e.clientY / resolution.y) * 2 + 1
      );
      if (mousePrev.length() === 0) mousePrev.copy(mouse);
      mouseForce.copy(mouse.clone().sub(mousePrev));
    },
    mouseleave() {
      const { mouse, mousePrev, mouseForce } = this.$store.state;

      mouse.set(0, 0);
      mousePrev.set(0, 0);
      mouseForce.set(0, 0);
    },
    touchstart(e) {
      const { commit } = this.$store;

      commit('setEnabledTouch', true);
      commit('startTouch');
      this.vTouchStart.set(e.touches[0].clientX, e.touches[0].clientY);
      this.vTouchMove.set(e.touches[0].clientX, e.touches[0].clientY);
    },
    touchmove(e) {
      const { state, commit } = this.$store;

      if (state.isTouchStarted === false) return;
      this.vTouchMove.set(e.touches[0].clientX, e.touches[0].clientY);
      if (state.isTouchMoving === false) {
        // judge whether the touch is a swipe or a single tap.
        if (
          this.vTouchStart
            .clone()
            .sub(this.vTouchMove)
            .length() > 3
        ) {
          this.vTouchMoveStart.set(e.touches[0].clientX, e.touches[0].clientY);
          commit('startTouchMove');
        }
      } else {
        // judge whether the swipe direction is X or Y.
        commit('touchMove', {
          x: this.vTouchMove.x - this.vTouchMoveStart.x,
          y: this.vTouchMove.y - this.vTouchMoveStart.y
        });
      }
    },
    touchend() {
      this.$store.commit('touchEnd');
    }
  }
};
</script>

<template lang="pug">
  #app
    Preloader(v-if="$store.state.isShownPreloader && !$store.state.isLoaded")
    router-view(v-if="$store.state.isShowView")
    GlobalTitle
    UtilityNavi
    WorksNavi
    Guide
</template>

<style lang="scss">
@import '@/assets/scss/foundation/font.scss';

@import '@/assets/scss/foundation/normalize.scss';
@import '@/assets/scss/foundation/global.scss';
@import '@/assets/scss/foundation/keyframes.scss';
@import '@/assets/scss/object/project/view-wrap.scss';
</style>
