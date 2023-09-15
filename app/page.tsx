'use client'
import styles from './page.module.css'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Debug } from '@react-three/cannon'
import Floor from '@/components/floor/floor'
import Character from '@/components/character/character'

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Physics gravity={[0, -50, 0]}>
          <Debug scale={1.1} color={'red'}>
            <Floor rotation={[Math.PI / -2, 0, 0]} color={'cyan'} position={[0, 0, 0]} />
            <Character />
          </Debug>
        </Physics>
      </Canvas>
    </main>
  )
}
