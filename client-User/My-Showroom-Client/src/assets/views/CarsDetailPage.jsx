import "../styling/CarsDetailPage.scss"
import Button from "react-bootstrap/Button";
import { useNavigate , useParams } from "react-router-dom";
import { useState , useEffect , useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchCarId , fetchFeatureCategory , fetchSpecificationCategory } from "../store/action/actionCreator";
import accelerationLogo from "../images/logo-acceleration.png";
import drivetrainLogo from "../images/logo-drivetrain.png";
import engineLogo from "../images/logo-engine.png";
import powerLogo from "../images/logo-power-output.png";
import priceLogo from "../images/logo-price.png";
import Car3DViewer from "../views/Car3DViewer";
import ARViewer from "../views/ARViewer";
import IOSARViewer  from "../views/IOSARViewer";

function CarsDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const overviewRef = useRef(null);
  const specsRef = useRef(null);
  const featureRef = useRef(null);
  const contactRef = useRef(null);
  const galleryRef = useRef(null);
  const arRef = useRef(null);
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [show3D, setShow3D] = useState(false);
  const [openSpecCategory, setOpenSpecCategory] = useState(null);

  const carData = useSelector(
    (state) => state.carReducer.carsId
  );

  const featureCategoryData = useSelector(
    (state) => state.featureCategoryReducer.featureCategories
  );
  
  const specificationCategoryData = useSelector(
    (state) => state.specificationCategoryReducer.specificationCategories
  );

  const overviewSpecifications = carData?.Specifications?.filter(
    spec => spec.SpecificationCategory?.name === "Overview"
  );

  const toggleSpecCategory = (categoryId) => {
    setOpenSpecCategory(prev =>
      prev === categoryId ? null : categoryId
    );
  };

  const groupedSpecifications = specificationCategoryData.map(category => ({
    ...category,
    specs: carData?.Specifications?.filter(
      spec => spec.specificationCategory_id === category.id
    )
  }));

  console.log(carData , "carData");

  const specificationLogoMap = {
    Acceleration: accelerationLogo,
    'Drive System': drivetrainLogo,
    'Engine Name': engineLogo,
    'Power Output': powerLogo,
    Price: priceLogo
  };

  const getSpecificationLogo = (key) => {
    return specificationLogoMap[key] || "no-svg";
  };

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    dealer: "",
    agreed: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setContactForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleBookNow = () => {
    const whatsappLink = carData?.DealerProfile?.whatsapplink;

    if (!whatsappLink) {
      alert("Dealer WhatsApp not available");
      return;
    }

    if (!contactForm.agreed) {
      alert("Please agree to the terms");
      return;
    }

    const message = `
    Hello, I am interested in this car.

    Car: ${carData.Brand?.name} ${carData.model}
    Name: ${contactForm.name}
    Email: ${contactForm.email}
    Phone: ${contactForm.phone}
    Dealer: ${contactForm.dealer}
    `;

    const encodedMessage = encodeURIComponent(message);

    window.open(`${whatsappLink}?text=${encodedMessage}`, "_blank");
  };
  
  useEffect(() => {
    dispatch(fetchCarId(id))
    dispatch(fetchFeatureCategory())
    dispatch(fetchSpecificationCategory())
  }, [dispatch]);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const groupedOverviewFields = overviewSpecifications
  ?.flatMap(spec => spec.SpecificationFields || [])
  .reduce((acc, field) => {
    if (!acc[field.key]) {
      acc[field.key] = [];
    }
    acc[field.key].push(field);
    return acc;
  }, {});

  return (
    <div className="car-detail-component">
      <div className="car-detail-component_container">
        <div className="car-detail-component_content">
          <div className="car-detail-component_content-image">
            <img src={carData.thumbnail}/>
          </div>

          <div className="car-detail-component_content-navbar">
            <div className="car-detail-component_content-navbar-title">
              <h3>{carData.Brand?.name} {carData.model}</h3>
            </div>
            <button onClick={() => scrollToSection(overviewRef)}>Overview</button>
            <button onClick={() => scrollToSection(featureRef)}>Feature</button>
            <button onClick={() => scrollToSection(specsRef)}>Specification</button>
            <button onClick={() => scrollToSection(contactRef)}>Contact Us</button>
            <button onClick={() => scrollToSection(arRef)}>3D / AR</button>
          </div>
          
          <div className="car-detail-component_content-overview-wrapper" ref={overviewRef}>
            <div className="car-detail-component_content-overview-title">
                <h3>Overview</h3>
            </div>
            <div className="car-detail-component_content-overview">
              {groupedOverviewFields && Object.keys(groupedOverviewFields).length ? (
                Object.entries(groupedOverviewFields).map(([key, fields]) => (
                  <div
                    key={key}
                    className="car-detail-component_content-overview-spec"
                  >
                    <div className="car-detail-component_content-overview-spec-logo">
                      <img src={getSpecificationLogo(key)} alt={key} />
                    </div>

                    <div className="car-detail-component_content-overview-spec-name">
                      <p>
                        {fields
                          .map(f =>
                            f.unit !== "N/A" ? `${f.value} ${f.unit}` : f.value
                          )
                          .join(" / ")}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted text-center">No specification added</p>
              )}
            </div>
          </div>

          <div className="car-detail-component_content-feature" ref={featureRef}>
            {featureCategoryData.map(category => {
              const features = carData?.Features?.filter(
                f => f.featureCategory_id === category.id
              );

              return (
                <div className="car-detail-component_content-feature-wrapper">
                  <div className="car-detail-component_content-feature-title-main">
                      <h3>{category.name}</h3>
                  </div>
                  <div className="car-detail-component_content-feature-grid">
                    {features?.map((feature,index) => (
                      <div className={`car-detail-component_content-feature-container
                        ${index === 0 ? "feature-main" : "feature-secondary"}
                      `}>
                        <div className="car-detail-component_content-feature-image">
                          <img src={feature.thumbnail}/>
                        </div>
                        <div className="car-detail-component_content-feature-description">
                            <p>{feature.name}</p>
                        </div>
                        <div className="car-detail-component_content-feature-title">
                            <p>{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="car-detail-component_content-specs" ref={specsRef}>
            <div className="car-detail-component_content-specs-title">
                <h3>Specifications</h3>
            </div>
            {groupedSpecifications?.map(category => {
              const isOpen = openSpecCategory === category.id;

              return (
                <div
                  key={category.id}
                  className="car-detail-component_specs-item"
                >
                  {/* HEADER */}
                  <div
                    className="car-detail-component_specs-header"
                    onClick={() => toggleSpecCategory(category.id)}
                  >
                    <h4>{category.name}</h4>
                    <span className="spec-toggle-icon">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>

                  {/* CONTENT */}
                  {isOpen && (
                    <div className="car-detail-component_specs-content">
                      {category.specs?.map(spec =>
                        spec.SpecificationFields?.map(field => (
                          <div
                            key={field.id}
                            className="car-detail-component_specs-row"
                          >
                            <p className="spec-label">{field.key}</p>
                            <p className="spec-value">
                              {field.value}
                              {field.unit !== "N/A" && ` ${field.unit}`}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="car-detail-component-contact-us" ref={contactRef}>
            <div className="car-detail-component-contact-us-container">
              <div className="car-detail-component-contact-us-title">

              </div>
              <div className="car-detail-component-contact-us-form">
                <div className="car-detail-component-contact-us-form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="car-detail-component-contact-us-form-row">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    value={carData?.DealerProfile?.shopName || "Dealer"}
                    readOnly
                  />
                </div>

                <div className="car-detail-component-contact-us-form-terms">
                  <label>
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={contactForm.agreed}
                      onChange={handleInputChange}
                    />
                    I agree to the terms & conditions
                  </label>
                </div>

                <div className="car-detail-component-contact-us-form-action">
                  <button onClick={handleBookNow}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

         <button
              className="car-detail-component_3d-button"
              onClick={() => setShow3D(true)}
            >
              Show 3D View
         </button> 

         {/* 3D Viewer Modal */}
        {show3D && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={() => setShow3D(false)} // close when clicking outside
          >
            <div
              style={{
                position: "relative",
                width: "90%",
                maxWidth: "700px",
                height: "80%",
                background: "#fff",
              }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <button
                onClick={() => setShow3D(false)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 10,
                }}
              >
                Close
              </button>

              {/* 3D Viewer Canvas */}
              {isMobile ? (
                  <ARViewer />
              ) : (
                <Car3DViewer />
              )}
              
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default CarsDetailPage;
