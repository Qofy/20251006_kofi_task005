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
    title: 'Yoichi Kobayashi - Web Developer'
  },
  components: {
    GlobalTitle,
    UtilityNavi,
    WorksNavi,
    Preloader,
    Guide
  },
  async created() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    
    // Store canvas in Vuex
    this.$store.commit('setCanvas', canvas);
    
    // Initialize WebGL
    const WebGLModule = await import('@/webgl/index.js');
    const WebGLManager = WebGLModule.default;
    const webgl = new WebGLManager();
    
    this.$store.commit('initWebGL', webgl);
    
    // Start WebGL with canvas
    webgl.start(canvas, this.$store);
    
    // Force show everything
    this.$store.commit('showView');
    this.$store.commit('showUI');
    
    console.log('🚀 App created - WebGL initialized and started');
  },
  mounted() {
    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.$store.state.webgl) {
        this.$store.state.webgl.resize();
      }
    });
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

#app {
  height: 100vh;
  overflow: hidden;
}
</style>
