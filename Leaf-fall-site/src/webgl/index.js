import * as THREE from 'three';

export default class WebGLManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = null;
    this.leaves = [];
    this.isPlaying = false;
    this.animationId = null;
    this.leafTextures = [];
    this.backgroundPlane = null;
    
    // Position camera to see the leaves better
    this.camera.position.set(0, 0, 15);
    this.camera.lookAt(0, 0, 0);
    
    // Bind the animate method to maintain context
    this.animate = this.animate.bind(this);
    
    // Mouse interaction properties
    this.mouse = { x: 0, y: 0 };
    this.mouseTarget = { x: 0, y: 0 };
    this.isMouseOver = false;
    
    // Bind mouse methods
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  start(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    
    try {
      // Initialize renderer
      this.renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: false, // Changed to false to show background
        antialias: true
      });
      
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Canvas positioning
      canvas.style.position = 'fixed';
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.zIndex = '1';
      canvas.style.pointerEvents = 'none';
      canvas.style.display = 'block';
      
      // Create background
      this.createBackground();
      
      // Load leaf textures and then create leaves
      this.loadLeafTextures().then(() => {
        this.createLeaves();
        this.play();
      });
      
      console.log('🍃 WebGL started with beautiful background');
      
      // Add mouse event listeners
      window.addEventListener('mousemove', this.onMouseMove);
      canvas.addEventListener('mouseenter', this.onMouseEnter);
      canvas.addEventListener('mouseleave', this.onMouseLeave);
      
    } catch (error) {
      console.error('WebGL initialization error:', error);
    }
  }

  createBackground() {
    // Create a gradient background
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Create beautiful gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#87CEEB'); // Sky blue
    gradient.addColorStop(0.3, '#98D8E8'); // Light blue
    gradient.addColorStop(0.7, '#F0E68C'); // Khaki
    gradient.addColorStop(1, '#DDA0DD'); // Plum
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add some clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 200;
      const size = 30 + Math.random() * 50;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x + size * 0.5, y, size * 0.8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x - size * 0.5, y, size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Create texture from canvas
    const backgroundTexture = new THREE.CanvasTexture(canvas);
    backgroundTexture.needsUpdate = true;
    
    // Create background plane
    const backgroundGeometry = new THREE.PlaneGeometry(50, 50);
    const backgroundMaterial = new THREE.MeshBasicMaterial({ 
      map: backgroundTexture,
      side: THREE.DoubleSide
    });
    
    this.backgroundPlane = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    this.backgroundPlane.position.z = -10;
    this.scene.add(this.backgroundPlane);
    
    console.log('🌅 Beautiful gradient background created');
  }

  async loadLeafTextures() {
    const leafShapes = this.createLeafShapes();
    
    leafShapes.forEach(canvas => {
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      this.leafTextures.push(texture);
    });
    
    console.log('🍃 Created', this.leafTextures.length, 'leaf textures');
  }

  createLeafShapes() {
    const canvases = [];
    
    // Create 6 different leaf shapes with vibrant header-like colors
    for (let i = 0; i < 6; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 192;
      const ctx = canvas.getContext('2d');
      
      // Create leaf gradient with vibrant header colors
      const gradient = ctx.createLinearGradient(0, 0, 0, 192);
      
      // Vibrant header-inspired colors
      const colors = [
        { h: 45, s: 90, l: 60 },   // Bright Orange
        { h: 280, s: 80, l: 55 },  // Purple
        { h: 195, s: 75, l: 50 },  // Cyan Blue
        { h: 120, s: 70, l: 45 },  // Forest Green
        { h: 15, s: 95, l: 55 },   // Coral Red
        { h: 50, s: 85, l: 60 }    // Golden Yellow
      ];
      
      const color = colors[i];
      gradient.addColorStop(0, `hsl(${color.h + 15}, ${color.s}%, ${color.l + 20}%)`);
      gradient.addColorStop(0.5, `hsl(${color.h}, ${color.s}%, ${color.l}%)`);
      gradient.addColorStop(1, `hsl(${color.h - 15}, ${color.s - 10}%, ${color.l - 20}%)`);
      
      ctx.fillStyle = gradient;
      
      // Draw different leaf shapes
      ctx.beginPath();
      if (i % 3 === 0) {
        // Oak leaf shape
        ctx.moveTo(64, 10);
        ctx.quadraticCurveTo(85, 25, 95, 50);
        ctx.quadraticCurveTo(110, 60, 105, 85);
        ctx.quadraticCurveTo(115, 110, 100, 130);
        ctx.quadraticCurveTo(90, 155, 64, 185);
        ctx.quadraticCurveTo(38, 155, 28, 130);
        ctx.quadraticCurveTo(13, 110, 23, 85);
        ctx.quadraticCurveTo(18, 60, 33, 50);
        ctx.quadraticCurveTo(43, 25, 64, 10);
      } else if (i % 3 === 1) {
        // Maple leaf shape
        ctx.moveTo(64, 10);
        ctx.lineTo(85, 40);
        ctx.lineTo(110, 35);
        ctx.lineTo(95, 65);
        ctx.lineTo(105, 90);
        ctx.lineTo(80, 85);
        ctx.lineTo(64, 185);
        ctx.lineTo(48, 85);
        ctx.lineTo(23, 90);
        ctx.lineTo(33, 65);
        ctx.lineTo(18, 35);
        ctx.lineTo(43, 40);
        ctx.lineTo(64, 10);
      } else {
        // Simple oval leaf
        ctx.moveTo(64, 10);
        ctx.quadraticCurveTo(100, 40, 110, 80);
        ctx.quadraticCurveTo(105, 120, 85, 150);
        ctx.quadraticCurveTo(75, 170, 64, 185);
        ctx.quadraticCurveTo(53, 170, 43, 150);
        ctx.quadraticCurveTo(23, 120, 18, 80);
        ctx.quadraticCurveTo(28, 40, 64, 10);
      }
      
      ctx.closePath();
      ctx.fill();
      
      // Add leaf vein
      ctx.strokeStyle = `hsl(${color.h + 30}, 40%, 25%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(64, 15);
      ctx.lineTo(64, 180);
      ctx.stroke();
      
      // Add side veins
      ctx.lineWidth = 1;
      for (let j = 0; j < 5; j++) {
        const y = 30 + j * 25;
        ctx.beginPath();
        ctx.moveTo(64, y);
        ctx.lineTo(45 + Math.random() * 8, y + 12);
        ctx.moveTo(64, y);
        ctx.lineTo(75 + Math.random() * 8, y + 12);
        ctx.stroke();
      }
      
      canvases.push(canvas);
    }
    
    return canvases;
  }

  createLeaves() {
    if (this.leafTextures.length === 0) {
      console.error('No leaf textures loaded!');
      return;
    }
    
    // Create leaf geometry
    const leafGeometry = new THREE.PlaneGeometry(2.5, 3.5);
    
    for (let i = 0; i < 30; i++) {
      // Random texture
      const texture = this.leafTextures[Math.floor(Math.random() * this.leafTextures.length)];
      
      const leafMaterial = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      
      // Position leaves across the screen
      leaf.position.set(
        (Math.random() - 0.5) * 35,
        Math.random() * 25 + 15,
        (Math.random() - 0.5) * 8
      );
      
      leaf.rotation.z = Math.random() * Math.PI * 2;
      
      this.leaves.push({
        mesh: leaf,
        fallSpeed: 0.015 + Math.random() * 0.025,
        rotSpeed: 0.005 + Math.random() * 0.012,
        swaySpeed: 0.004 + Math.random() * 0.008,
        swayAmount: 1.2 + Math.random() * 1.8,
        initialX: leaf.position.x,
        time: Math.random() * Math.PI * 2
      });
      
      this.scene.add(leaf);
    }
    
    console.log('🍂 Created', this.leaves.length, 'autumn leaves with beautiful textures');
  }

  onMouseMove(event) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    this.mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onMouseEnter() {
    this.isMouseOver = true;
    console.log('🖱️ Mouse entered - leaves will follow cursor!');
  }

  onMouseLeave() {
    this.isMouseOver = false;
    this.mouseTarget.x = 0;
    this.mouseTarget.y = 0;
    console.log('🖱️ Mouse left - leaves return to normal');
  }

  animate() {
    if (!this.isPlaying) return;
    
    try {
      // Smooth mouse following
      this.mouse.x += (this.mouseTarget.x - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouseTarget.y - this.mouse.y) * 0.05;
      
      // Gently rotate background
      if (this.backgroundPlane) {
        this.backgroundPlane.rotation.z += 0.0002;
      }
      
      this.leaves.forEach((leafData, index) => {
        const leaf = leafData.mesh;
        
        leafData.time += 0.016;
        
        // Fall down
        leaf.position.y -= leafData.fallSpeed;
        
        // Gentle rotation
        leaf.rotation.z += leafData.rotSpeed;
        
        // Natural swaying motion
        let swayX = leafData.initialX + 
          Math.sin(leafData.time * leafData.swaySpeed) * leafData.swayAmount +
          Math.sin(leafData.time * leafData.swaySpeed * 0.7) * (leafData.swayAmount * 0.3);
        
        // Add mouse influence when mouse is over canvas
        if (this.isMouseOver) {
          const mouseInfluence = 3; // How strong the mouse effect is
          const distance = Math.sqrt(
            Math.pow(leaf.position.x - this.mouse.x * 15, 2) + 
            Math.pow(leaf.position.y - this.mouse.y * 10, 2)
          );
          
          if (distance < 8) { // If leaf is near mouse
            const force = (8 - distance) / 8; // Stronger effect when closer
            swayX += (this.mouse.x * 15 - leaf.position.x) * force * 0.1;
            leaf.position.y += (this.mouse.y * 10 - leaf.position.y) * force * 0.05;
            
            // Make leaves glow when near mouse
            leaf.material.opacity = 0.9 + force * 0.1;
          } else {
            leaf.material.opacity = 0.9;
          }
        }
        
        leaf.position.x = swayX;
        
        // Slight forward/backward movement for depth
        leaf.position.z += Math.sin(leafData.time * leafData.swaySpeed * 1.3) * 0.05;
        
        // Reset when off screen
        if (leaf.position.y < -25) {
          leaf.position.y = 25 + Math.random() * 10;
          leaf.position.x = (Math.random() - 0.5) * 35;
          leafData.initialX = leaf.position.x;
          leafData.time = Math.random() * Math.PI * 2;
        }
      });
      
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
      
    } catch (error) {
      console.error('Animation error:', error);
      this.stop();
      return;
    }
    
    this.animationId = requestAnimationFrame(this.animate);
  }

  play() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    console.log('🍂 Starting autumn leaf animation with beautiful background!');
    this.animate();
  }

  stop() {
    this.isPlaying = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
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

  // Store compatibility methods - now they actually change the background
  changeBackground(isHome, hasDelay) {
    if (this.backgroundPlane) {
      // Change background color based on page
      const color = isHome ? 0x87CEEB : 0x2F4F4F; // Sky blue for home, dark slate gray for others
      this.renderer.setClearColor(color, 1);
      console.log('🎨 Background changed for', isHome ? 'home' : 'other page');
    }
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
    
    // Remove mouse event listeners
    window.removeEventListener('mousemove', this.onMouseMove);
    if (this.canvas) {
      this.canvas.removeEventListener('mouseenter', this.onMouseEnter);
      this.canvas.removeEventListener('mouseleave', this.onMouseLeave);
    }
    
    this.leaves.forEach((leafData) => {
      this.scene.remove(leafData.mesh);
      leafData.mesh.geometry.dispose();
      leafData.mesh.material.dispose();
    });
    
    if (this.backgroundPlane) {
      this.scene.remove(this.backgroundPlane);
      this.backgroundPlane.geometry.dispose();
      this.backgroundPlane.material.dispose();
    }
    
    this.leafTextures.forEach(texture => {
      texture.dispose();
    });
    
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}