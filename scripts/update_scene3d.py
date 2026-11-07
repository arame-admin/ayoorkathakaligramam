import sys

with open('js/scene3d.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update textures
content = content.replace(
    "'assets/images/kathakali_bust_halfbody.png'",
    "'assets/images/hero_paccha_real_master.png'"
)
content = content.replace(
    "'assets/images/kathakali_depth.png'",
    "'assets/images/hero_paccha_real_depth.png'"
)

# 2. Update displacement
content = content.replace(
    'uDisplacement: { value: 0.38 }',
    'uDisplacement: { value: 0.30 }'
)

# 3. Update geometry
content = content.replace(
    'new THREE.PlaneGeometry(2.84, 3.8, 128, 128);',
    'new THREE.PlaneGeometry(4.88, 3.25, 128, 128);'
)

# 4. Update shader tweaks
content = content.replace(
    'if (texColor.a < 0.04)',
    'if (texColor.a < 0.02)'
)
content = content.replace(
    'float flameLight = uNilavilakkuColor * flameReach * flameFlicker * 0.45 * depth;',
    'float flameLight = uNilavilakkuColor * flameReach * flameFlicker * 0.35 * depth;'
)
content = content.replace(
    'vec3 keyLight = uKeyLightColor * topLight * 0.28 * depth;',
    'vec3 keyLight = uKeyLightColor * topLight * 0.22 * depth;'
)
content = content.replace(
    'float crownMask = clamp((displacedUv.y - 0.42) * 2.2, 0.0, 1.0);',
    'float crownMask = clamp((displacedUv.y - 0.45) * 2.5, 0.0, 1.0);'
)
content = content.replace(
    'vec3 goldSheen = vec3(1.0, 0.88, 0.5) * specularGlint * crownMask * 0.42;',
    'vec3 goldSheen = vec3(1.0, 0.88, 0.5) * specularGlint * crownMask * 0.35;'
)
content = content.replace(
    'float floorFade = smoothstep(0.0, 0.22, displacedUv.y);',
    'float floorFade = smoothstep(0.0, 0.20, displacedUv.y);'
)

# 5. Update responsive positions
# Normalize newlines for replacement
content = content.replace('\r\n', '\n')

old_resp = """  updateResponsivePositions() {
    const isMobile = window.innerWidth < 768;
    if (this.masterMesh) {
      this.masterMesh.position.y = isMobile ? -0.24 : -0.05;
      const s = isMobile ? 0.88 : 1.0;
      this.masterMesh.scale.set(s, s, s);
    }
    if (this.mandalaGroup) {
      this.mandalaGroup.position.y = isMobile ? 0.50 : 0.72;
      const s = isMobile ? 0.85 : 1.0;
      this.mandalaGroup.scale.set(s, s, s);
    }
  }"""

new_resp = """  updateResponsivePositions() {
    const isMobile = window.innerWidth < 768;
    if (this.masterMesh) {
      this.masterMesh.position.y = isMobile ? -0.18 : -0.05;
      const s = isMobile ? 0.95 : 1.0;
      this.masterMesh.scale.set(s, s, s);
    }
    if (this.mandalaGroup) {
      const baseMandalaY = isMobile ? 0.55 : 0.72;
      this.mandalaGroup.position.y = baseMandalaY;
      const s = isMobile ? 0.85 : 1.0;
      this.mandalaGroup.scale.set(s, s, s);
    }
  }"""

content = content.replace(old_resp, new_resp)

old_mandala_anim = """      this.mandalaGroup.position.x = this.mouse.x * 0.18;
      this.mandalaGroup.position.y = 0.72 - this.mouse.y * 0.12 - (this.scrollProgress * 0.4);

      const scale = 1.0 + this.scrollProgress * 0.65;
      this.mandalaGroup.scale.set(scale, scale, scale);"""

new_mandala_anim = """      this.mandalaGroup.position.x = this.mouse.x * 0.18;
      const isMobile = window.innerWidth < 768;
      const baseMandalaY = isMobile ? 0.55 : 0.72;
      this.mandalaGroup.position.y = baseMandalaY - this.mouse.y * 0.12 - (this.scrollProgress * 0.4);

      const baseScale = isMobile ? 0.85 : 1.0;
      const scale = baseScale * (1.0 + this.scrollProgress * 0.65);
      this.mandalaGroup.scale.set(scale, scale, scale);"""

content = content.replace(old_mandala_anim, new_mandala_anim)

with open('js/scene3d.js', 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(content)

print('Updated js/scene3d.js successfully!')
