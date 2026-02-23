import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { createDealer, fetchBrands } from "../store/action/actionCreator";
import { jwtDecode } from "jwt-decode";

function ModalPop(props){
    const [shopName , setShopName] = useState("")
    const [type , setType] = useState("")
    const [address , setAddress] = useState("")
    const [instagramLink , setInstagramLink] = useState("")
    const [whatsAppLink , setWhatsAppLink] = useState("")
    const [brand_id , setBrandId] = useState([])
    const [user_id, setUserId] = useState(null);

    const data = useSelector((state)=>{
      return state.brandReducer.brands
    })
    

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchBrands())
        const token = localStorage.getItem("access_token");
        if (!token) return;
        try {
            const decoded = jwtDecode(token);
            setUserId(decoded.id);
        } catch (err) {
            console.error("Invalid token");
        }
    },[])
    
    return <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Create Dealer Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container " style={{width:400 , padding: 25, border:5 }}>
          <div className="container" >
            <form onSubmit={(event)=>{
              event.preventDefault();

              if(!shopName.trim() || !address.trim() || !type.trim() || !whatsAppLink.trim() || !brand_id){
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Shop Name, Address, Image, Brand and WhatsAppLink are required",
                });

                if(!user_id){
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Internal Server Error (Logic Issue)",
                  });
                }
                return;
              }

              const dealerData = {
                shopName,
                type,
                address,
                instagramLink,
                whatsAppLink,
                brand_id,
                user_id  
              }

              dispatch(createDealer(dealerData))
              .then(() => {
                Swal.fire("Success", "Dealer Profile Created Successfully!", "success");
                props.onHide();
              })
              .catch(() => {
                Swal.fire("Error", "Failed to create dealer profile", "error");
              });
              
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
                type="text"
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
                value={brand_id}
                onChange={(event) => {
                    const values = Array.from(
                    event.target.selectedOptions,
                    (option) => Number(option.value)
                    );
                    setBrandId(values);
                }}
                >
                {data.map((el) => (
                    <option key={el.id} value={el.id}>
                    {el.name}
                    </option>
                ))}
                </Form.Select>
              <div className="mb-3">
                <label className="form-label">Instagram Link</label>
                <input 
                className="form-control" 
                type="text"
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
                type="text"
                value={whatsAppLink}
                onChange={(event)=>{
                  const value = event.target.value
                  setWhatsAppLink(value)
                }}
                />
              </div>
                <div className="d-flex justify-content-center text-align-center">
                <button type="submit" className="btn btn-success">
                  Create
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

export default ModalPop