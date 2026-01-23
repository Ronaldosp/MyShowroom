import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";

function CarModel({ url, onReady }) {
  const { scene } = useGLTF(url);

  // ✅ clone scene so transforms are local
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // center model
    clonedScene.position.sub(center);

    // 🔽 move car DOWN
    clonedScene.position.y -= size.y * 20.15;

    // normalize scale
    const maxAxis = Math.max(size.x, size.y, size.z);
    clonedScene.scale.setScalar(1 / maxAxis);

    if (onReady) onReady({ size });
  }, [clonedScene, onReady]);

  return <primitive object={clonedScene} />;
}

export default CarModel;