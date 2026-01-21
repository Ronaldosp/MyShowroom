import "../styling/DealerSpecificationPage.scss"
import AddFeatureModal from "../components/AddFeatureModal";
import AddSpecificationFieldsModal from "../components/AddSpecificationFieldsModal";
import { useState , useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useSelector,useDispatch } from "react-redux";
import { fetchCar , fetchCategory , fetchBrands, fetchFeatureCategory , fetchSpecificationCategory , fetchCarId  , createSpecifications , deleteSpecifications , deleteSpecificationFields , deleteFeature} from "../store/action/actionCreator";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function DealerCarSpecification(){
    const dispatch = useDispatch();
    const { id } = useParams();

    const [showFeatureModal, setShowFeatureModal] = useState(false);
    const [activeFeatureCategory, setActiveFeatureCategory] = useState(null);
    const [showSpecModal, setShowSpecModal] = useState(false);
    const [activeSpecificationId, setActiveSpecificationId] = useState(null);
    const [activeSpecificationName, setActiveSpecificationName] = useState(null);

    const carData = useSelector(
        (state) => state.carReducer.carsId
    );

    const featureCategoryData = useSelector(
        (state) => state.featureCategoryReducer.featureCategories
    );

    const specificationCategoryData = useSelector(
        (state) => state.specificationCategoryReducer.specificationCategories
    );

    async function handleSpecCreation(specId) {
        const specData = {
            car_id: Number(id),
            specificationCategory_id: specId
        };

        try {
            const createdSpec = await dispatch(createSpecifications(specData));

            setActiveSpecificationId(createdSpec.id);
            setShowSpecModal(true);

        } catch (err) {
            console.error(err);
        }
    }

    const handleDeleteSpec = async(event, fieldId , specificationId) => {
        event.preventDefault();

        try {
            await dispatch(deleteSpecificationFields(fieldId));
            await dispatch(deleteSpecifications(specificationId));

            dispatch(fetchCarId(id));
        } catch (err) {
            console.error(err);
        }
        //Swal.fire("Specification field successfully deleted");
    };

    const handleDeleteFeature = async (event, fieldId ) => {
        event.preventDefault();

        try {
            await dispatch(deleteFeature(fieldId));

            dispatch(fetchCarId(id));
        } catch (err) {
            console.error(err);
        }
        
        //Swal.fire("Feature successfully deleted");
    };


    useEffect(() => {
        dispatch(fetchCarId(id))
        dispatch(fetchFeatureCategory())
        dispatch(fetchSpecificationCategory())
        
    }, [dispatch , id]);
    
    return (
        <div className="dealerprofilespecification-container">
            <div className="dealerprofilespecification-car-container">
                <div className="dealerprofilespecification-car-brand">
                    <h3>{carData.Brand?.name}</h3>
                </div>
                <div className="dealerprofilespecification-car-image">
                    <img src={carData.thumbnail}/>
                </div>
                <div className="dealerprofilespecification-car-title">
                    <h2>{carData.model}</h2>
                </div>
            </div>

            <div className="spec-feature-grid">
            
            {/* LEFT — SPECIFICATIONS */}
            <div className="spec-column">
                <h4 className="mb-3">Specifications</h4>
                
                {specificationCategoryData.map((spec) => {
                    const specifications = carData?.Specifications?.filter(
                        s => s.SpecificationCategory?.id === spec.id
                    );

                    console.log(specifications , "specification");
                    

                    return (
                        <div key={spec.id} className="spec-card">
                        <h6 className="spec-title">{spec.name}</h6>
                        <Button size="sm" variant="outline-primary"
                            onClick={() => {
                                handleSpecCreation(spec.id)
                                setShowSpecModal(true);
                                setActiveSpecificationName(spec.name)
                            }}
                        >
                            + Add Specification
                        </Button>
                            <div className="table-responsive">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                        <th>Key</th>
                                        <th>Value</th>
                                        <th>Unit</th>
                                        <th width="120">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {specifications?.length ? (
                                        specifications.map(specItem =>
                                            specItem.SpecificationFields?.map(field => (
                                            <tr key={field.id}>
                                                <td>{field.key}</td>
                                                <td>{field.value}</td>
                                                <td>{field.unit}</td>
                                                <td>
                                                    <Button onClick={(event) => handleDeleteSpec(event, field.id , field.specification_id )} variant="danger">Delete</Button>
                                                </td>
                                            </tr>
                                            ))
                                        )
                                    ) : (
                                    <tr>
                                        <td colSpan="4" className="text-muted text-center">
                                        No specification added
                                        </td>
                                    </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showSpecModal && (
                <AddSpecificationFieldsModal
                    show={showSpecModal}
                    specificationId={activeSpecificationId}
                    specificationName={activeSpecificationName}
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

                {featureCategoryData.map(category => {
                    const features = carData?.Features?.filter(
                        f => f.featureCategory_id === category.id
                    );

                    return (
                        <div key={category.id} className="feature-card">
                        <h6 className="feature-title">{category.name}</h6>

                        <div className="table-responsive">
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th className="action-table">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {features?.length ? (
                                    features.map(feature => (
                                    <tr key={feature.id}>
                                        <td>{feature.name}</td>
                                        <td>{feature.description}</td>
                                        <td>
                                        {feature.thumbnail && (
                                            <img
                                            src={feature.thumbnail}
                                            alt={feature.name}
                                            style={{ width: 60, borderRadius: 4 }}
                                            />
                                        )}
                                        </td>
                                        <td>
                                            <Button onClick={(event) => handleDeleteFeature(event, feature.id)} variant="danger">Delete</Button>
                                        </td>
                                        
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="4" className="text-muted text-center">
                                        No features added
                                    </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        </div>
                    );
                })}
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