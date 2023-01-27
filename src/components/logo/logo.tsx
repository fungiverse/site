import { Center, Text3D, useMatcapTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group, MathUtils } from 'three';

export default function Logo() {
  const [texture] = useMatcapTexture(`2E763A_78A0B7_B3D1CF_14F209`, 256);
  const logo = useRef<Group>(null);

  useFrame((state, delta) => {
    const { current } = logo;
    if (current) {
      current.rotation.y += MathUtils.degToRad(delta * 10);
    }
  });

  return (
    <>
      <ambientLight intensity={3} color={`white`} />

      <Center ref={logo}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={2.5}
          height={0.4}
          curveSegments={8}
        >
          fungiverse
          <meshMatcapMaterial matcap={texture} />
        </Text3D>
      </Center>
    </>
  );
}
