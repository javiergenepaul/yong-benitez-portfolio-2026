"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function SpaceBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x07091a, 1)
    mountRef.current.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000)
    camera.position.z = 80

    // ── Star texture ──────────────────────────────────────────────────────────
    const starCanvas = document.createElement("canvas")
    starCanvas.width = 32; starCanvas.height = 32
    const ctx2d = starCanvas.getContext("2d")!
    const grd = ctx2d.createRadialGradient(16, 16, 0, 16, 16, 16)
    grd.addColorStop(0,    "rgba(255,255,255,1)")
    grd.addColorStop(0.25, "rgba(210,225,255,0.9)")
    grd.addColorStop(0.6,  "rgba(140,170,255,0.3)")
    grd.addColorStop(1,    "rgba(80,100,255,0)")
    ctx2d.fillStyle = grd
    ctx2d.fillRect(0, 0, 32, 32)
    const starTex = new THREE.CanvasTexture(starCanvas)

    // ── Stars ─────────────────────────────────────────────────────────────────
    const STAR_COUNT = 3200
    const starPos = new Float32Array(STAR_COUNT * 3)
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 200 + Math.random() * 800
      starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPos[i * 3 + 2] = r * Math.cos(phi)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({
      size: 1.4, sizeAttenuation: true, map: starTex,
      transparent: true, opacity: 0.92, depthWrite: false,
    })
    const starField = new THREE.Points(starGeo, starMat)
    scene.add(starField)

    // ── Nebula blobs ──────────────────────────────────────────────────────────
    const nebulaCanvas = document.createElement("canvas")
    nebulaCanvas.width = 128; nebulaCanvas.height = 128
    const nctx = nebulaCanvas.getContext("2d")!
    const ngrd = nctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    ngrd.addColorStop(0,   "rgba(160,40,220,0.18)")
    ngrd.addColorStop(0.4, "rgba(100,20,180,0.08)")
    ngrd.addColorStop(1,   "rgba(0,0,80,0)")
    nctx.fillStyle = ngrd
    nctx.fillRect(0, 0, 128, 128)
    const nebulaTex = new THREE.CanvasTexture(nebulaCanvas)
    for (const [x, y, z, s] of [[-120,60,-300,220],[200,-80,-400,180],[-50,-150,-350,160],[150,120,-450,200]] as [number,number,number,number][]) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: nebulaTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
      sp.position.set(x, y, z); sp.scale.setScalar(s); scene.add(sp)
    }

    // ── Solar System ──────────────────────────────────────────────────────────
    // Shared glow texture (used for sun corona + planet atmosphere)
    function makeGlowTex(innerColor: string, outerColor: string, size = 128): THREE.CanvasTexture {
      const c = document.createElement("canvas")
      c.width = size; c.height = size
      const cx = c.getContext("2d")!
      const g = cx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      g.addColorStop(0,   innerColor)
      g.addColorStop(0.35, outerColor)
      g.addColorStop(1,   "rgba(0,0,0,0)")
      cx.fillStyle = g
      cx.fillRect(0, 0, size, size)
      return new THREE.CanvasTexture(c)
    }

    // Solar system group — subtle background element, not the focal point
    const solarSystem = new THREE.Group()
    solarSystem.position.set(-35, 12, -200)
    solarSystem.rotation.x =  0.32
    solarSystem.rotation.z = -0.08
    solarSystem.scale.setScalar(0.82)   // kept small — background accent only
    scene.add(solarSystem)

    // ─── Sun ─────────────────────────────────────────────────────────────────
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xcc9922 }),
    )
    solarSystem.add(sun)

    // Sun corona (layered glow sprites)
    const sunGlow1 = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTex("rgba(255,220,60,0.20)", "rgba(255,140,0,0.05)"),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }))
    sunGlow1.scale.setScalar(28)
    solarSystem.add(sunGlow1)

    const sunGlow2 = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTex("rgba(255,255,180,0.08)", "rgba(255,100,0,0.02)", 256),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }))
    sunGlow2.scale.setScalar(60)
    solarSystem.add(sunGlow2)

    // ─── Planets ─────────────────────────────────────────────────────────────
    const PLANET_DATA = [
      { name: "Mercury", radius: 0.30, orbit: 9,   speed: 0.026, color: 0x999999, tilt: 0.04 },
      { name: "Venus",   radius: 0.55, orbit: 13,  speed: 0.018, color: 0xddaa77, tilt: 0.02 },
      { name: "Earth",   radius: 0.62, orbit: 18,  speed: 0.013, color: 0x2277ee, tilt: 0.04 },
      { name: "Mars",    radius: 0.40, orbit: 24,  speed: 0.009, color: 0xcc3311, tilt: 0.08 },
      { name: "Jupiter", radius: 1.50, orbit: 35,  speed: 0.005, color: 0xddbb88, tilt: 0.02 },
      { name: "Saturn",  radius: 1.25, orbit: 46,  speed: 0.003, color: 0xccbb77, tilt: 0.05 },
      { name: "Uranus",  radius: 0.95, orbit: 57,  speed: 0.002, color: 0x77ddee, tilt: 0.06 },
      { name: "Neptune", radius: 0.90, orbit: 66,  speed: 0.001, color: 0x2244ee, tilt: 0.03 },
    ] as const

    interface PlanetEntry {
      pivot:      THREE.Object3D
      mesh:       THREE.Mesh
      speed:      number
      selfSpin:   number
      moon?:      { pivot: THREE.Object3D; speed: number }
    }
    const planets: PlanetEntry[] = []

    for (const pd of PLANET_DATA) {
      // Orbit path ring (flat in XZ plane)
      const orbitRing = new THREE.Mesh(
        new THREE.RingGeometry(pd.orbit - 0.06, pd.orbit + 0.06, 128),
        new THREE.MeshBasicMaterial({ color: 0xaabbff, transparent: true, opacity: 0.05, side: THREE.DoubleSide }),
      )
      orbitRing.rotation.x = -Math.PI / 2
      solarSystem.add(orbitRing)

      // Pivot rotates around sun in XZ plane
      const pivot = new THREE.Object3D()
      pivot.rotation.y = Math.random() * Math.PI * 2  // random start angle
      solarSystem.add(pivot)

      // Planet sphere
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(pd.radius, 20, 20),
        new THREE.MeshBasicMaterial({ color: pd.color }),
      )
      mesh.position.x = pd.orbit
      pivot.add(mesh)

      const entry: PlanetEntry = { pivot, mesh, speed: pd.speed, selfSpin: 0.008 + Math.random() * 0.012 }

      // ── Earth: subtle atmosphere glow + Moon ─────────────────────────────
      if (pd.name === "Earth") {
        const atmSprite = new THREE.Sprite(new THREE.SpriteMaterial({
          map: makeGlowTex("rgba(80,160,255,0.10)", "rgba(40,100,255,0.02)"),
          transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        }))
        atmSprite.scale.setScalar(pd.radius * 3.5)
        mesh.add(atmSprite)

        const moonPivot = new THREE.Object3D()
        mesh.add(moonPivot)
        const moon = new THREE.Mesh(
          new THREE.SphereGeometry(0.17, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xbbbbbb }),
        )
        moon.position.x = 1.4
        moonPivot.add(moon)
        entry.moon = { pivot: moonPivot, speed: 0.055 }
      }

      // ── Mars: subtle reddish glow ─────────────────────────────────────────
      if (pd.name === "Mars") {
        const marsGlow = new THREE.Sprite(new THREE.SpriteMaterial({
          map: makeGlowTex("rgba(220,80,40,0.07)", "rgba(180,40,10,0.02)"),
          transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        }))
        marsGlow.scale.setScalar(pd.radius * 3)
        mesh.add(marsGlow)
      }

      // ── Jupiter: equatorial bands (RingGeometry approximation) ───────────
      if (pd.name === "Jupiter") {
        const jGlow = new THREE.Sprite(new THREE.SpriteMaterial({
          map: makeGlowTex("rgba(220,180,120,0.07)", "rgba(180,120,60,0.02)"),
          transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        }))
        jGlow.scale.setScalar(pd.radius * 2.8)
        mesh.add(jGlow)
      }

      // ── Saturn: iconic ring system ────────────────────────────────────────
      if (pd.name === "Saturn") {
        // Main ring
        const ringMesh = new THREE.Mesh(
          new THREE.RingGeometry(pd.radius * 1.55, pd.radius * 2.75, 80),
          new THREE.MeshBasicMaterial({ color: 0xddcc99, transparent: true, opacity: 0.40, side: THREE.DoubleSide }),
        )
        ringMesh.rotation.x = Math.PI * 0.38
        mesh.add(ringMesh)
        // Outer faint ring band
        const ringOuter = new THREE.Mesh(
          new THREE.RingGeometry(pd.radius * 2.75, pd.radius * 3.2, 80),
          new THREE.MeshBasicMaterial({ color: 0xbbaa88, transparent: true, opacity: 0.15, side: THREE.DoubleSide }),
        )
        ringOuter.rotation.x = Math.PI * 0.38
        mesh.add(ringOuter)
      }

      // ── Uranus: sideways tilt (axial tilt ~98°) ───────────────────────────
      if (pd.name === "Uranus") {
        mesh.rotation.z = Math.PI * 0.54
        const uGlow = new THREE.Sprite(new THREE.SpriteMaterial({
          map: makeGlowTex("rgba(100,230,230,0.07)", "rgba(40,180,200,0.02)"),
          transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        }))
        uGlow.scale.setScalar(pd.radius * 3)
        mesh.add(uGlow)
      }

      // ── Neptune: deep blue glow ───────────────────────────────────────────
      if (pd.name === "Neptune") {
        const nGlow = new THREE.Sprite(new THREE.SpriteMaterial({
          map: makeGlowTex("rgba(40,80,240,0.08)", "rgba(20,40,180,0.02)"),
          transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        }))
        nGlow.scale.setScalar(pd.radius * 3)
        mesh.add(nGlow)
      }

      planets.push(entry)
    }

    // ── Meteorites ────────────────────────────────────────────────────────────
    interface Meteorite {
      line: THREE.Line
      vel:  THREE.Vector3
      phase:    number
      maxPhase: number
    }

    function spawnMeteor(phase = -Math.random() * 200): Meteorite {
      const tailLen = 14 + Math.random() * 20
      const dir = new THREE.Vector3(
        0.4 + Math.random() * 0.6,
        -(0.2 + Math.random() * 0.45),
        (Math.random() - 0.5) * 0.25,
      ).normalize()
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        dir.clone().multiplyScalar(-tailLen),
      ])
      const mat = new THREE.LineBasicMaterial({ color: 0xaaddff, transparent: true, opacity: 0 })
      const line = new THREE.Line(geo, mat)
      line.position.set(-200 + Math.random() * 60, 90 + Math.random() * 140, -30 - Math.random() * 50)
      scene.add(line)
      return { line, vel: dir.clone().multiplyScalar(1.4 + Math.random() * 1.4), phase, maxPhase: 65 + Math.random() * 70 }
    }

    function resetMeteor(m: Meteorite) {
      const tailLen = 14 + Math.random() * 20
      const dir = new THREE.Vector3(
        0.4 + Math.random() * 0.6,
        -(0.2 + Math.random() * 0.45),
        (Math.random() - 0.5) * 0.25,
      ).normalize()
      m.line.geometry.setFromPoints([new THREE.Vector3(0, 0, 0), dir.clone().multiplyScalar(-tailLen)])
      m.vel = dir.multiplyScalar(1.4 + Math.random() * 1.4)
      m.line.position.set(-210 + Math.random() * 60, 90 + Math.random() * 140, -30 - Math.random() * 50)
      m.phase    = -(80 + Math.random() * 200)
      m.maxPhase = 65 + Math.random() * 70
      ;(m.line.material as THREE.LineBasicMaterial).opacity = 0
    }

    const meteors: Meteorite[] = Array.from({ length: 8 }, () => spawnMeteor())

    // ── Rockets ───────────────────────────────────────────────────────────────
    function buildRocket(): THREE.Group {
      const g = new THREE.Group()
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.27, 1.5, 8), new THREE.MeshBasicMaterial({ color: 0xdde8ff })))
      const win = new THREE.Mesh(new THREE.CircleGeometry(0.1, 8), new THREE.MeshBasicMaterial({ color: 0x88ccff }))
      win.position.set(0.23, 0.3, 0); win.rotation.y = -Math.PI / 2; g.add(win)
      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.6, 8), new THREE.MeshBasicMaterial({ color: 0xff4422 }))
      nose.position.y = 1.05; g.add(nose)
      const finMat = new THREE.MeshBasicMaterial({ color: 0x8899cc, side: THREE.DoubleSide })
      for (let i = 0; i < 3; i++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.38, 0.3), finMat)
        const a = (i / 3) * Math.PI * 2
        fin.position.set(Math.cos(a) * 0.26, -0.64, Math.sin(a) * 0.26); fin.rotation.y = a; g.add(fin)
      }
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.65, 8), new THREE.MeshBasicMaterial({ color: 0xff7700, transparent: true, opacity: 0.85 }))
      flame.rotation.x = Math.PI; flame.position.y = -1.08; g.add(flame)
      const core = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.4, 8), new THREE.MeshBasicMaterial({ color: 0xffee77, transparent: true, opacity: 0.95 }))
      core.rotation.x = Math.PI; core.position.y = -0.98; g.add(core)
      return g
    }

    interface Rocket {
      group: THREE.Group; vel: THREE.Vector3
      flameIdx: [number, number]; flamePhase: number; rotSpeed: number
    }

    function initRocket(scattered = false): Rocket {
      const group = buildRocket()
      group.scale.setScalar(2.0 + Math.random() * 1.5)
      const speed = 0.06 + Math.random() * 0.09
      const vel   = new THREE.Vector3((Math.random() - 0.45) * speed * 0.5, speed * (0.65 + Math.random() * 0.35), 0)
      group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vel.clone().normalize())
      group.position.set((Math.random() - 0.5) * 300, scattered ? (Math.random() - 0.5) * 300 : -160 - Math.random() * 100, -15 - Math.random() * 65)
      scene.add(group)
      return { group, vel, flameIdx: [5, 6], flamePhase: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.0025 }
    }

    function respawnRocket(r: Rocket) {
      const speed = 0.06 + Math.random() * 0.09
      r.vel.set((Math.random() - 0.45) * speed * 0.5, speed * (0.65 + Math.random() * 0.35), 0)
      r.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), r.vel.clone().normalize())
      r.group.position.set((Math.random() - 0.5) * 300, -160 - Math.random() * 100, -15 - Math.random() * 65)
      r.flamePhase = Math.random() * Math.PI * 2
      r.rotSpeed   = (Math.random() - 0.5) * 0.0025
    }

    const rockets: Rocket[] = Array.from({ length: 5 }, (_, i) => initRocket(i < 3))

    // ── Satellites ────────────────────────────────────────────────────────────
    function buildSatellite(): THREE.Group {
      const g = new THREE.Group()

      // Main body (rectangular box)
      g.add(new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.4, 0.4),
        new THREE.MeshBasicMaterial({ color: 0xccddee }),
      ))

      // Solar panel left
      const panelMat = new THREE.MeshBasicMaterial({ color: 0x2255aa, side: THREE.DoubleSide })
      const panelLeft = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.02, 0.5), panelMat)
      panelLeft.position.x = -0.88
      g.add(panelLeft)
      // Panel grid lines (thin dark strips)
      for (let i = -1; i <= 1; i++) {
        const strip = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 0.025, 0.04),
          new THREE.MeshBasicMaterial({ color: 0x112244 }),
        )
        strip.position.set(-0.88, 0, i * 0.18)
        g.add(strip)
      }

      // Solar panel right
      const panelRight = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.02, 0.5), panelMat)
      panelRight.position.x = 0.88
      g.add(panelRight)
      for (let i = -1; i <= 1; i++) {
        const strip = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 0.025, 0.04),
          new THREE.MeshBasicMaterial({ color: 0x112244 }),
        )
        strip.position.set(0.88, 0, i * 0.18)
        g.add(strip)
      }

      // Antenna dish (flat ring + stem)
      const dish = new THREE.Mesh(
        new THREE.RingGeometry(0.05, 0.18, 16),
        new THREE.MeshBasicMaterial({ color: 0xddddcc, side: THREE.DoubleSide }),
      )
      dish.position.set(0, 0.32, 0.1)
      dish.rotation.x = -Math.PI * 0.25
      g.add(dish)

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.18, 6),
        new THREE.MeshBasicMaterial({ color: 0xaabbcc }),
      )
      stem.position.set(0, 0.24, 0.06)
      stem.rotation.x = Math.PI * 0.15
      g.add(stem)

      // Small thruster nozzle at the back
      const nozzle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.09, 0.14, 8),
        new THREE.MeshBasicMaterial({ color: 0x889999 }),
      )
      nozzle.rotation.z = Math.PI / 2
      nozzle.position.x = 0.35
      g.add(nozzle)

      return g
    }

    interface Satellite {
      group:    THREE.Group
      vel:      THREE.Vector3
      rotX:     number
      rotY:     number
      rotZ:     number
    }

    function initSatellite(scattered = false): Satellite {
      const group = buildSatellite()
      const scale = 1.8 + Math.random() * 0.8
      group.scale.setScalar(scale)

      // Slow diagonal drift
      const speed = 0.02 + Math.random() * 0.03
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * speed,
        (Math.random() - 0.6) * speed * 0.5,
        (Math.random() - 0.5) * speed * 0.3,
      )

      group.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      )
      group.position.set(
        (Math.random() - 0.5) * 280,
        scattered ? (Math.random() - 0.5) * 220 : 180 + Math.random() * 80,
        -10 - Math.random() * 60,
      )
      scene.add(group)

      return {
        group,
        vel,
        rotX: (Math.random() - 0.5) * 0.003,
        rotY: (Math.random() - 0.5) * 0.004,
        rotZ: (Math.random() - 0.5) * 0.002,
      }
    }

    function respawnSatellite(s: Satellite) {
      const speed = 0.02 + Math.random() * 0.03
      s.vel.set(
        (Math.random() - 0.5) * speed,
        (Math.random() - 0.6) * speed * 0.5,
        (Math.random() - 0.5) * speed * 0.3,
      )
      s.group.position.set(
        (Math.random() - 0.5) * 280,
        180 + Math.random() * 80,
        -10 - Math.random() * 60,
      )
      s.rotX = (Math.random() - 0.5) * 0.003
      s.rotY = (Math.random() - 0.5) * 0.004
      s.rotZ = (Math.random() - 0.5) * 0.002
    }

    const satellites: Satellite[] = Array.from({ length: 3 }, (_, i) => initSatellite(i < 2))

    // ── Animation loop ────────────────────────────────────────────────────────
    let rafId: number
    let tick = 0

    function animate() {
      rafId = requestAnimationFrame(animate)
      tick++

      starField.rotation.y += 0.00005
      starField.rotation.x += 0.000015

      // ── Solar system ────────────────────────────────────────────────────────
      // Sun pulse
      const pulse = 1 + Math.sin(tick * 0.018) * 0.025
      sun.scale.setScalar(pulse)
      sunGlow1.scale.setScalar(28 * (1 + Math.sin(tick * 0.025) * 0.04))

      // Planets orbit + self-spin
      for (const p of planets) {
        p.pivot.rotation.y += p.speed
        p.mesh.rotation.y  += p.selfSpin
        if (p.moon) p.moon.pivot.rotation.y += p.moon.speed
      }

      // ── Meteorites ──────────────────────────────────────────────────────────
      for (const m of meteors) {
        m.phase++
        if (m.phase < 0) continue
        const mat = m.line.material as THREE.LineBasicMaterial
        const p = m.phase / m.maxPhase
        mat.opacity = p < 0.12 ? (p / 0.12) * 0.88 : p > 0.72 ? ((1 - p) / 0.28) * 0.88 : 0.88
        m.line.position.addScaledVector(m.vel, 1)
        if (m.phase >= m.maxPhase) resetMeteor(m)
      }

      // ── Satellites ──────────────────────────────────────────────────────────
      for (const s of satellites) {
        s.group.position.addScaledVector(s.vel, 1)
        s.group.rotation.x += s.rotX
        s.group.rotation.y += s.rotY
        s.group.rotation.z += s.rotZ
        if (s.group.position.y < -220 || Math.abs(s.group.position.x) > 350) {
          respawnSatellite(s)
        }
      }

      // ── Rockets ─────────────────────────────────────────────────────────────
      for (const r of rockets) {
        r.group.position.addScaledVector(r.vel, 1)
        r.flamePhase += 0.14
        r.group.rotation.z += r.rotSpeed
        const flicker = 0.9 + Math.sin(r.flamePhase) * 0.1 + Math.random() * 0.06
        const c = r.group.children
        if (c[r.flameIdx[0]]) c[r.flameIdx[0]].scale.set(flicker, 0.9 + Math.random() * 0.22, flicker)
        if (c[r.flameIdx[1]]) c[r.flameIdx[1]].scale.set(flicker, 0.9 + Math.random() * 0.28, flicker)
        if (r.group.position.y > 260 || Math.abs(r.group.position.x) > 340) respawnRocket(r)
      }

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize ────────────────────────────────────────────────────────────────
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", onResize)

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", onResize)
      renderer.dispose()
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 -z-10 pointer-events-none" />
}
