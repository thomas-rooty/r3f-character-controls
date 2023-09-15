import { useBox } from '@react-three/cannon'

interface FloorProps {
  rotation: [number, number, number]
  color: string
  position: [number, number, number]
}

const Floor = (props: FloorProps) => {
  const [ref] = useBox(() => ({ type: 'Static', mass: 0, args: [25, 25, 0.1], ...props })) as any

  return <mesh receiveShadow={true} rotation={props.rotation} position={props.position} ref={ref}></mesh>
}

export default Floor
