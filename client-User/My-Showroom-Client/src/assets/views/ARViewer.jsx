import "@google/model-viewer";

export default function ARViewer() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <model-viewer
        src="/models/brz.glb"               // your 3D model
        alt="3D Car"
        ar                          // enable AR
        ar-modes="scene-viewer quick-look"  // Android + iOS
        ios-src="/models/brz.usdz"         // iOS Quick Look requires USDZ
        auto-rotate
        camera-controls
        environment-image="neutral"         // optional lighting
        style={{ width: "100%", height: "70vh" }}
      >
      </model-viewer>
    </div>
  );
}