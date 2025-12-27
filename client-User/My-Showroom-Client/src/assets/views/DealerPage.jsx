import "../styling/DealerPage.scss"
import ModalPop from "../components/ModalPop";
import EditModal from "../components/EditModal";
import { useState , useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useSelector,useDispatch } from "react-redux";

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
    console.log(dealerProfileCars, "dealerProfileCars");
    
    let hasDealerProfile = false;

    if (Array.isArray(dealerProfile) && dealerProfile.length > 0) {
        hasDealerProfile = true;
    }

    useEffect(() => {
        
        const token = localStorage.getItem("access_token");
        if (!token) return;
        try {
            const decoded = jwtDecode(token);
            dispatch(fetchDealerUserProfile(decoded.id));
            dispatch(fetchDealerIdCars(decoded.id))
        } catch (err) {
            console.error("Invalid token");
        }
    }, []);
    const profile = dealerProfile?.[0];

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
           <div className="dealerprofile-detail-container">
            {profile  && (
                <>
                <div className="dealerprofile-detail-name">
                    <h2>{profile.shopName}</h2>
                </div>

                <div className="dealerprofile-detail-image">
                    <img src={profile.type || ""} alt={profile.shopName} />
                </div>

                <div className="dealerprofile-detail-credentials">
                    <div className="dealerprofile-detail-address">
                        <p>Address:</p> {profile.address}
                    </div>

                    <div className="dealerprofile-detail-instagram-link">
                        <p>Instagram:</p>{" "}
                        <a href={profile.instagramLink} target="_blank" rel="noreferrer">
                            {profile.instagramLink}
                        </a>
                    </div>

                    <div className="dealerprofile-detail-whatsapp-link">
                        <p>WhatsApp:</p>{" "}
                        <a href={profile.whatsAppLink} target="_blank" rel="noreferrer">
                            {profile.whatsAppLink}
                        </a>
                    </div>

                    <div className="dealerprofile-detail-whatsapp-brand">
                        <p>Brands:</p>
                        <ul>
                            {profile.Brands?.map((brand) => (
                            <li key={brand.id}>{brand.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                </>
            )}
            </div>

            </div>
            <div className="dealerprofile-detail-cars-container">
                {dealerProfileCars.map((car) => (
                    <div key={car.id} className="dealer-car-card">
                        <h4>{car.model}</h4>
                        <p>{car.brand_id}</p>
                        <p>{car.thumbnail}</p>
                        <p>{car.category_id}</p>
                        <p>{car.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}