import Modal from "react-bootstrap/Modal";
import { useState } from "react"

import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { createDealer, editDealer, fetchBrands } from "../store/action/actionCreator";
import { useEffect } from "react";

function EditModal(props){

    const dispatch = useDispatch()
    const data = useSelector((state)=>{
        return state.dealerReducer.dealerProfiles
    })
   
    console.log(dataDetail);

    const [name , setName] = useState(dataDetail.name)
    const [description , setDescription] = useState(dataDetail.description)
    const [price , setPrice] = useState(dataDetail.price)
    const [imgUrl , setImgUrl] = useState(dataDetail.imgUrl)
    const [categoryId , setCategoryId] = useState(dataDetail.categoryId)

    useEffect(() => {
        if (dataDetail) {
          setName(dataDetail.name || '');
          setDescription(dataDetail.description || '');
          setPrice(dataDetail.price || '');
          setImgUrl(dataDetail.imgUrl || '');
          setCategoryId(dataDetail.categoryId || 0);
        }
      }, [dataDetail])

    return  <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      Edit Food
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container " style={{width:400 , padding: 25, border:5 }}>
      <div className="container" >
   <form onSubmit={(event)=>{
    event.preventDefault()
    const foodData = {
      name,
      description,
      price,
      imgUrl,
      categoryId,
    }
    dispatch(editItem(dataDetail.id , foodData))
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
      <label className="form-label">Description</label>
      <input 
      className="form-control" 
      type="text"
      value={description}
      onChange={(event)=>{
        const value = event.target.value
        setDescription(value)
      }}
       />
    </div>
    <label className="form-label">Category</label>
    <Form.Select aria-label="Default select example" 
    value={categoryId}
    onChange={(event) => {
      const value = event.target.value;
      setCategoryId(value);
    }}
    >
      <option value='' >---choose a category---</option>
      {
        data.map((el)=>{
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
    <div className="mb-3">
      <label className="form-label">Image Url</label>
      <input 
      className="form-control" 
      type="text"
      value={imgUrl}
      onChange={(event)=>{
        const value = event.target.value
        setImgUrl(value)
      }}
       />
    </div>
      <div className="d-flex justify-content-center text-align-center">
      <button type="submit" className="btn btn-dark">
        Edit
      </button>
    </div>
  </form>
  </div>
  </div>
    </Modal.Body>
  </Modal>

}

export default EditModal