import { useState } from "react";
import Car3DViewer from "./Car3DViewer";

function CarsDetailPage() {
  const [show3D, setShow3D] = useState(false);

  return (
    <div className="car-detail-component">
      <div className="car-detail-component_container">
        <div className="car-detail-component_top-content">
          <div className="car-detail-component_title">
            <h2>Car Model Name</h2>

            <button
              className="car-detail-component_3d-button"
              onClick={() => setShow3D(true)}
            >
              Show 3D View
            </button>
          </div>
        </div>

        {/* 3D Viewer Modal */}
        {show3D && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={() => setShow3D(false)} // close when clicking outside
          >
            <div
              style={{
                position: "relative",
                width: "90%",
                maxWidth: "700px",
                height: "80%",
                background: "#fff",
              }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <button
                onClick={() => setShow3D(false)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 10,
                }}
              >
                Close
              </button>

              {/* 3D Viewer Canvas */}
              <Car3DViewer />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarsDetailPage;
