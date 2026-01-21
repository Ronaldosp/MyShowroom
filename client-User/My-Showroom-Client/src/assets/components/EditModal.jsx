import Modal from "react-bootstrap/Modal";
import { useState } from "react"

import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { fetchDealerUserProfileDetail, editDealer, fetchBrands } from "../store/action/actionCreator";
import { useEffect } from "react";

function EditModal(props){

    const dispatch = useDispatch()
    const data = useSelector((state)=>{
        return state.dealerReducer.dealerProfiles
    })

    const dataBrands = useSelector((state)=>{
      return state.brandReducer.brands
    })
    const dataProfile = data[0];

    const [shopName, setShopName] = useState("");
    const [type, setType] = useState("");
    const [address, setAddress] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [whatsAppLink, setWhatsAppLink] = useState("");
    const [brand_id, setBrandId] = useState([]);
    const [user_id, setUserId] = useState(null);

    useEffect(() => {
        if (dataProfile) {
          setShopName(dataProfile.shopName || '');
          setType(dataProfile.type || '');
          setAddress(dataProfile.address || '');
          setInstagramLink(dataProfile.instagramLink || '');
          setWhatsAppLink(dataProfile.whatsAppLink || '');
          setUserId(dataProfile.user_id);
          setBrandId(
            dataProfile.Brands?.map((b) => b.id) || []
          );
        }
      }, [dataProfile])

    return  <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    fullscreen="sm-down" 
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      Edit Dealer Profile
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container-fluid px-3 " style={{padding: 25, border:5 }}>
      <div className="container" >
   <form onSubmit={(event)=>{
    event.preventDefault()
    const dealerData = {
      shopName,
      type,
      address,
      instagramLink,
      whatsAppLink,
      brand_id,
      user_id 
    }
    dispatch(editDealer(dataProfile.id , dealerData))
    props.onHide()
  }}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input 
        className="form-control" 
        type="text"
        value={shopName}
        onChange={(event)=>{
          const value = event.target.value
          setShopName(value)
        }}
         />
      </div>
      <div className="mb-3">
        <label className="form-label">Shop Logo</label>
        <input 
        className="form-control" 
        type="text"
        value={type}
        onChange={(event)=>{
          const value = event.target.value
          setType(value)
        }}
         />
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input 
        className="form-control" 
        type="textarea"
        value={address}
        onChange={(event)=>{
          const value = event.target.value
          setAddress(value)
        }}
         />
      </div>
      <label className="form-label">Brands</label>
        <Form.Select
        multiple
        className="mb-3"
        style={{ minHeight: 120 }}
        value={brand_id}
        onChange={(event) => {
            const values = Array.from(
            event.target.selectedOptions,
            (option) => Number(option.value)
            );
            setBrandId(values);
        }}
        >
        {dataBrands.map((el) => (
            <option key={el.id} value={el.id}>
            {el.name}
            </option>
        ))}
        </Form.Select>
      <div className="mb-3">
        <label className="form-label">Instagram Link</label>
        <input 
        className="form-control" 
        type="url"
        value={instagramLink}
        onChange={(event)=>{
          const value = event.target.value
          setInstagramLink(value)
        }}
         />
      </div>
      <div className="mb-3">
        <label className="form-label">WhatsApp Link</label>
        <input 
        className="form-control" 
        type="url"
        value={whatsAppLink}
        onChange={(event)=>{
          const value = event.target.value
          setWhatsAppLink(value)
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