/**
 * Three.js 3D Cinematic Atmosphere & Depth-Displaced Hologram
 * Ayroor Kathakali Gramam Hero Masterpiece
 * 
 * Features:
 * - Real 3D Depth-Displaced Holographic Kathakali Paccha Master
 * - Optical Parallax Raymarching & Dynamic Specular Golden Sheen
 * - Procedural Nilavilakku (Sacred Kerala Oil Lamp) Flickering Flame Light
 * - 3D Sacred Temple Yantra / Mandala Geometry Ring (24 Classical Mudra Rays)
 * - Volumetric 3D Temple Embers & Sacred Particle System
 * - Smooth Mouse Parallax, Camera Dolly-in & Scroll Synchronization
 */

import * as THREE from '../libs/three.module.js';

export class HeroScene3D {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.isWebGLAvailable = this.checkWebGL();
    if (!this.isWebGLAvailable) {
      this.setupFallback();
      return;
    }

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0, prevX: 0, prevY: 0, speed: 0 };
    this.scrollProgress = 0;
    this.startTime = performance.now();
    this.isVisible = true;

    this.initScene();
    this.initLights();
    this.initMandala();
    this.initDepthDisplacedMaster();
    this.initTempleEmbers();
    this.updateResponsivePositions();
    this.bindEvents();
    this.animate();
  }

  checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  setupFallback() {
    if (this.container) {
      this.container.classList.add('webgl-fallback');
    }
    const masterStage = document.querySelector('.hero-master-stage');
    if (masterStage) {
      masterStage.style.display = 'flex';
      masterStage.style.opacity = '1';
    }
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030404, 0.035);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 5.0);
    this.cameraBasePos = this.camera.position.clone();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.renderer.domElement.className = 'three-canvas';
    this.container.appendChild(this.renderer.domElement);

    // When 3D is active, the 3D canvas renders the master
    const masterStage = document.querySelector('.hero-master-stage');
    if (masterStage) {
      masterStage.style.opacity = '0';
      masterStage.style.pointerEvents = 'none';
    }
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0x060807, 0.4);
    this.scene.add(ambientLight);

    this.overheadKey = new THREE.DirectionalLight(0xFFE8C2, 1.2);
    this.overheadKey.position.set(0, 5, 3.5);
    this.scene.add(this.overheadKey);

    this.nilavilakkuLight = new THREE.PointLight(0xFFA533, 2.4, 6.0, 2);
    this.nilavilakkuLight.position.set(0, -2.0, 1.8);
    this.scene.add(this.nilavilakkuLight);

    this.cursorLight = new THREE.PointLight(0xFFD580, 0.8, 4.5, 2);
    this.cursorLight.position.set(0, 0, 2.5);
    this.scene.add(this.cursorLight);
  }

  initMandala() {
    this.mandalaGroup = new THREE.Group();
    this.mandalaGroup.position.set(0, 0.72, -0.45);

    const goldMaterial = new THREE.MeshBasicMaterial({
      color: 0xE8C37B,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65
    });

    const dimGoldMaterial = new THREE.MeshBasicMaterial({
      color: 0xB88B35,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });

    // Ring 1 (Inner golden halo)
    const ring1 = new THREE.Mesh(new THREE.RingGeometry(1.02, 1.04, 64), goldMaterial);
    this.mandalaGroup.add(ring1);

    // Ring 2 (Middle sacred perimeter)
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(1.18, 1.20, 64), dimGoldMaterial);
    this.mandalaGroup.add(ring2);

    // Ring 3 (Outer cosmic boundary)
    const ring3 = new THREE.Mesh(new THREE.RingGeometry(1.36, 1.38, 64), goldMaterial);
    this.mandalaGroup.add(ring3);

    // 24 Sacred Mudra Radial Rays
    const rayGeometry = new THREE.BufferGeometry();
    const rayPositions = [];
    const rayCount = 24;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const innerR = 1.04;
      const outerR = (i % 2 === 0) ? 1.36 : 1.24;
      rayPositions.push(
        Math.cos(angle) * innerR, Math.sin(angle) * innerR, 0,
        Math.cos(angle) * outerR, Math.sin(angle) * outerR, 0
      );
    }
    rayGeometry.setAttribute('position', new THREE.Float32BufferAttribute(rayPositions, 3));
    const rayMaterial = new THREE.LineBasicMaterial({
      color: 0xF3CA75,
      transparent: true,
      opacity: 0.45
    });
    const rays = new THREE.LineSegments(rayGeometry, rayMaterial);
    this.mandalaGroup.add(rays);

    // Subtle golden sunburst particles along outer circumference
    const dotCount = 48;
    const dotGeo = new THREE.BufferGeometry();
    const dotPos = [];
    for (let i = 0; i < dotCount; i++) {
      const angle = (i / dotCount) * Math.PI * 2;
      dotPos.push(Math.cos(angle) * 1.37, Math.sin(angle) * 1.37, 0);
    }
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPos, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0xFFE2A3,
      size: 0.035,
      transparent: true,
      opacity: 0.75
    });
    this.mandalaGroup.add(new THREE.Points(dotGeo, dotMat));

    this.scene.add(this.mandalaGroup);
  }

  initDepthDisplacedMaster() {
    const textureLoader = new THREE.TextureLoader();

    const colorTexture = textureLoader.load('assets/images/hero_paccha_real_master.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
    });

    const depthTexture = textureLoader.load('assets/images/hero_paccha_real_depth.png');

    this.masterUniforms = {
      uTexture: { value: colorTexture },
      uDepthMap: { value: depthTexture },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0.0 },
      uScroll: { value: 0.0 },
      uDisplacement: { value: 0.30 },
      uNilavilakkuColor: { value: new THREE.Color(0xFFA533) },
      uKeyLightColor: { value: new THREE.Color(0xFFE8C2) }
    };

    const vertexShader = `
      uniform sampler2D uDepthMap;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uDisplacement;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying float vDepth;

      void main() {
        vUv = uv;
        float depth = texture2D(uDepthMap, uv).r;
        vDepth = depth;

        vec3 displacedPosition = position;
        float zDisp = depth * uDisplacement;
        displacedPosition.z += zDisp;

        // Subtle organic breathing motion
        displacedPosition.y += sin(uTime * 1.6 + depth * 2.0) * 0.02 * depth;

        // Mouse 3D tilt transformation directly in vertex stage
        float tiltX = uMouse.y * 0.15 * depth;
        float tiltY = uMouse.x * 0.22 * depth;
        displacedPosition.x += tiltY;
        displacedPosition.y += tiltX;

        vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
        vViewPosition = -mvPosition.xyz;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform sampler2D uDepthMap;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uScroll;
      uniform vec3 uKeyLightColor;
      uniform vec3 uNilavilakkuColor;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying float vDepth;

      void main() {
        float depth = texture2D(uDepthMap, vUv).r;

        // Optical parallax offset: foreground elements shift more than background
        vec2 parallax = uMouse * (depth * 0.032);
        vec2 displacedUv = clamp(vUv - parallax, vec2(0.001), vec2(0.999));

        vec4 texColor = texture2D(uTexture, displacedUv);

        if (texColor.a < 0.02) {
          discard;
        }

        // 1. Procedural Nilavilakku (Sacred Kerala Oil Lamp) Flame Simulation:
        float flameFlicker = sin(uTime * 14.0) * 0.06 + sin(uTime * 27.0) * 0.03 + sin(uTime * 43.0) * 0.015 + 1.0;
        float flameReach = clamp(1.0 - displacedUv.y * 1.1, 0.0, 1.0);
        vec3 flameLight = uNilavilakkuColor * flameReach * flameFlicker * 0.45 * depth;

        // 2. Theatrical Overhead Sacred Sunburst / Key Light:
        float topLight = clamp(displacedUv.y * 1.2 - 0.2, 0.0, 1.0);
        vec3 keyLight = uKeyLightColor * topLight * 0.22 * depth;

        // 3. Specular Golden Rim Sheen on Kireedam Crown and Kasumala:
        float crownMask = clamp((displacedUv.y - 0.45) * 2.5, 0.0, 1.0);
        float mouseDist = length(uMouse - (displacedUv * 2.0 - 1.0));
        float mouseProximity = clamp(1.0 - mouseDist * 0.5, 0.0, 1.0);
        float specularGlint = pow(depth, 3.0) * (sin(uTime * 2.0 + depth * 8.0) * 0.35 + 0.65) * mouseProximity;
        vec3 goldSheen = vec3(1.0, 0.88, 0.5) * specularGlint * crownMask * 0.35;

        // 4. Subtle Sacred Aura bloom around outer edges
        float edgeGlow = smoothstep(0.05, 0.35, depth) * (1.0 - smoothstep(0.7, 0.95, depth));
        vec3 aura = vec3(0.85, 0.65, 0.25) * edgeGlow * 0.12;

        // 5. Vertical floor dissolve: lower torso smoothly fades into stage floor
        float floorFade = smoothstep(0.0, 0.20, displacedUv.y);
        float finalAlpha = texColor.a * floorFade;

        vec3 finalColor = texColor.rgb + flameLight + keyLight + goldSheen + aura;

        gl_FragColor = vec4(finalColor, finalAlpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: this.masterUniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const geometry = new THREE.PlaneGeometry(4.88, 3.25, 128, 128);
    this.masterMesh = new THREE.Mesh(geometry, material);
    this.masterMesh.position.set(0, -0.05, 0);
    this.scene.add(this.masterMesh);
  }

  initTempleEmbers() {
    this.emberCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.emberCount * 3);
    const speeds = new Float32Array(this.emberCount);
    const phases = new Float32Array(this.emberCount);

    for (let i = 0; i < this.emberCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 6.0;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.5 - 0.2;
      speeds[i] = 0.25 + Math.random() * 0.45;
      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.emberSpeeds = speeds;
    this.emberPhases = phases;

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 220, 140, 1.0)');
    grad.addColorStop(0.35, 'rgba(255, 165, 50, 0.7)');
    grad.addColorStop(0.7, 'rgba(210, 110, 20, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const emberTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.055,
      map: emberTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65
    });

    this.embers = new THREE.Points(geometry, material);
    this.scene.add(this.embers);
  }
  updateResponsivePositions() {
    const isMobile = window.innerWidth < 768;
    if (this.masterMesh) {
      this.masterMesh.position.y = isMobile ? -0.22 : -0.05;
      const s = isMobile ? 0.95 : 1.0;
      this.masterMesh.scale.set(s, s, s);
    }
    if (this.mandalaGroup) {
      const baseMandalaY = isMobile ? 0.46 : 0.72;
      this.mandalaGroup.position.y = baseMandalaY;
      const s = isMobile ? 0.85 : 1.0;
      this.mandalaGroup.scale.set(s, s, s);
    }
  }


  bindEvents() {
    this.onMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      const newTargetX = (e.clientX - halfW) / halfW;
      const newTargetY = (e.clientY - halfH) / halfH;

      const dx = newTargetX - this.mouse.targetX;
      const dy = newTargetY - this.mouse.targetY;
      this.mouse.speed = Math.sqrt(dx * dx + dy * dy);

      this.mouse.targetX = newTargetX;
      this.mouse.targetY = newTargetY;
    };
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });

    this.onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        this.mouse.targetX = (touch.clientX - halfW) / halfW * 0.45;
        this.mouse.targetY = (touch.clientY - halfH) / halfH * 0.45;
      }
    };
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });

    this.onResize = () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.updateResponsivePositions();
    };
    window.addEventListener('resize', this.onResize);

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    this.observer.observe(this.container);
  }

  updateScroll(progress) {
    this.scrollProgress = progress;
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    const time = (performance.now() - this.startTime) * 0.001;

    // 1. Mouse smooth interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // 2. Update Shader Uniforms
    if (this.masterUniforms) {
      this.masterUniforms.uMouse.value.set(this.mouse.x, this.mouse.y);
      this.masterUniforms.uTime.value = time;
      this.masterUniforms.uScroll.value = this.scrollProgress;
    }

    // 3. Sacred Golden Mandala Animation
    if (this.mandalaGroup) {
      this.mandalaGroup.rotation.z += 0.0012;
      this.mandalaGroup.rotation.y = this.mouse.x * 0.28;
      this.mandalaGroup.rotation.x = -this.mouse.y * 0.18;
      this.mandalaGroup.position.x = this.mouse.x * 0.18;
      const isMobile = window.innerWidth < 768;
      const baseMandalaY = isMobile ? 0.46 : 0.72;
      this.mandalaGroup.position.y = baseMandalaY - this.mouse.y * 0.12 - (this.scrollProgress * 0.4);

      const baseScale = isMobile ? 0.85 : 1.0;
      const scale = baseScale * (1.0 + this.scrollProgress * 0.65);
      this.mandalaGroup.scale.set(scale, scale, scale);
    }

    // 4. Update Nilavilakku Flame Light
    if (this.nilavilakkuLight) {
      const flicker = Math.sin(time * 16.0) * 0.18 + Math.sin(time * 28.0) * 0.08 + 2.3;
      this.nilavilakkuLight.intensity = flicker;
      this.nilavilakkuLight.position.x = this.mouse.x * 0.4;
    }

    // 5. Cursor Light
    if (this.cursorLight) {
      this.cursorLight.position.x = this.mouse.x * 2.2;
      this.cursorLight.position.y = -this.mouse.y * 1.8;
    }

    // 6. Temple Embers Drift & Swirl Physics
    if (this.embers) {
      const positions = this.embers.geometry.attributes.position.array;
      const count = this.emberCount;
      const dt = 0.016;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        positions[idx + 1] += this.emberSpeeds[i] * dt;
        positions[idx + 0] += Math.sin(time * 1.2 + this.emberPhases[i]) * 0.003;

        // Cursor wind turbulence
        const dx = positions[idx + 0] - this.mouse.x * 2.0;
        const dy = positions[idx + 1] - (-this.mouse.y * 2.0);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.0) {
          const force = (1.0 - dist) * 0.015;
          positions[idx + 0] += (dx / dist) * force;
          positions[idx + 1] += (dy / dist) * force;
        }

        // Reset if reached top
        if (positions[idx + 1] > 3.2) {
          positions[idx + 1] = -2.8;
          positions[idx + 0] = (Math.random() - 0.5) * 5.5;
          positions[idx + 2] = (Math.random() - 0.5) * 3.0;
        }
      }
      this.embers.geometry.attributes.position.needsUpdate = true;
    }

    // 7. Camera Dynamics (3D Parallax Tilt & Smooth Dolly-In on Scroll)
    const scroll = this.scrollProgress;
    this.camera.position.x = this.cameraBasePos.x + (this.mouse.x * 0.32);
    this.camera.position.y = this.cameraBasePos.y - (this.mouse.y * 0.22) - (scroll * 0.7);
    this.camera.position.z = this.cameraBasePos.z - (scroll * 1.6);

    const lookTarget = new THREE.Vector3(
      this.mouse.x * 0.12,
      - (this.mouse.y * 0.08) - (scroll * 0.35),
      0
    );
    this.camera.lookAt(lookTarget);

    // 8. Render
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.observer) this.observer.disconnect();
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('resize', this.onResize);
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
