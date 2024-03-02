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
import { Service, AppointmentData } from "@/types";
import axios from "axios";

function Services({ setSelectedService, setAppointmentData }: { setSelectedService: React.Dispatch<React.SetStateAction<Service[]>>; setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>; }) {  
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("/api/service")
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleServiceClick = (service: Service) => { 
    setSelectedService((prevServices) => [...prevServices, service]);

    setAppointmentData((prevData) => ({
      ...prevData,
      servicesId: [...prevData.servicesId, service._id], // Add the service id to the servicesId array
    }));
  }

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
