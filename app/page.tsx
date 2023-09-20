'use client'
import styles from './page.module.css'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Debug } from '@react-three/cannon'
import Floor from '@/components/floor/Floor'
import Character from '@/components/character/Character'

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Physics gravity={[0, -50, 0]}>
          <Debug scale={1.1} color={'red'}>
            <Floor
              color={'cyan'}
              rotation={[Math.PI / -2, 0, 0]}
              position={[0, 0, 0]}
              args={[10, 10, 0.1]}
              scale={[10, 10]}
            />
            <Character />
          </Debug>
        </Physics>
      </Canvas>
    </main>
  )
}
