'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function AnimatedSphere() {
  const meshRef = useRef<any>()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#63d2ff"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  )
}

export default function Character() {
  return (
    <div className="character-canvas">
      <Canvas style={{ width: '100%', height: '100%', background: '#0a0e1a' }} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 3], fov: 50 }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <AnimatedSphere />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
      </Canvas>
    </div>
  )
}