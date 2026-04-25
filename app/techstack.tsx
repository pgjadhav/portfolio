'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Text } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function TechSphere({ position, tech }: { position: [number, number, number], tech: string }) {
  const meshRef = useRef<any>()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.45
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25
    }
  })

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.55, 32, 32]}>
        <meshStandardMaterial color="#63d2ff" />
      </Sphere>
      <Text
        position={[0, 0, 0.75]}
        fontSize={0.18}
        maxWidth={2.2}
        lineHeight={1.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {tech}
      </Text>
    </group>
  )
}

export default function TechStack() {
  const techs = [
    'Machine Learning',
    'Time Series',
    'LLMs',
    'RAG',
    'AWS',
    'Data Pipelines',
  ]

  const techChips = [
    'Prophet',
    'ARIMA',
    'LSTM',
    'TensorFlow',
    'PyTorch',
    'HuggingFace',
    'Gemini API',
    'Qdrant',
    'Chroma',
    'Streamlit',
    'Flask',
    'Snowflake',
  ]

  return (
    <div className="tech-stack-canvas">
      <Canvas style={{ width: '100%', height: '100%', background: '#0a0e1a' }} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 8], fov: 50 }}>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        {techs.map((tech, index) => {
          const angle = (index / techs.length) * Math.PI * 2
          const radius = 3
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          return <TechSphere key={tech} position={[x, 0, z]} tech={tech} />
        })}
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, 5]} intensity={0.6} />
      </Canvas>
      <div className="tech-stack-chip-list">
        {techChips.map((chip) => (
          <span key={chip} className="tech-stack-chip">
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}