import * as THREE from 'three';
import { CatmullRomLine } from '@react-three/drei';
import SimplexNoise from 'simplex-noise';
import { useRender } from '@react-three/fiber';

// create an array of Vector3 points for the spline to pass through
const points = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 2, 2),
  new THREE.Vector3(0, 4, 0),
  new THREE.Vector3(0, 6, 0),
  new THREE.Vector3(0, 8, 0),
];

/*



let curve = new THREE.CatmullRomCurve3(points);

// set the resolution (number of points) for the curve
curve.points = 100;

// create a tube geometry using the curve for the stem
let radius = 0.5;
let radialSegments = 32;
let tubGeometry = new THREE.TubeGeometry(curve, 100, radius, radialSegments);

// create a material for the stem
let material = new THREE.MeshStandardMaterial({ color: 0x9b59b6 });

// create a stem using the geometry and material
let stem = new THREE.Mesh(tubGeometry, material);

// create a sphere geometry for the cap
let sphereGeometry = new THREE.SphereGeometry(3, 32, 32);

// create a simplex noise function
let noise = new SimplexNoise();

// add noise to the vertex positions of the sphere geometry
for (let i = 0; i < sphereGeometry.vertices.length; i++) {
    let vertex = sphereGeometry.vertices[i];
    let noiseX = noise.noise2D(vertex.x * 0.1, vertex.y * 0.1);
    let noiseY = noise.noise2D(vertex.x * 0.1, vertex.y * 0.1);
    let noiseZ = noise.noise2D(vertex.x * 0.1, vertex.y * 0.1);
    vertex.x += noiseX * 0.2;
    vertex.y += noiseY * 0.2;
    vertex.z += noiseZ * 0.2;
}

// create a material for the cap
let capMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });

// create a cap using the geometry and material
let cap = new THREE.Mesh(sphereGeometry, capMaterial);

// position the cap on top of the stem
cap.position.set(0, 10, 0);

// add the stem and cap to the scene
scene.add(stem);
scene.add(cap);



*/

export default function Mushroom() {
  return (
    <>
      <CatmullRomLine
        points={points} // Array of Points
        closed={false} // Default
        curveType="centripetal" // One of "centripetal" (default), "chordal", or "catmullrom"
        tension={0.5} // Default (only applies to "catmullrom" curveType)
        color="red" // Default
        lineWidth={1} // In pixels (default)
        dashed={false} // Default
      />

      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  );
}
