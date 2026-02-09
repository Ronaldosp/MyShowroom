
import { useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { createScpecificationCategory } from "../store/action/actionCreator.js";

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
        <div className="container " style={{padding: 25, border:5 }}>
          <div className="container" >
            <form onSubmit={(event)=>{
              event.preventDefault();
              
              if(!name.trim()){
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Name is required",
                });
                return;
              }

              const specificationCategoryData = {
                name
              }

              dispatch(createScpecificationCategory(specificationCategoryData))
              .then(() => {
                Swal.fire("Success", "Specification Category added!", "success");
                setName("");
                props.onHide();
              })
              .catch(() => {
                Swal.fire("Error", "Failed to add specification category", "error");
              });

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
    </Modal>
}

export default AddSpecificationCategory;