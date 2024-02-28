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

function Services() {
  return (
    <main>
      <Container>
        <Row className="mb-5">
          <ServiceCard title="Washover" price="32,000.00" category="Paint" />
          <ServiceCard title="Under Coating Rubber" price="3500.00" category="Paint" />
          <ServiceCard title="Rims/Mags Repaint" price="2,500.00" category="Paint" />
          <ServiceCard title="Single Panel Repair" price="4,500.00" category="Repair" />
          <ServiceCard title="Multiple Panel Repair" price="3,500.00" category="Repair" />
          <ServiceCard title="Exterior Detailing" price="2,500.00" category="Detailing" />
          <ServiceCard title="Exterior Detailing Black Colors" price="3,500.00" category="Detailing" />
          <ServiceCard title="Interior Detailing" price="2,500.00" category="Detailing" />
          <ServiceCard title="Glass Detailing" price="3,500.00" category="Detailing" />
          <ServiceCard title="Engine Detailing" price="2,500.00" category="Detailing" />
          <ServiceCard title="Headlight Pair Detailing" price="1,500.00" category="Detailing" />
        </Row>
      </Container>
    </main>
  );
}

export default Services;
