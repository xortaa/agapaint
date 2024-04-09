import React from "react";
import { Card, Col, Container } from "react-bootstrap";
import { CarFrontFill, FolderMinus, PersonFill } from "react-bootstrap-icons";
import Link from "@/components/Link";

//scss
import weekCardStyles from "@/styles/dashboardWeekCard.module.scss";

function DashboardWeekCards({ date, time, name, carInfo }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Col lg={4} md={6} sm={12}>
      <Container className="m-0 h-100" style={{ flex: "1 1 0" }}>
        <Link href="/admin/hub/appointment" className="text-decoration-none">
          <Card className={`m-1 h-100 ${weekCardStyles.card}`}>
            <Card.Body className="py-2 px-3">
              <p className="fs-5 fw-semibold mb-0">{formattedDate}</p>
              <p className="text-secondary fw-medium mb-0">{formattedTime}</p>
              <hr></hr>
              <p className="small mb-1">
                <PersonFill size={14} className="text-muted" /> {name}
              </p>
              <p className="small mb-1">
                <CarFrontFill size={14} className="text-muted" /> {carInfo}
              </p>
            </Card.Body>
          </Card>
        </Link>
      </Container>
    </Col>
  );
}

export default DashboardWeekCards;
