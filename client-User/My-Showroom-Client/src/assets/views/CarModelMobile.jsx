import { useGLTF } from "@react-three/drei";

function CarModelMobile() {
  const { scene } = useGLTF("/models/car.glb");

  return (
    <primitive
      object={scene}
      scale={0.01} // 👈 START HERE (adjust if needed)
      position={[0, 0, 0]}
    />
  );
}

export default CarModelMobile;
