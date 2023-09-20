import { useBox } from '@react-three/cannon'

interface FloorProps {
  color: string // hex color
  rotation: [number, number, number] // x, y, z
  position: [number, number, number] // x, y, z
  args: [number, number, number] // width, height, depth of collision box
  scale: [number, number] // width, height of visual plane
}

const Floor = (props: FloorProps) => {
  const [ref] = useBox(() => ({ type: 'Static', mass: 0, ...props })) as any

  return (
    <mesh receiveShadow={true} rotation={props.rotation} position={props.position} ref={ref}>
      <planeGeometry attach="geometry" args={props.scale} />
      <meshStandardMaterial attach="material" color={props.color} />
    </mesh>
  )
}

export default Floor
