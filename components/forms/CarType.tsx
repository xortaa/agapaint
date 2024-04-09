"use client";
import { Card, Image } from "react-bootstrap";
import { FaCar, FaTruck, FaBus, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
// Icons
import rbHatchback from "@/public/assets/img/rbHatchback.svg";
import rbSedan from "@/public/assets/img/rbSedan.svg";
import rbSUV from "@/public/assets/img/rbSUV.svg";
import rbVan from "@/public/assets/img/rbVan.svg";
import rbMotor from "@/public/assets/img/rbMotor.svg";
import rbBike from "@/public/assets/img/rbBike.svg";
import { set } from "mongoose";
import { AppointmentData } from "@/types";

function CarType({
  setAppointmentData,
  setCarType,
}: {
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
  setCarType: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState("");

  const selectRadioCard = (cardNumber, carType) => {
    setSelectedCard(cardNumber);
    setCarType(cardNumber);
    setAppointmentData((prev) => ({ ...prev, carType }));
    setError("");
  };

  return (
    <div id="radio-cards-container">
      {error && <div className="text-danger">{error}</div>}
      {/* Compact Car/Hatchback: Radio Card 1 */}
      <div
        className={`radio-card radio-card-1 ${selectedCard === "1" ? "selected" : ""}`}
        onClick={() => {
          selectRadioCard("1", "Hatchback");

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
        className={`radio-card radio-card-4 ${selectedCard === "4" ? "selected" : ""}`}
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
      {/* Motor: Radio Card 5 */}
      <div
        className={`radio-card radio-card-5 ${selectedCard === "5" ? "selected" : ""}`}
        onClick={() => {
          selectRadioCard("5", "Motorcycle");
        }}
      >
        <div className="radio-card-check">
          <FaCheckCircle className="text-warning h4" />
        </div>
        <div className="text-center">
          <div className="radio-card-icon">
            <Image src={rbMotor.src} />
          </div>
          <div className="radio-card-label">Motorcycle</div>
        </div>
      </div>
      {/* Bike: Radio Card 6 */}
      <div
        className={`radio-card radio-card-6 ${selectedCard === "6" ? "selected" : ""}`}
        onClick={() => {
          selectRadioCard("6", "Bicycle");
        }}
      >
        <div className="radio-card-check">
          <FaCheckCircle className="text-warning h4" />
        </div>
        <div className="text-center">
          <div className="radio-card-icon">
            <Image src={rbBike.src} />
          </div>
          <div className="radio-card-label">Bicycle</div>
        </div>
      </div>
      {/* Others: Radio Card 7 */}
      <div
        className={`radio-card radio-card-6 full-width ${selectedCard === "7" ? "selected" : ""}`}
        onClick={() => {
          selectRadioCard("7", "Others");
        }}
      >
        <div className="radio-card-check">
          <FaCheckCircle className="text-warning h4" />
        </div>
        <div className="text-center">
          <div className="radio-card-label lh-sm">
            Others (Truck, Bus, etc.) <br />
            <span className="small fs-6 text-secondary fst-italic fw-light text-wrap">
              *Price may vary based on size
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarType;
