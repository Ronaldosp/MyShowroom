import { Canvas } from "@react-three/fiber";
import { ARButton, XR, useHitTest } from "@react-three/xr";
import { useState, useRef } from "react";
import CarModel from "./CarModel";

function ARContent() {
  const ref = useRef();
  const [placed, setPlaced] = useState(false);

  useHitTest((hitMatrix) => {
    if (!placed) {
      hitMatrix.decompose(
        ref.current.position,
        ref.current.quaternion,
        ref.current.scale
      );
    }
  });

  return (
    <group ref={ref} onClick={() => setPlaced(true)}>
      <CarModel />
    </group>
  );
}

function ARViewer() {
  return (
    <>
      <ARButton sessionInit={{ requiredFeatures: ["hit-test"] }} />
      <Canvas>
        <XR>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} />
          <ARContent />
        </XR>
      </Canvas>
    </>
  );
}

export default ARViewer;
