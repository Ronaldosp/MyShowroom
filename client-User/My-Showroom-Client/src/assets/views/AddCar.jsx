import { useState , useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import Button from "react-bootstrap/Button";

export default function AddCar(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [model , setModel] = useState("")
    const [brand_id, setBrandId] = useState(0)
    const [thumbnail , setThumbnail] = useState("")
    const [category_id, setCategoryId] = useState(0)
    const [price, setPrice] = useState(0)
    const [dealer_id, setDealerId] = useState(0)
    

    return (
        <div style={{
        backgroundImage: 'url("https://i.etsystatic.com/23444619/r/il/c95fc2/3826885344/il_fullxfull.3826885344_p6rt.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div className="container " style={{maxWidth: '800px',
        width: '100%',
        backgroundColor: 'white',
        padding: '25px 30px',
        borderRadius: '5px',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
        border:'5' }}>
            <h1 className="d-flex justify-content-center text-align-center">Register Form</h1>
            <div className="container" >
         <form onSubmit={(event)=>{
          event.preventDefault()
          const registerData={
            email , password , username , role
          };
          dispatch(register(registerData))
          navigate('/')

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
          <div className="mb-3">
            <label className="form-label">Thumbnail Image URL</label>

            <input
                type="text"
                className="form-control"
                placeholder="https://example.com/car.jpg"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
            />

            {thumbnail && (
                <img
                src={thumbnail}
                alt="Preview"
                onError={(e) => (e.target.style.display = "none")}
                style={{
                    marginTop: "10px",
                    width: "100%",
                    maxHeight: "250px",
                    objectFit: "cover",
                    borderRadius: "8px"
                }}
                />
            )}
            </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input 
            type="text" 
            className="form-control"
            value={price}
            onChange={(event)=>{
              const value = event.target.value
              setPrice(value)
            }}
             />
          </div>
          
          <div className="d-flex justify-content-center text-align-center">
           <Button  type="submit" className="btn btn-dark">
          Add Car 
          </Button>
          </div>
        </form>
        </div>
        </div>
        </div>
    )
}