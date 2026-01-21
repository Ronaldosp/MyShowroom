import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import CarModel from "./CarModel"; // Your 3D model component

export default function DetailARViewer({ car }) {
  const containerRef = useRef();

  useEffect(() => {
    let mindAR = null;
    let animationId = null;

    const startAR = async () => {
      mindAR = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "/marker.mind",  // marker for this car
      });

      const { renderer, scene, camera } = mindAR;

      // Add anchor for the marker
      const anchor = mindAR.addAnchor(0);

      // Add the car model to the anchor
      const carModel = new CarModel(car); // Pass car details if needed
      anchor.group.add(carModel);

      // Optional: console log detection
      anchor.onTargetFound = () => console.log("Marker found!");
      anchor.onTargetLost = () => console.log("Marker lost!");

      // Start AR
      await mindAR.start();

      // Render loop
      const render = () => {
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(render);
      };
      render();
    };

    startAR();

    return () => {
      if (mindAR) mindAR.stop();
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [car]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    />
  );
}