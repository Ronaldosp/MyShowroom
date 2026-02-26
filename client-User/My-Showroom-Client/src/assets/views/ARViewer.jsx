import "@google/model-viewer";

export default function ARViewer({ imageUrl, iosUrl }) {
  console.log("ARVIEWER" , imageUrl , iosUrl);
  if (!imageUrl) return null;
  console.log("ARVIEWER" , imageUrl , iosUrl);
  
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <model-viewer
        src={imageUrl}               // desktop/mobile GLB or USDZ
        alt="3D Car"
        ar
        ar-modes="scene-viewer quick-look"
        ios-src={iosUrl}        // iOS Quick Look requires USDZ
        auto-rotate
        camera-controls
        environment-image="neutral"
        style={{ width: "100%", height: "70vh" }}
      />
    </div>
  );
}