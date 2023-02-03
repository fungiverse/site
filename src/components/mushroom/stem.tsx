import * as THREE from 'three';
import { color, radius } from '@/utils/mushroom';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const stemPointsDefault: [THREE.Vector3, THREE.Vector3, THREE.Vector3] = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.25, 2, 0),
  new THREE.Vector3(0, 4, 0),
];
const positionDefault: [number, number, number] = [0, -2, 0];

const color1Default: [number, number, number] = [1.0, 0.0, 0.0];
const color2Default: [number, number, number] = [0.0, 1.0, 0.0];

interface StemProps {
  prng: any;
  position?: [number, number, number];
  radialSegments?: number;
  verticalSegments?: number;
  color1?: [number, number, number];
  color2?: [number, number, number];
  colorNoiseFactor?: number;
  minRadius?: number;
  radiusFactor?: number;
  stemPoints?: [THREE.Vector3, THREE.Vector3, THREE.Vector3];
  tension?: number;
}

export default function Stem({
  prng,
  position: [x, y, z] = positionDefault,
  radialSegments = 200,
  verticalSegments = 20,
  color1 = color1Default,
  color2 = color2Default,
  colorNoiseFactor = 0.3,
  minRadius = 0.1,
  radiusFactor = 0.05,
  stemPoints = stemPointsDefault,
  tension = 0.85,
}: StemProps) {
  const stemCurve = useMemo(
    () => new THREE.CatmullRomCurve3(stemPoints),
    [stemPoints],
  );
  const stem = useRef<THREE.BufferGeometry>(null);

  const build = useCallback(() => {
    const rotation = new THREE.Quaternion();
    const points: number[] = [];
    const indices: number[] = [];
    const colors: number[] = [];

    // Move vertically from bottom to top
    for (let t = 0; t < 1; t += 1 / verticalSegments) {
      // Create a circular shape
      const radialCurve = new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 0, radius(minRadius, t, radiusFactor, prng)),
          new THREE.Vector3(radius(minRadius, t, radiusFactor, prng), 0, 0),
          new THREE.Vector3(0, 0, -radius(minRadius, t, radiusFactor, prng)),
          new THREE.Vector3(-radius(minRadius, t, radiusFactor, prng), 0, 0),
        ],
        true,
        `catmullrom`,
        tension,
      );

      // Orient the circular shape along the stemCurve
      const radialPoints = radialCurve.getPoints(radialSegments);
      const tangent = stemCurve.getTangentAt(t);
      rotation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
      const stemPosition = stemCurve.getPointAt(t);

      for (let i = 0; i < radialPoints.length; i++) {
        const point = radialPoints[i];
        point.applyQuaternion(rotation);

        points.push(
          point.x + stemPosition.x,
          point.y + stemPosition.y,
          point.z + stemPosition.z,
        );

        // Colorize
        colors.push(...color(color1, color2, t, t + colorNoiseFactor, prng));
      }
    }

    // Indices are used to connect the vertices
    for (let i = 0; i < verticalSegments - 1; i++) {
      for (let j = 0; j < radialSegments; j++) {
        indices.push(
          i * (radialSegments + 1) + j,
          i * (radialSegments + 1) + j + 1,
          (i + 1) * (radialSegments + 1) + j,
        );

        indices.push(
          i * (radialSegments + 1) + j + 1,
          (i + 1) * (radialSegments + 1) + j + 1,
          (i + 1) * (radialSegments + 1) + j,
        );
      }
    }

    return {
      points,
      indices,
      colors,
    };
  }, [
    color1,
    color2,
    colorNoiseFactor,
    minRadius,
    prng,
    radialSegments,
    radiusFactor,
    stemCurve,
    tension,
    verticalSegments,
  ]);

  useEffect(() => {
    const render = window.requestAnimationFrame(() => {
      const { points, indices, colors } = build();

      stem.current?.setAttribute(
        `position`,
        new THREE.BufferAttribute(new Float32Array(points), 3),
      );
      stem.current?.setAttribute(
        `color`,
        new THREE.BufferAttribute(new Float32Array(colors), 3),
      );
      stem.current?.setIndex(indices);
      stem.current?.computeVertexNormals();
      stem.current?.translate(x, y, z);
    });

    return () => {
      window.cancelAnimationFrame(render);
    };
  }, [build, x, y, z]);

  return (
    <>
      <mesh>
        <bufferGeometry ref={stem} />
        <meshBasicMaterial vertexColors color="white" />
      </mesh>
    </>
  );
}
