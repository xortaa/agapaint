"use client";
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
// Icons
import rbHatchback from "@/public/assets/img/rbHatchback.svg";
import rbSedan from "@/public/assets/img/rbSedan.svg";
import rbSUV from "@/public/assets/img/rbSUV.svg";
import rbVan from "@/public/assets/img/rbVan.svg";
// SCSS
import serviceStyles from "@/styles/services.module.scss";
// Components
import ServiceCard from "@/components/forms/ServiceCard";
import { useState, useEffect } from "react";
import { ServiceData, AppointmentData } from "@/types";
import axios from "axios";
import { set } from "mongoose";

function Services({
  setSelectedService,
  setAppointmentData,
  appointmentData,
  setValidateService,
}: {
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceData[]>>;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
  appointmentData: AppointmentData;
  setValidateService: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("/api/service")
      .then((res) => {
        let filteredServices;
        if (appointmentData.carType === "Others") {
          filteredServices = res.data;
        } else {
          filteredServices = res.data.filter((service: ServiceData) => service.carType === appointmentData.carType);
        }
        setServices(filteredServices);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [appointmentData.carType]);

  const handleServiceClick = (service: ServiceData) => {
    setSelectedService((prevServices) => [...prevServices, service]);

    setAppointmentData((prevData) => ({
      ...prevData,
      servicesId: [...prevData.servicesId, service._id], // Add the service id to the servicesId array
    }));
    setValidateService(String(service._id));
  };

  return (
    <main>
      <Container>
        <Row className="mb-5">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              image={service.image}
              title={service.name}
              price={service.price}
              handleServiceClick={() => handleServiceClick(service)}
            />
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default Services;
