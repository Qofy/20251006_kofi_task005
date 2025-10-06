import * as THREE from 'three';

export default class WebGLManager {
  constructor() {
    // Don't make these reactive - keep them as plain objects
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = null;
    this.leaves = [];
    this.isPlaying = false;
    this.animationId = null;
    
    // Setup camera
    this.camera.position.z = 8;
  }

  start(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    
    try {
      // Initialize renderer
      this.renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });
      
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor(0x000000, 0);
      
      // Make sure canvas is visible
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '1';
      canvas.style.pointerEvents = 'none';
      
      // Create leaves
      this.createLeaves();
      
      // Start animation loop
      this.play();
      
      console.log('WebGL Manager started with', this.leaves.length, 'leaves');
      
    } catch (error) {
      console.error('WebGL initialization error:', error);
    }
  }

  createLeaves() {
    // Simple geometry that won't cause matrix issues
    const leafGeometry = new THREE.PlaneGeometry(0.4, 0.6);
    
    // Create leaves
    for (let i = 0; i < 10; i++) {
      const hue = 0.1 + Math.random() * 0.3; // Green to yellow range
      const leafMaterial = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color().setHSL(hue, 0.8, 0.6),
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      
      // Initial position
      leaf.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 10 + 5,
        (Math.random() - 0.5) * 5
      );
      
      // Initial rotation
      leaf.rotation.z = Math.random() * Math.PI * 2;
      
      // Store animation properties (not on userData to avoid Vue reactivity)
      this.leaves.push({
        mesh: leaf,
        fallSpeed: 0.02 + Math.random() * 0.03,
        rotSpeed: 0.01 + Math.random() * 0.02,
        swaySpeed: 0.02 + Math.random() * 0.03,
        swayAmount: 1 + Math.random() * 2,
        initialX: leaf.position.x,
        time: Math.random() * Math.PI * 2
      });
      
      this.scene.add(leaf);
    }
  }

  animate = () => {
    if (!this.isPlaying) return;
    
    try {
      // Update leaves
      this.leaves.forEach((leafData) => {
        const leaf = leafData.mesh;
        
        // Update time
        leafData.time += 0.016;
        
        // Fall down
        leaf.position.y -= leafData.fallSpeed;
        
        // Gentle rotation
        leaf.rotation.z += leafData.rotSpeed;
        
        // Horizontal sway
        leaf.position.x = leafData.initialX + Math.sin(leafData.time * leafData.swaySpeed) * leafData.swayAmount;
        
        // Reset when leaf falls off screen
        if (leaf.position.y < -10) {
          leaf.position.y = 10 + Math.random() * 5;
          leaf.position.x = (Math.random() - 0.5) * 20;
          leafData.initialX = leaf.position.x;
          leafData.time = Math.random() * Math.PI * 2;
        }
      });
      
      // Render
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
      
    } catch (error) {
      console.error('Animation error:', error);
      this.stop();
      return;
    }
    
    // Continue animation
    this.animationId = requestAnimationFrame(this.animate);
  }

  play() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    console.log('🍃 Leaf animation started!');
    this.animate();
  }

  stop() {
    this.isPlaying = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  resize() {
    if (!this.renderer) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // Store compatibility methods - just log for now
  changeBackground(isHome, hasDelay) {
    console.log('🎨 Background change:', isHome ? 'home' : 'other');
  }

  showHomeObjs(bool) {
    console.log('🏠 Show home objects:', bool);
  }

  showWorksObjs(index, direction, positionFromWorks) {
    console.log('💼 Show works objects:', { index, direction, positionFromWorks });
  }

  showWhoIAmObjs(bool) {
    console.log('👤 Show who-i-am objects:', bool);
  }

  dispose() {
    this.stop();
    
    // Clean up
    this.leaves.forEach((leafData) => {
      this.scene.remove(leafData.mesh);
      leafData.mesh.geometry.dispose();
      leafData.mesh.material.dispose();
    });
    
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}