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
    renderer.setClearColor(0x07091a, 1) // deep space dark blue
    mountRef.current.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000)
    camera.position.z = 80

    // ── Star texture (soft glowing circle) ───────────────────────────────────
    const starCanvas = document.createElement("canvas")
    starCanvas.width = 32
    starCanvas.height = 32
    const ctx2d = starCanvas.getContext("2d")!
    const grd = ctx2d.createRadialGradient(16, 16, 0, 16, 16, 16)
    grd.addColorStop(0,   "rgba(255,255,255,1)")
    grd.addColorStop(0.25,"rgba(210,225,255,0.9)")
    grd.addColorStop(0.6, "rgba(140,170,255,0.3)")
    grd.addColorStop(1,   "rgba(80,100,255,0)")
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
      size: 1.4,
      sizeAttenuation: true,
      map: starTex,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    })
    const starField = new THREE.Points(starGeo, starMat)
    scene.add(starField)

    // ── Nebula blobs (large soft glowing sprites) ─────────────────────────────
    const nebulaCanvas = document.createElement("canvas")
    nebulaCanvas.width  = 128
    nebulaCanvas.height = 128
    const nctx = nebulaCanvas.getContext("2d")!
    const ngrd = nctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    ngrd.addColorStop(0,   "rgba(160,40,220,0.18)")
    ngrd.addColorStop(0.4, "rgba(100,20,180,0.08)")
    ngrd.addColorStop(1,   "rgba(0,0,80,0)")
    nctx.fillStyle = ngrd
    nctx.fillRect(0, 0, 128, 128)
    const nebulaTex = new THREE.CanvasTexture(nebulaCanvas)

    const nebulaPositions: [number, number, number, number][] = [
      [-120,  60, -300, 220],
      [ 200, -80, -400, 180],
      [ -50, -150, -350, 160],
      [ 150,  120, -450, 200],
    ]
    for (const [x, y, z, s] of nebulaPositions) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({
        map: nebulaTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
      }))
      sp.position.set(x, y, z)
      sp.scale.setScalar(s)
      scene.add(sp)
    }

    // ── Meteorites ────────────────────────────────────────────────────────────
    interface Meteorite {
      line: THREE.Line
      vel:  THREE.Vector3
      phase:    number   // negative = waiting to spawn, ≥0 = active
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
      return {
        line,
        vel: dir.clone().multiplyScalar(1.4 + Math.random() * 1.4),
        phase,
        maxPhase: 65 + Math.random() * 70,
      }
    }

    function resetMeteor(m: Meteorite) {
      const tailLen = 14 + Math.random() * 20
      const dir = new THREE.Vector3(
        0.4 + Math.random() * 0.6,
        -(0.2 + Math.random() * 0.45),
        (Math.random() - 0.5) * 0.25,
      ).normalize()
      m.line.geometry.setFromPoints([
        new THREE.Vector3(0, 0, 0),
        dir.clone().multiplyScalar(-tailLen),
      ])
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

      // Body
      g.add(new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.27, 1.5, 8),
        new THREE.MeshBasicMaterial({ color: 0xdde8ff }),
      ))

      // Window
      const win = new THREE.Mesh(
        new THREE.CircleGeometry(0.1, 8),
        new THREE.MeshBasicMaterial({ color: 0x88ccff }),
      )
      win.position.set(0.23, 0.3, 0)
      win.rotation.y = -Math.PI / 2
      g.add(win)

      // Nose cone
      const nose = new THREE.Mesh(
        new THREE.ConeGeometry(0.22, 0.6, 8),
        new THREE.MeshBasicMaterial({ color: 0xff4422 }),
      )
      nose.position.y = 1.05
      g.add(nose)

      // 3 Fins
      const finMat = new THREE.MeshBasicMaterial({ color: 0x8899cc, side: THREE.DoubleSide })
      for (let i = 0; i < 3; i++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.38, 0.3), finMat)
        const a = (i / 3) * Math.PI * 2
        fin.position.set(Math.cos(a) * 0.26, -0.64, Math.sin(a) * 0.26)
        fin.rotation.y = a
        g.add(fin)
      }

      // Outer flame
      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.16, 0.65, 8),
        new THREE.MeshBasicMaterial({ color: 0xff7700, transparent: true, opacity: 0.85 }),
      )
      flame.rotation.x = Math.PI
      flame.position.y = -1.08
      g.add(flame)

      // Inner flame core
      const core = new THREE.Mesh(
        new THREE.ConeGeometry(0.07, 0.4, 8),
        new THREE.MeshBasicMaterial({ color: 0xffee77, transparent: true, opacity: 0.95 }),
      )
      core.rotation.x = Math.PI
      core.position.y = -0.98
      g.add(core)

      return g
    }

    interface Rocket {
      group:      THREE.Group
      vel:        THREE.Vector3
      flameIdx:   [number, number]   // child indices of outer/inner flame
      flamePhase: number
      rotSpeed:   number
    }

    function initRocket(scattered = false): Rocket {
      const group = buildRocket()
      const scale = 0.7 + Math.random() * 1.6
      group.scale.setScalar(scale)

      const speed = 0.06 + Math.random() * 0.09
      const vx    = (Math.random() - 0.45) * speed * 0.5
      const vy    = speed * (0.65 + Math.random() * 0.35)
      const vel   = new THREE.Vector3(vx, vy, 0)
      group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vel.clone().normalize())

      group.position.set(
        (Math.random() - 0.5) * 300,
        scattered ? (Math.random() - 0.5) * 300 : -160 - Math.random() * 100,
        -15 - Math.random() * 65,
      )
      scene.add(group)
      return { group, vel, flameIdx: [5, 6], flamePhase: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.0025 }
    }

    function respawnRocket(r: Rocket) {
      const speed = 0.06 + Math.random() * 0.09
      const vx    = (Math.random() - 0.45) * speed * 0.5
      const vy    = speed * (0.65 + Math.random() * 0.35)
      r.vel.set(vx, vy, 0)
      r.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), r.vel.clone().normalize())
      r.group.position.set(
        (Math.random() - 0.5) * 300,
        -160 - Math.random() * 100,
        -15 - Math.random() * 65,
      )
      r.flamePhase = Math.random() * Math.PI * 2
      r.rotSpeed   = (Math.random() - 0.5) * 0.0025
    }

    const rockets: Rocket[] = Array.from({ length: 5 }, (_, i) => initRocket(i < 3))

    // ── Animation loop ────────────────────────────────────────────────────────
    let rafId: number

    function animate() {
      rafId = requestAnimationFrame(animate)

      starField.rotation.y += 0.00005
      starField.rotation.x += 0.000015

      // Meteorites
      for (const m of meteors) {
        m.phase++
        if (m.phase < 0) continue
        const mat = m.line.material as THREE.LineBasicMaterial
        const p = m.phase / m.maxPhase
        mat.opacity = p < 0.12 ? (p / 0.12) * 0.88 : p > 0.72 ? ((1 - p) / 0.28) * 0.88 : 0.88
        m.line.position.addScaledVector(m.vel, 1)
        if (m.phase >= m.maxPhase) resetMeteor(m)
      }

      // Rockets
      for (const r of rockets) {
        r.group.position.addScaledVector(r.vel, 1)
        r.flamePhase += 0.14
        r.group.rotation.z += r.rotSpeed

        // Flame flicker
        const flicker = 0.9 + Math.sin(r.flamePhase) * 0.1 + Math.random() * 0.06
        const c = r.group.children
        if (c[r.flameIdx[0]]) c[r.flameIdx[0]].scale.set(flicker, 0.9 + Math.random() * 0.22, flicker)
        if (c[r.flameIdx[1]]) c[r.flameIdx[1]].scale.set(flicker, 0.9 + Math.random() * 0.28, flicker)

        if (r.group.position.y > 260 || Math.abs(r.group.position.x) > 340) {
          respawnRocket(r)
        }
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
