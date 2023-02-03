import { Box, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

const MushroomScene = dynamic(
  async () => {
    return await import(`@/components/mushroom`);
  },
  { ssr: false },
);

export default function Mushroom() {
  const stemCurve = new THREE.CatmullRomCurve3();

  return (
    <>
      <Canvas>
        <OrbitControls makeDefault />
        <ambientLight />

        <MushroomScene />
      </Canvas>
    </>
  );
}
