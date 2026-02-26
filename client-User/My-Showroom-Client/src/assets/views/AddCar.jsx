import { useState , useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import Button from "react-bootstrap/Button";
import { fetchCategory , fetchBrands , createCar , fetchDealerUserProfile } from "../store/action/actionCreator";
import Form from 'react-bootstrap/Form';
import { jwtDecode } from "jwt-decode";

export default function AddCar(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const dataCategories = useSelector((state)=>{
      return state.categoryReducer.categories
    })

    const dataBrands = useSelector((state)=>{
      return state.brandReducer.brands
    })

    const dealerProfile = useSelector(
        (state) => state.dealerReducer.dealerProfiles
    );

    const [model , setModel] = useState("")
    const [brand_id, setBrandId] = useState(null)
    const [thumbnail , setThumbnail] = useState("")
    const [category_id, setCategoryId] = useState(null)
    const [price, setPrice] = useState(0)
    const [dealer_id, setDealerId] = useState(null)

    useEffect(()=>{
      dispatch(fetchCategory())
      dispatch(fetchBrands())

      const token = localStorage.getItem("access_token");
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        dispatch(fetchDealerUserProfile(decoded.id));
      } catch (err) {
        console.error("Invalid token");
      }

    },[dispatch])

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token || !dealerProfile?.length) return;

      const decoded = jwtDecode(token);
      const profile = dealerProfile.find(p => p.user_id === decoded.id);

      if (profile) {
        setDealerId(profile.id);
      }
    }, [dealerProfile]);

    return (
        <div style={{
        backgroundImage: 'url("https://wallpapers.com/images/hd/black-and-white-car-2880-x-1920-wallpaper-2ckfd8w9nmcx7uk3.jpg")',
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
            <h1 className="d-flex justify-content-center text-align-center">Add New Car for Dealer</h1>
            <div className="container" >
         <form onSubmit={(event)=>{
          event.preventDefault();

          if(!model.trim() || !brand_id || !thumbnail.trim() || !category_id || !price ){
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Model, Brand, Image, Category and Price are required",
              });

              if(!dealer_id){
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Internal Server Error (Logic Issue)",
                });
              }
              return;
          }

          const carData={
            model , brand_id , thumbnail , category_id , price , dealer_id
          };

          dispatch(createCar(carData))
          .then(() => {
            Swal.fire("Success", "Car added!", "success");
            setModel("");
            setBrandId(null);
            setThumbnail("");
            setCategoryId(null);
            setPrice(null);
            navigate('/dealer')
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to add car", "error");
          });

          
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
          <label className="form-label">Brand</label>
          <Form.Select aria-label="Default select example" 
            value={brand_id}
            onChange={(event) => {
              const value = event.target.value;
              setBrandId(Number(value));
            }}
          >
            <option value='' ></option>
            {
              dataBrands.map((el)=>{
                return <option key={el.id} value={el.id}>{el.name}</option>
              })
            }
          </Form.Select>
          <label className="form-label">Category</label>
          <Form.Select aria-label="Default select example" 
            value={category_id}
            onChange={(event) => {
              const value = event.target.value;
              setCategoryId(Number(value));
            }}
          >
            <option value='' ></option>
            {
              dataCategories.map((el)=>{
                return <option key={el.id} value={el.id}>{el.name}</option>
              })
            }
          </Form.Select>
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
              setPrice(Number(value))
            }}
             />
          </div>
          
          <div className="d-flex justify-content-center text-align-center">
           <Button  type="submit" className="btn btn-dark">
            Confirm 
          </Button>
          </div>
        </form>
        </div>
        </div>
        </div>
    )
}