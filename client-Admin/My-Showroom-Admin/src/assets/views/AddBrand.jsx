import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { createBrand, fetchBrand } from "../store/action/actionCreator";

function AddBrand(props){
    const [name , setName] = useState("")
    const [country , setCountry] = useState("")
    const [logo , setLogo] = useState("")

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchBrand())
    },[])

    return <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
        <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Add New Brand
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container " style={{width:400 , padding: 25, border:5 }}>
      
        <div className="container" >
     <form onSubmit={(event)=>{
      event.preventDefault()
      const brandData = {
        name,
        country,
        logo,
      }
      console.log(brandData);
      dispatch(createBrand(brandData))
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
      /<div className="mb-3">
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
        <label className="form-label">Logo Url</label>
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
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
}

export default AddBrand