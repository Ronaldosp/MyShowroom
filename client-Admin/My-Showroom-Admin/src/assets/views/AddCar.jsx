import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { createCarARAsset , fetchCar } from "../store/action/actionCreator.js";

function AddCar({ carId, ...props }) {
  const [desktopFile, setDesktopFile] = useState(null);
  const [mobileFile, setMobileFile] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!desktopFile || !mobileFile) {
      alert("Please select both desktop and mobile AR files");
      return;
    }

    const formData = new FormData();
    formData.append("car_id", carId);
    formData.append("desktopAsset", desktopFile);
    formData.append("mobileAsset", mobileFile);

    dispatch(createCarARAsset(formData));
    props.onHide();
    dispatch(fetchCar());
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Car AR Asset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Desktop Asset</label>
            <input
              className="form-control"
              type="file"
              accept=".glb,.usdz,.gltf"
              onChange={(e) => setDesktopFile(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile Asset</label>
            <input
              className="form-control"
              type="file"
              accept=".glb,.usdz,.gltf"
              onChange={(e) => setMobileFile(e.target.files[0])}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
          
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCar;