import { SphereProps, useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useMemo } from 'react'
import { useControls } from '@/components/character/hooks/useControls'
import { createCharacterSlice } from '@/stores/character'
import { createPhysicsSlice } from '@/stores/physics'
import * as THREE from 'three'

const Character = (props: SphereProps) => {
  // Base variables
  const direction = useMemo(() => new THREE.Vector3(), [])
  const frontVector = useMemo(() => new THREE.Vector3(), [])
  const sideVector = useMemo(() => new THREE.Vector3(), [])
  const worldDirection = useMemo(() => new THREE.Vector3(), [])
  const SPEED = 7
  const ACCELERATION = 0.1
  const { camera } = useThree()

  // Collision sphere for character
  const [ref, api] = useSphere<any>(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 10, 0],
    ...props,
  }))

  // Movement system
  const setPosition = createCharacterSlice((state) => state.setPosition)
  const { forward, backward, left, right, jump } = useControls()
  const velocity = useRef<any>([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity])
  useEffect(
    () =>
      api.position.subscribe((p) =>
        setPosition({
          x: p[0],
          y: p[1],
          z: p[2],
        })
      ),
    [api.position, setPosition]
  )

  const charPosition = useRef([0, 0, 0])
  useEffect(() => api.position.subscribe((p) => (charPosition.current = p)), [api.position])

  // Variables for gradual acceleration
  const targetVelocity = useMemo(() => new THREE.Vector3(), [])
  const currentVelocity = useMemo(() => new THREE.Vector3(), [])

  // Detecting objects in front of the character
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const hoverableObjects = createPhysicsSlice((state) => state.hoverableObjects)
  const setObjectAsHovered = createPhysicsSlice((state) => state.setObjectAsHovered)

  useFrame(() => {
    // Movement
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED)

    // Compute the target velocity based on input
    targetVelocity.set(direction.x, velocity.current[1], direction.z)

    // Smoothly transition from the current velocity to the target velocity
    currentVelocity.lerp(targetVelocity, ACCELERATION)

    // Use the smoothed velocity for the character's movement
    api.velocity.set(currentVelocity.x, currentVelocity.y, currentVelocity.z)

    if (jump && Math.abs(velocity.current[1].toFixed(3)) < 0.001)
      api.velocity.set(velocity.current[0], 10, velocity.current[2])

    // Adjust camera position to follow character
    camera.position.set(charPosition.current[0] + 2, charPosition.current[1] + 8.5, charPosition.current[2] + 7)
    camera.lookAt(charPosition.current[0], charPosition.current[1], charPosition.current[2])

    // Raycast detection system
    raycaster.set(camera.position, camera.getWorldDirection(worldDirection))
    const intersects = raycaster.intersectObjects(
      hoverableObjects && Object.keys(hoverableObjects).length > 0 ? hoverableObjects : []
    )

    if (intersects.length > 0 && intersects[0].distance < 1.3) {
      setObjectAsHovered(intersects[0].object.userData.id)
    } else {
      setObjectAsHovered(null)
    }
  })

  return (
    <group>
      <mesh castShadow={true} position={props.position} ref={ref}>
        <sphereGeometry args={props.args} />
        <meshStandardMaterial color="#FFFF00" />
      </mesh>
    </group>
  )
}

export default Character
