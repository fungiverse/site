import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from '@react-three/drei';

export default function Logo() {
  const [texture] = useMatcapTexture(`2E763A_78A0B7_B3D1CF_14F209`, 256);

  return (
    <>
      {/* <color args={[1, 1, 1]} attach={`background`} /> */}
      <ambientLight intensity={3} color={`white`} />
      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={2.75}
          height={0.4}
          curveSegments={8}
        >
          fungiverse
          <meshMatcapMaterial matcap={texture} />
          {/* <MeshWobbleMaterial factor={0.1} speed={1} color={`red`} /> */}
        </Text3D>
      </Center>
    </>
  );
}
