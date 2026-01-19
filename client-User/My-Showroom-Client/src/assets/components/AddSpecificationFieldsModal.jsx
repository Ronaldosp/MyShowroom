import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { createSpecificationFields, fetchSpecificationCategory } from "../store/action/actionCreator";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";



function AddSpecificationFieldsModal({ show, onHide, specificationId , specificationName}){

    const [key , setKey] = useState("")
    const [value , setValue] = useState("")
    const [unit , setUnit] = useState("")
    const [overviewType, setOverviewType] = useState("");
    const overviewOptions = [
      "Engine Name",
      "Acceleration",
      "Power Output",
      "Drive System"
    ];
    console.log(specificationId ,"specificationId MODAL");
    console.log(specificationName ,"specificationName MODAL");

    const overviewWithoutUnit = ["Engine Name", "Drive System"];
    const isOverviewWithoutUnit =
    specificationName === "Overview" &&
    overviewWithoutUnit.includes(overviewType);

    const dispatch = useDispatch()

    useEffect(() => {
      if (
        specificationName === "Overview" &&
        overviewWithoutUnit.includes(overviewType)
      ) {
        setUnit("");
      }
    }, [overviewType, specificationName]);
    
    return <Modal
    show={show}
    onHide={onHide} 
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
       Create Specification Field
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container " style={{width:400 , padding: 25, border:5 }}>
      
    <div className="container" >
     <form onSubmit={(event)=>{
      event.preventDefault()
      const fieldData = {
        specification_id :specificationId,
        key: specificationName === "Overview" ? overviewType : key,
        value,
        unit: isOverviewWithoutUnit ? "N/A" : unit,
      }
      console.log(fieldData, "FIELDS DATA");
      dispatch(createSpecificationFields(fieldData)).then(() => {
        onHide();
      });
      setKey("");
      setValue("");
      setUnit("");
      setOverviewType("");
    }}>
      {specificationName === "Overview" ? (
        <div className="mb-3">
          <label className="form-label">Overview Type</label>
          <select
            className="form-select"
            value={overviewType}
            onChange={(e) => setOverviewType(e.target.value)}
          >
            <option value="">Select overview type</option>
            {overviewOptions.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="mb-3">
          <label className="form-label">Field Name</label>
          <input
            className="form-control"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">{isOverviewWithoutUnit ? "Name" : "Value (Amount)"}</label>
        <input 
        className="form-control" 
        type="text"
        value={value}
        onChange={(event)=>{
          const value = event.target.value
          setValue(value)
        }}
         />
      </div>
      {!(
        specificationName === "Overview" &&
        overviewWithoutUnit.includes(overviewType)
      ) && (
        <div className="mb-3">
          <label className="form-label">Unit ( HP , CM , MM)</label>
          <input 
            className="form-control" 
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>
      )}
        <div className="d-flex justify-content-center text-align-center mt-4">
        <button type="submit" className="btn btn-success">
          Create
        </button>
      </div>
    </form>
    </div>
    </div>
    </Modal.Body>
    </Modal>
}

export default AddSpecificationFieldsModal