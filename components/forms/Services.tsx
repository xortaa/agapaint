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
}: {
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceData[]>>;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
  appointmentData: AppointmentData;
}) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("/api/service")
      .then((res) => {
        let filteredServices;
        filteredServices = res.data.filter((service: ServiceData) => service.carType.includes(appointmentData.carType));
        setServices(filteredServices);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [appointmentData.carType]);

  const handleServiceClick = (service: ServiceData) => {
    setSelectedService((prevServices) => {
      const isServiceSelected = prevServices.some((prevService) => prevService._id === service._id);

      if (isServiceSelected) {
        // If the service is already selected, deselect it by removing it from the array
        return prevServices.filter((prevService) => prevService._id !== service._id);
      } else {
        // If the service is not selected, select it by adding it to the array
        return [...prevServices, service];
      }
    });

    setAppointmentData((prevData) => {
      const newServicesId = [...prevData.servicesId, service._id]; // Add the service id to the servicesId array
      return {
        ...prevData,
        servicesId: newServicesId,
      };
    });
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
              price={service.price && service.price.toFixed(2)}
              handleServiceClick={() => handleServiceClick(service)}
            />
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default Services;
