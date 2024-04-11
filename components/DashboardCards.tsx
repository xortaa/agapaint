import React from "react";
import { Card, Col, Row } from "react-bootstrap";

interface DashboardCardProps {
  cardTitle: string;
  count: string;
  logo: React.ReactNode;
}

function DashboardCards({ cardTitle, count, logo }: DashboardCardProps) {
  return (
    <Card className="text-start mb-2 py-3" style={{ backgroundColor: "#f4f7f9" }}>
      <Card.Body className="py-2 px-3">
        <Row>
          <Col sm={4} className="d-flex align-items-center justify-content-center">
            <div
              className="p-4"
              style={{
                backgroundColor: "#FFC94D",
                borderRadius: "50%",
              }}
            >
              {logo}
            </div>
          </Col>
          <Col className="text-start ps-4" sm={8}>
            <Row style={{ fontSize: "18px" }}>{cardTitle}</Row>
            <Row className="fw-bold" style={{ fontSize: "38px" }}>
              {count}
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default DashboardCards;
