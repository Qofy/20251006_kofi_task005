import * as THREE from 'three';

export default class WebGLManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = null;
    this.leaves = [];
    this.isPlaying = false;
    
    // Setup camera
    this.camera.position.z = 5;
  }

  start(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    
    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    
    // Make sure canvas is visible
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    
    // Create some basic leaves
    this.createLeaves();
    
    console.log('WebGL Manager started with', this.leaves.length, 'leaves');
  }

  createLeaves() {
    const leafGeometry = new THREE.PlaneGeometry(0.3, 0.4);
    
    // Create multiple leaves with different colors
    for (let i = 0; i < 30; i++) {
      const leafMaterial = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color().setHSL(0.3 + Math.random() * 0.2, 0.7, 0.5),
        transparent: true,
        opacity: 0.8
      });
      
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      
      // Random starting position
      leaf.position.x = (Math.random() - 0.5) * 20;
      leaf.position.y = Math.random() * 10 + 5;
      leaf.position.z = (Math.random() - 0.5) * 5;
      
      // Add some rotation
      leaf.rotation.z = Math.random() * Math.PI;
      
      // Store fall speed
      leaf.userData.fallSpeed = 0.02 + Math.random() * 0.03;
      leaf.userData.rotationSpeed = 0.01 + Math.random() * 0.02;
      
      this.leaves.push(leaf);
      this.scene.add(leaf);
    }
  }

  update() {
    if (!this.isPlaying) return;
    
    // Animate leaves falling
    this.leaves.forEach(leaf => {
      leaf.position.y -= leaf.userData.fallSpeed;
      leaf.rotation.z += leaf.userData.rotationSpeed;
      
      // Add some horizontal sway
      leaf.position.x += Math.sin(Date.now() * 0.001 + leaf.position.y) * 0.01;
      
      // Reset leaf position when it falls too low
      if (leaf.position.y < -10) {
        leaf.position.y = 10;
        leaf.position.x = (Math.random() - 0.5) * 20;
      }
    });
    
    this.render();
  }

  render() {
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  play() {
    this.isPlaying = true;
    console.log('WebGL leaf animation started - you should see falling leaves!');
  }

  resize() {
    if (!this.renderer) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // Store compatibility methods
  changeBackground(isHome, hasDelay) {}
  showHomeObjs(bool) {}
  showWorksObjs(index, direction, positionFromWorks) {}
  showWhoIAmObjs(bool) {}
}