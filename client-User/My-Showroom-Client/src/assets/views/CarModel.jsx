import { useGLTF } from "@react-three/drei";
import { useLayoutEffect } from "react";
import * as THREE from "three";

function CarModel({ onReady }) {
  const { scene } = useGLTF("/models/sti.glb");

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Center model
    scene.position.sub(center);

    // Normalize scales
    const maxAxis = Math.max(size.x, size.y, size.z);
    scene.scale.setScalar(1 / maxAxis);

    // ✅ SAFE callback
    if (typeof onReady === "function") {
      onReady({ size });
    }
  }, [scene, onReady]);

  return <primitive object={scene} />;
}

export default CarModel;