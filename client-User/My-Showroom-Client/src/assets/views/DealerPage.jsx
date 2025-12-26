import "../styling/DealerPage.scss"
import ModalPop from "../components/ModalPop";
import { useState , useEffect } from "react";
import Button from "react-bootstrap/Button";

export default function DealerPage(){
    const [modalShow, setModalShow] = useState(false);
    return(
        <div className="dealerprofile-container">
            <div className="dealerprofile-modal-button">
                <Button variant="outline-primary" onClick={() => setModalShow(true)}>
                    Create Dealer Profile
                </Button>
                <ModalPop show={modalShow} onHide={() => setModalShow(false)} />
            </div>
            <div className="dealerprofile-detail-container">
                <div className="dealerprofile-detail-name">
                
                </div>
                <div className="dealerprofile-detail-image">
                    <img src=""/>
                </div>
                <div className="dealerprofile-detail-credentials">
                    <div className="dealerprofile-detail-address">
                
                    </div>
                    <div className="dealerprofile-detail-instagram-link">
                
                    </div>
                    <div className="dealerprofile-detail-whatsapp-link">
                
                    </div>
                    <div className="dealerprofile-detail-whatsapp-brand">
                
                    </div>
                </div>
            </div>
            <div className="dealerprofile-detail-cars-container">
                
            </div>
        </div>
    )
}