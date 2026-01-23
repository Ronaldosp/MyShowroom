import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import CarModel from "./CarModel";

function CameraController({ size, controlsRef }) {
  const { camera } = useThree();
  console.log("CameraController");
  useEffect(() => {
    if (!size || !controlsRef.current) return;

    const maxAxis = Math.max(size.x, size.y, size.z);
    const distance = maxAxis * 7;

    camera.position.set(0, maxAxis * 1.5, distance);
    camera.near = 0.01;
    camera.far = distance * 70;
    camera.updateProjectionMatrix();

    controlsRef.current.enabled = false;
    controlsRef.current.target.set(0, maxAxis * 0.5, 0);
    controlsRef.current.reset();

    requestAnimationFrame(() => {
      controlsRef.current.enabled = true;
      controlsRef.current.update();
    });
  }, [size, camera, controlsRef]);

  return null;
}

function Car3DViewer({ modelUrl }) {
  const [size, setSize] = useState(null);
  const controlsRef = useRef();
  console.log(modelUrl , "modelUrl");
  
  const handleReady = useCallback(({ size }) => {
    setSize(size);
  }, []);

  return (
    <Canvas style={{ height: 700 }} camera={{ fov: 45 }}>
  <ambientLight intensity={1.2} />

  <directionalLight
    position={[10, 15, 10]}
    intensity={3}
    castShadow
  />

  <directionalLight
    position={[-10, 10, -10]}
    intensity={1.5}
  />

  <hemisphereLight
    skyColor="#ffffff"
    groundColor="#444444"
    intensity={1.2}
  />

  <Suspense fallback={null}>
    <CarModel url={modelUrl} onReady={handleReady} />
    {size && <CameraController size={size} controlsRef={controlsRef} />}
  </Suspense>

  <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.08} />
</Canvas>
  );
}

export default Car3DViewer;