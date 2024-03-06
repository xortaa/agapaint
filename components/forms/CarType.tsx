"use client";
import { Card, Image } from "react-bootstrap";
import { FaCar, FaTruck, FaBus, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
// Icons
import rbHatchback from "@/public/assets/img/rbHatchback.svg";
import rbSedan from "@/public/assets/img/rbSedan.svg";
import rbSUV from "@/public/assets/img/rbSUV.svg";
import rbVan from "@/public/assets/img/rbVan.svg";
import { set } from "mongoose";
import { AppointmentData } from "@/types";

function CarType({
  setAppointmentData,
}: {
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
}) {
  const [selectedCard, setSelectedCard] = useState(null);

  const selectRadioCard = (cardNumber, carType) => {
    setSelectedCard(cardNumber);
    setAppointmentData((prev) => ({ ...prev, carType }));
  };

  return (
    <div id="radio-cards-container">
      {/* Compact Car/Hatchback: Radio Card 1 */}
      <div
        className={`radio-card radio-card-1 ${selectedCard === "1" ? "selected" : ""}`}
        onClick={() => {
          selectRadioCard("1", "Compact Car/Hatchback");

          // setCarType("Compact Car/Hatchback");
        }}
      >
        <div className="radio-card-check">
          <FaCheckCircle className="text-warning h4" />
        </div>
        <div className="text-center">
          <div className="radio-card-icon">
            <Image src={rbHatchback.src} />
          </div>
          <div className="radio-card-label">Hatchback</div>
        </div>
      </div>
      {/* Sedan: Radio Card 2 */}
      <div
        className={`radio-card radio-card-2 ${selectedCard === "2" ? "selected" : ""}`}
        onClick={() => {
          selectRadioCard("2", "Sedan");
        }}
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
        onClick={() => {
          selectRadioCard("3", "SUV/AUV");
        }}
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
        onClick={() => {
          selectRadioCard("4", "Van");
        }}
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
