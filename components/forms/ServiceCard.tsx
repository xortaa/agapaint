import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import serviceStyles from "@/styles/services.module.scss";

function ServiceCard({
  image,
  title,
  price,
  handleServiceClick,
}: {
  image: string;
  title: string;
  price: number;
  handleServiceClick: () => void;
}) {
  return (
    <Col sm={12} lg={6} xl={4} className="p-3">
      <label className="d-block">
        <input type="checkbox" className="d-none" value={1} />
        <Card className={`${serviceStyles.outlined} ${serviceStyles.horizontal} shadow`} onClick={handleServiceClick}>
          <Card.Body>
            <Row className="g-3">
              <Col xs={12} sm={3} lg={5} xl={12}>
                <Card.Img variant="top" src={image} className="img-fluid rounded" alt="..." />
              </Col>
              <Col xs={12} sm={9} lg={7} xl={12} className="lh-05">
                <Card.Title className="fw-semibold fs-6">{title}</Card.Title>
                <p className="text-secondary mb-2">
                  <small>₱{price}</small>
                </p>
                {/* <small>
                  <Badge pill bg="warning" className="text-dark">
                    {category}
                  </Badge>
                </small> */}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </label>
    </Col>
  );
}

export default ServiceCard;