import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { createCar, fetchCategory, fetchBrands } from "../store/action/actionCreator.js";

function AddCar(props){
    const [model , setModel] = useState("")
    const [brand_id , setBrand_id] = useState(0)
    const [thumbnail , setThumbnail] = useState("")
    const [category_id , setCategory_id] = useState(0)
    const [price , setPrice] = useState(0)
    
    const brandData = useSelector((state)=>{
        return state.brandReducer.brands
    })

    const categoryData = useSelector((state)=>{
        return state.categoryReducer.categories
    })

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchCategory()),
        dispatch(fetchBrands())
    },[])

    return <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Add New Car
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container " style={{width:400 , padding: 25, border:5 }}>
      
        <div className="container" >
     <form onSubmit={(event)=>{
      event.preventDefault()
      const carData = {
        model,
        brand_id,
        thumbnail,
        category_id,
        price,
      }
      console.log(carData);
      dispatch(createCar(carData))
      props.onHide()
    }}>
      <div className="mb-3">
        <label className="form-label">Model Name</label>
        <input 
        className="form-control" 
        type="text"
        value={model}
        onChange={(event)=>{
          const value = event.target.value
          setModel(value)
        }}
         />
      </div>
      <label className="form-label">Brands</label>
      <Form.Select aria-label="Default select example" 
      value={brand_id}
      onChange={(event) => {
        const value = event.target.value;
        setBrand_id(value);
      }}
      >
        {
          brandData.map((el)=>{
            return <option key={el.id} value={el.id}>{el.name}</option>
          })
        }
    </Form.Select>
      <div className="mb-3">
        <label className="form-label">Model Image Link</label>
        <input 
        className="form-control" 
        type="text"
        value={thumbnail}
        onChange={(event)=>{
          const value = event.target.value
          setThumbnail(value)
        }}
         />
      </div>
      <label className="form-label">Categories</label>
      <Form.Select aria-label="Default select example" 
      value={category_id}
      onChange={(event) => {
        const value = event.target.value;
        setCategory_id(value);
      }}
      >
        {
          categoryData.map((el)=>{
            return <option key={el.id} value={el.id}>{el.name}</option>
          })
        }
    </Form.Select>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input 
        className="form-control" 
        type="number"
        value={price}
        onChange={(event)=>{
          const value = event.target.value
          setPrice(value)
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

export default AddCar;