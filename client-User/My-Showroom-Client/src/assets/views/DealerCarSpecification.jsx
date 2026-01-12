import "../styling/DealerSpecificationPage.scss"
import AddFeatureModal from "../components/AddFeatureModal";
import AddSpecificationFieldsModal from "../components/AddSpecificationFieldsModal";
import { useState , useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useSelector,useDispatch } from "react-redux";
import { fetchCar , fetchCategory , fetchBrands, fetchFeatureCategory , fetchSpecificationCategory , fetchCarId  , createSpecifications } from "../store/action/actionCreator";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function DealerCarSpecification(){
    const dispatch = useDispatch();
    const { id } = useParams();

    const [showFeatureModal, setShowFeatureModal] = useState(false);
    const [activeFeatureCategory, setActiveFeatureCategory] = useState(null);
    const [showSpecModal, setShowSpecModal] = useState(false);
    const [activeSpecificationId, setActiveSpecificationId] = useState(null);

    console.log(id , "ttest id");
    const carData = useSelector(
        (state) => state.carReducer.carsId
    );

    const featureCategoryData = useSelector(
        (state) => state.featureCategoryReducer.featureCategories
    );

    const specificationCategoryData = useSelector(
        (state) => state.specificationCategoryReducer.specificationCategories
    );
    console.log(carData , "carData");
    console.log(featureCategoryData , "featureCategoryData");
    console.log(specificationCategoryData , "specificationCategoryData");

    function handleSpecCreation(specId){
      const specData={
        car_id: Number(id),
        specificationCategory_id:specId
      }
      setActiveSpecificationId(specId)
      console.log(specData , "specData");
      
      dispatch(createSpecifications(specData))
    }

    useEffect(() => {
        dispatch(fetchCarId(id))
        dispatch(fetchFeatureCategory())
        dispatch(fetchSpecificationCategory())
        
    }, [dispatch , id]);
    
    return (
        <div className="dealerprofilespecification-container">

            <div className="spec-feature-grid">
            
            {/* LEFT — SPECIFICATIONS */}
            <div className="spec-column">
                <h4 className="mb-3">Specifications</h4>
                
                {specificationCategoryData.map((spec) => (
                
                <div key={spec.id} className="spec-card">

                    <h6 className="spec-title">{spec.name}</h6>
                    <Button size="sm" variant="outline-primary"
                        onClick={() => {
                            handleSpecCreation(spec.id)
                            setShowSpecModal(true);
                        }}
                    >
                        + Add Specification
                    </Button>
                    <table className="table table-sm">
                    <thead>
                        <tr>
                        <th>Field</th>
                        <th>Value</th>
                        <th width="120">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td colSpan="3" className="text-muted text-center">
                            No specification added
                        </td>
                        </tr>
                    </tbody>
                    </table>

                    
                </div>
                ))}
            </div>

            {showSpecModal && (
                <AddSpecificationFieldsModal
                    show={showSpecModal}
                    specificationId={activeSpecificationId}
                    onHide={() => {
                    setShowSpecModal(false);
                    dispatch(fetchCarId(id)); // refresh features
                    }}
                />
            )}
            

            {/* RIGHT — FEATURES */}
            <div className="feature-column">
                <h4 className="mb-3">Features</h4>
                
                <Button size="sm" variant="outline-primary"
                        onClick={() => {
                            setShowFeatureModal(true);
                        }}
                    >
                        + Add Feature
                </Button>

                {featureCategoryData.map((category) => (
                <div key={category.id} className="feature-card">

                    <h6 className="feature-title">{category.name}</h6>
                    

                    <table className="table table-sm">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th width="120">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td colSpan="4" className="text-muted text-center">
                            No features added
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                ))}
            </div>

            {showFeatureModal && (
                <AddFeatureModal
                    show={showFeatureModal}
                    onHide={() => {
                    setShowFeatureModal(false);
                    dispatch(fetchCarId(id)); // refresh features
                    }}
                />
            )}

            </div>
        </div>
    );
}