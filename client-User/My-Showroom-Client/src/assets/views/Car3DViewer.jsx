import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect, Suspense, useCallback, useRef } from "react";
import CarModel from "./CarModel";

function CameraController({ size, controlsRef }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!size || !controlsRef.current) return;

    const maxAxis = Math.max(size.x, size.y, size.z);
    const distance = maxAxis * 7;

    // 1️⃣ hard-set camera
    camera.position.set(0, maxAxis * 1.5, distance);
    camera.near = 0.01;
    camera.far = distance * 70;
    camera.updateProjectionMatrix();

    // 2️⃣ reset controls COMPLETELY
    controlsRef.current.enabled = false;
    controlsRef.current.target.set(0, maxAxis * 0.5, 0);
    controlsRef.current.reset();

    // 3️⃣ re-enable after one frame
    requestAnimationFrame(() => {
      controlsRef.current.enabled = true;
      controlsRef.current.update();
    });
  }, [size, camera, controlsRef]);

  return null;
}

function Car3DViewer() {
  const [size, setSize] = useState(null);
  const controlsRef = useRef();

  const handleReady = useCallback(({ size }) => {
    setSize(size);
  }, []);

  return (
    <Canvas style={{ height: 1000 }} camera={{ fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={2} />

      <Suspense fallback={null}>
        <CarModel onReady={handleReady} />
        {size && <CameraController size={size} controlsRef={controlsRef} />}
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={1
          
        }
        maxDistance={1000}
        makeDefault
      />
    </Canvas>
  );
}

export default Car3DViewer;
