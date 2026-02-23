import "../styling/DealerPage.scss"
import ModalPop from "../components/ModalPop";
import EditModal from "../components/EditModal";
import { useState , useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useSelector,useDispatch } from "react-redux";
import { fetchDealerIdCars , deleteCar  } from "../store/action/actionCreator";
import { useNavigate } from "react-router-dom";

export default function DealerPage(){
    const dispatch = useDispatch();
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const dealerProfile = useSelector(
        (state) => state.dealerReducer.dealerProfiles
    );
    const dealerProfileCars = useSelector(
        (state) => state.dealerReducer.dealerCars
    );
    
    let hasDealerProfile = false;

    if (Array.isArray(dealerProfile) && dealerProfile.length > 0) {
        hasDealerProfile = true;
    }

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/addcar"); // replace with your route
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            dispatch(fetchDealerUserProfile(decoded.id));
        } catch (err) {
            console.error("Invalid token");
        }
    }, [dispatch]);

    useEffect(() => {
        if (dealerProfile && dealerProfile.length > 0) {
            dispatch(fetchDealerIdCars(dealerProfile[0].id));
        }
    }, [dealerProfile, dispatch]);

    const profile = dealerProfile?.[0];

    const handleDelete= (event,carId) => {
        event.preventDefault();
        dispatch(deleteCar(carId))
            Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Car has been deleted.",
            timer: 1500,
            showConfirmButton: false,
        });
        dispatch(fetchDealerIdCars(profile.id));
    };
    
    return(
        <div className="dealerprofile-container">
            <div className="dealerprofile-modal-button">
                {!hasDealerProfile && (
                    <Button variant="outline-primary" onClick={() => setShowCreate(true)}>
                        Create Dealer Profile
                    </Button>
                )}
                <ModalPop show={showCreate} onHide={() => setShowCreate(false)} />
                {hasDealerProfile && (
                    <Button variant="outline-primary" onClick={() => setShowEdit(true)}>
                        Edit  Dealer Profile
                    </Button>
                )}
                <EditModal show={showEdit} onHide={() => setShowEdit(false)} />
            </div>
           <div className="dealerprofile-detail-container">
            {profile  && (
                <>
                <div className="dealerprofile-detail-image">
                    <img src={profile.type || ""} alt={profile.shopName} />
                </div>

                <div className="dealerprofile-detail-name">
                    <h2>{profile.shopName}</h2>
                </div>

                <table className="dealerprofile-detail-credentials">
                    <tbody>
                        <tr>
                        <td>Address :</td>
                        <td>{profile.address}</td>
                        </tr>
                        <tr>
                        <td>Instagram :</td>
                        <td>
                            <a href={profile.instagramLink} target="_blank" rel="noreferrer">
                            {profile.instagramLink}
                            </a>
                        </td>
                        </tr>
                        <tr>
                        <td>WhatsApp :</td>
                        <td>
                            <a href={profile.whatsAppLink} target="_blank" rel="noreferrer">
                            {profile.whatsAppLink}
                            </a>
                        </td>
                        </tr>
                        <tr>
                        <td>Brands :</td>
                        <td>
                            <ul>
                            {profile.Brands?.map((brand) => (
                                <li key={brand.id}>{brand.name}</li>
                            ))}
                            </ul>
                        </td>
                        </tr>
                    </tbody>
                </table>

                </>
            )}
            </div>
            <div className="dealerprofile-detail-cars-container">
                {dealerProfileCars.map((car) => (
                    <div key={car.id} className="dealerprofile-detail-cars-card">
                        <img src={car.thumbnail} alt={car.model}/>
                        <div className="dealerprofile-detail-cars-card__bottom-container">
                            <p className="dealerprofile-detail-cars-card__brand">{car.Brand.name}</p>
                            <h4 className="dealerprofile-detail-cars-card__model">{car.model}</h4>
                            <p className="dealerprofile-detail-cars-card__category">{car.Category.name}</p>
                            <p className="dealerprofile-detail-cars-card__price">Rp. {car.price.toLocaleString("id-ID")} IDR</p>
                            <div className="dealerprofile-detail-cars-card__button">
                                <Button variant="secondary" onClick={() => navigate(`/dealer/cars/${car.id}`)}>Specification</Button>
                                <Button variant="danger" onClick={(e) => handleDelete(e ,car.id)}>Delete</Button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="dealerprofile-detail-add-car-card" onClick={handleClick}>
                    <div className="dealerprofile-detail-add-car-card-icon">
                        +
                    </div>
                </div>
            </div>
        </div>
    )
}