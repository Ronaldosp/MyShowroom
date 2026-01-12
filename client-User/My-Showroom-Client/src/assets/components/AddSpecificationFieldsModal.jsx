import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { createSpecificationFields, fetchSpecificationCategory } from "../store/action/actionCreator";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";



function AddSpecificationFieldsModal({ show, onHide, specificationId }){

    const [key , setKey] = useState("")
    const [value , setValue] = useState("")
    const [unit , setUnit] = useState("")
    console.log(specificationId ,"specificationId MODAL");
    

    const dispatch = useDispatch()

    useEffect(()=>{

    },[dispatch])
    
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
        key,
        value,
        unit,
      }
      console.log(fieldData, "FIELDS DATA");
      dispatch(createSpecificationFields(fieldData))
      setKey("");
      setValue("");
      setUnit("");

      onHide();
    }}>
      <div className="mb-3">
        <label className="form-label">Field Name</label>
        <input 
        className="form-control" 
        type="text"
        value={key}
        onChange={(event)=>{
          const value = event.target.value
          setKey(value)
        }}
         />
      </div>
      <div className="mb-3">
        <label className="form-label">Value (Amount)</label>
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
      <div className="mb-3">
        <label className="form-label">Unit ( HP , CM , MM)</label>
        <input 
        className="form-control" 
        type="text"
        value={unit}
        onChange={(event)=>{
          const value = event.target.value
          setUnit(value)
        }}
         />
      </div>
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