import { useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { createBrands } from "../store/action/actionCreator.js";

function AddBrand(props){
    const [name , setName] = useState("")
    const [country , setCountry] = useState("")
    const [logo , setLogo] = useState("")

    const dispatch = useDispatch()

    return <Modal
    {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton style={{paddingLeft: 25}}>
        <Modal.Title id="contained-modal-title-vcenter" >
          <h2>Add New Brand</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="container " style={{padding: 25, border:5 }}>
        <div className="container" >
          <form onSubmit={(event)=>{
            event.preventDefault()
            if(!name.trim() || !country.trim() || !logo.trim()){
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Name, country, and logo are required",
              });
              return;
            }

            const brandData = {
              name,
              country,
              logo,
            }

            dispatch(createBrands(brandData))
            .then(() => {
              Swal.fire("Success", "Brand added!", "success");
              setName("");
              setCountry("");
              setLogo("");
              props.onHide();
            })
            .catch(() => {
              Swal.fire("Error", "Failed to add brand", "error");
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
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input 
              className="form-control" 
              type="text"
              value={country}
              onChange={(event)=>{
                const value = event.target.value
                setCountry(value)
              }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Logo Url Test</label>
              <input 
              className="form-control" 
              type="text"
              value={logo}
              onChange={(event)=>{
                const value = event.target.value
                setLogo(value)
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

export default AddBrand