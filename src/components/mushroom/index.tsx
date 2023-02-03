import { Html } from '@react-three/drei';
import PRNG from '@/utils/prng';
import { useState } from 'react';
import Stem from './stem';

const prng = new PRNG();

export default function MushroomScene() {
  const [minRadius, setMinRadius] = useState(0.5);

  return (
    <>
      <Html>
        <input
          type="range"
          min={0.1}
          max={1.0}
          step={0.1}
          onChange={(e) => {
            setMinRadius(Number.parseFloat(e.target.value));
          }}
        />
      </Html>
      <Stem prng={prng} minRadius={minRadius} position={[0, -2, 0]} />
    </>
  );
}
