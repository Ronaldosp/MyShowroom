import { useState , useEffect } from "react";
import "../styling/Carousel.scss";

const images = [
  "https://cdna.artstation.com/p/assets/images/images/077/053/478/large/samir-djafarov-art.jpg?1718452606",
  "https://wallpapercat.com/w/full/b/e/3/5818136-1920x1080-desktop-hd-cool-car-background.jpg",
  "https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/topics/magazine-article-pool/2025/wallpaper/m-wallpaper/2025-30-csl/BMW_M_Wallpaper_3.0_CSL_driving_Desktop_16x9_4K.jpg.asset.1736439397218.jpg"
];


export default function Carousel() {
    const [index, setIndex] = useState(0);
  
    // Auto-slide every 4 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 10000);
      return () => clearInterval(interval);
    }, []);
  
    const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  
    return (
      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <div className="carousel-slide" key={i}>
              <img src={img} alt={`Slide ${i}`} />
            </div>
          ))}
        </div>
  
        {/* Buttons */}
        <button className="carousel-btn prev" onClick={prevImage}>
          
        </button>
        <button className="carousel-btn next" onClick={nextImage}>
          
        </button>
  
        {/* Dots */}
        <div className="carousel-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    );
  }