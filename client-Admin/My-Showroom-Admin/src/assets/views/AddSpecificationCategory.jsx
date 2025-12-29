
import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { createScpecificationCategory, fetchScpecificationCategory } from "../store/action/actionCreator.js";

function AddSpecificationCategory(props){
    const [name , setName] = useState("")

    const dispatch = useDispatch()

    return <Modal
    {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header closeButton style={{paddingLeft: 25}}>
      <Modal.Title id="contained-modal-title-vcenter" >
        <h2>Add New Specification Category</h2>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container " style={{width:400 , padding: 25, border:5 }}>
      
        <div className="container" >
     <form onSubmit={(event)=>{
      event.preventDefault()
      const specificationCategoryData = {
        name
      }
      console.log(specificationCategoryData);
      dispatch(createScpecificationCategory(specificationCategoryData))
      props.onHide()
    }}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input 
        className="form-control" 
        type="text"
        value={name}
        onChange={(event)=>{
          const value = event.target.value
          setName(value)
        }}
        />
      </div>
        <div className="d-flex justify-content-center text-align-center">
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </div>
    </form>
    </div>
    </div>
    </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
}

export default AddSpecificationCategory;