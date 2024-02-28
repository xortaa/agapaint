"use client";
import { Card, Image } from "react-bootstrap";
import { FaCar, FaTruck, FaBus, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
// Icons
import rbHatchback from "@/public/assets/img/rbHatchback.svg";
import rbSedan from "@/public/assets/img/rbSedan.svg";
import rbSUV from "@/public/assets/img/rbSUV.svg";
import rbVan from "@/public/assets/img/rbVan.svg";

function CarType() {
  const [selectedCard, setSelectedCard] = useState(null);

  const selectRadioCard = (cardNumber) => {
    setSelectedCard(cardNumber);
  };
  return (
    <div id="radio-cards-container">
      {/* Compact Car/Hatchback: Radio Card 1 */}
      <div
        className={`radio-card radio-card-1 ${selectedCard === "1" ? "selected" : ""}`}
        onClick={() => selectRadioCard("1")}
      >
        <div className="radio-card-check">
          <FaCheckCircle className="text-warning h4" />
        </div>
        <div className="text-center">
          <div className="radio-card-icon">
            <Image src={rbHatchback.src} />
          </div>
          <div className="radio-card-label">Compact Car/Hatchback</div>
        </div>
      </div>
      {/* Sedan: Radio Card 2 */}
      <div
        className={`radio-card radio-card-2 ${selectedCard === "2" ? "selected" : ""}`}
        onClick={() => selectRadioCard("2")}
      >
        <div className="radio-card-check">
          <FaCheckCircle className="text-warning h4" />
        </div>
        <div className="text-center">
          <div className="radio-card-icon">
            <Image src={rbSedan.src} />
          </div>
          <div className="radio-card-label">Sedan</div>
        </div>
      </div>
      {/* SUV/AUV: Radio Card 3 */}
      <div
        className={`radio-card radio-card-3 ${selectedCard === "3" ? "selected" : ""}`}
        onClick={() => selectRadioCard("3")}
      >
        <div className="radio-card-check">
          <FaCheckCircle className="text-warning h4" />
        </div>
        <div className="text-center">
          <div className="radio-card-icon">
            <Image src={rbSUV.src} />
          </div>
          <div className="radio-card-label">SUV/AUV</div>
        </div>
      </div>
      {/* Van: Radio Card 4 */}
      <div
        className={`radio-card radio-card-3 ${selectedCard === "4" ? "selected" : ""}`}
        onClick={() => selectRadioCard("4")}
      >
        <div className="radio-card-check">
          <FaCheckCircle className="text-warning h4" />
        </div>
        <div className="text-center">
          <div className="radio-card-icon">
            <Image src={rbVan.src} />
          </div>
          <div className="radio-card-label">Van</div>
        </div>
      </div>
    </div>
  );
}

export default CarType;
