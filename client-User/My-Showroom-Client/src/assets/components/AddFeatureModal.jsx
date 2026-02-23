import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { createFeature, fetchFeatureCategory } from "../store/action/actionCreator";
import { useParams } from "react-router-dom";



function AddFeatureModal(props){
     const { id } = useParams();

    const [name , setName] = useState("")
    const [description , setDescription] = useState("")
    const [thumbnail , setThumbnail] = useState("")
    const [featureCategory_id, setFeatureCategoryId] = useState(null);

    const featureCategoryData = useSelector(
        (state) => state.featureCategoryReducer.featureCategories
    );
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchFeatureCategory())
    },[dispatch])
    
    return <Modal
        {...props}
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Create Feature
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container " style={{width:400 , padding: 25, border:5 }}>
          <div className="container" >
            <form onSubmit={(event)=>{
              event.preventDefault();

              if(!featureCategory_id || !name.trim() || !description.trim() || !thumbnail.trim()){
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Category, Name, Description, and Image are required",
                });
                return;
              }
              
              const featureData = {
                car_id:id,
                featureCategory_id,
                name,
                description,
                thumbnail,
              }

              dispatch(createFeature(featureData))
              .then(() => {
                
                Swal.fire("Success", "Car Feature added!", "success");
                setName("");
                setDescription("");
                setThumbnail("");
                setFeatureCategoryId(null);
                props.onHide();
              })
              .catch(() => {
                Swal.fire("Error", "Failed to add car feature", "error");
              });
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
              <div className="mb-3">
                <label className="form-label">Thumbnail</label>
                <input 
                className="form-control" 
                type="text"
                value={thumbnail}
                onChange={(event)=>{
                  const value = event.target.value
                  setThumbnail(value)
                }}
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
              <label className="form-label">Category</label>
                <Form.Select
                value={featureCategory_id || ""}
                onChange={(event) => {
                    setFeatureCategoryId(Number(event.target.value));
                }}
                >
                <option value="" disabled>
                    -- Select Category --
                </option>

                {featureCategoryData.map((el) => (
                    <option key={el.id} value={el.id}>
                    {el.name}
                    </option>
                ))}
                </Form.Select>
                <div className="d-flex justify-content-center text-align-center mt-4">
                <button type="submit" className="btn btn-success">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
}

export default AddFeatureModal