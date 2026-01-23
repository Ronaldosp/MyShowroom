import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { useState } from "react";
import AddCar from "../views/AddCar.jsx";
import Car3DViewer from "../views/Car3DViewer";
import ARViewer from "../views/ARViewer";

function CarTable({ el, index }) {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [viewerType, setViewerType] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedAssetMobileDesk, setSelectedAssetMobileDesk] = useState(null);
  console.log("selectedAsset:", selectedAsset);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const handleViewAsset = (type) => {
    if (!el.CarARAsset) return;

    console.log("[CarTable] View asset:", type);

    if (type === "3d") {
      setSelectedAsset(el.CarARAsset.desktopAsset);
      setViewerType("3d");
    }

    if (type === "ar") {
      setSelectedAsset(el.CarARAsset.mobileAsset);
      setSelectedAssetMobileDesk(el.CarARAsset.desktopAsset)
      setViewerType("ar");
    }

    setShowViewer(true);
  };

  return (
    <tbody>
      <tr>
        <td>{index}</td>
        <td>{el.model}</td>
        <td>{el.Brand?.name}</td>
        <td>
          <img
            src={el.thumbnail}
            style={{ width: '200px', objectFit: 'cover' }}
          />
        </td>
        <td>{el.Category?.name}</td>

        {/* Add / Edit AR Asset */}
        <td>
          <Button
            variant={el.CarARAsset ? 'warning' : 'success'}
            onClick={() => setModalShow(true)}
          >
            {el.CarARAsset ? 'Edit AR Asset' : 'Add AR Asset'}
          </Button>

          <AddCar
            show={modalShow}
            onHide={() => setModalShow(false)}
            carId={el.id}
            carARAsset={el.CarARAsset || null}
          />
        </td>

        {/* VIEW BUTTONS */}
        <td>
          {el.CarARAsset && (
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                variant="info"
                onClick={() => handleViewAsset("3d")}
              >
                View 3D
              </Button>

              <Button
                variant="secondary"
                onClick={() => handleViewAsset("ar")}
              >
                View AR
              </Button>
            </div>
          )}

          {/* VIEWER MODAL */}
          {showViewer && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
              onClick={() => setShowViewer(false)}
            >
              <div
                style={{
                  position: "relative",
                  width: "90%",
                  maxWidth: "700px",
                  height: "80%",
                  background: "#fff",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowViewer(false)}
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 10,
                    zIndex: 10,
                  }}
                >
                  Close
                </button>

                {viewerType === "3d" && (
                  <Car3DViewer modelUrl={`https://pc6k0rjb-3000.asse.devtunnels.ms/uploads/${selectedAsset}`} />
                )}

                {viewerType === "ar" && (
                  <ARViewer imageUrl={`https://pc6k0rjb-3000.asse.devtunnels.ms/uploads/${selectedAssetMobileDesk}`} iosUrl={isIOS ? `https://pc6k0rjb-3000.asse.devtunnels.ms/uploads/${selectedAsset}`: undefined} />
                )}
              </div>
            </div>
          )}
        </td>
      </tr>
    </tbody>
  );
}

export default CarTable;