import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'
import { createCharacterSlice } from '@/stores/character'

interface FloorProps {
  color: string // hex color
  rotation: [number, number, number] // x, y, z
  position: [number, number, number] // x, y, z
  args: [number, number, number] // width, height, depth of collision box
  scale: [number, number] // width, height of visual plane
}

const Floor = (props: FloorProps) => {
  const [ref, api] = useBox(() => ({ type: 'Static', mass: 0, ...props })) as any
  const position = createCharacterSlice((state) => state.position)

  // Subscribe to floor position
  useEffect(() => {
    api.position.subscribe((p: number[]) => {
      position.x = p[0]
      position.y = p[1]
      position.z = p[2]
    })
  }, [position, props.position])

  // Update floor position alongside character
  useFrame(() => {
    api.position.set(position.x, 0, position.z)
  })

  return (
    <mesh receiveShadow={true} rotation={props.rotation} position={props.position} ref={ref}>
      <planeGeometry attach="geometry" args={props.scale} />
      <meshStandardMaterial attach="material" color={props.color} />
    </mesh>
  )
}

export default Floor
