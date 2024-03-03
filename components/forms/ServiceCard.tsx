import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import serviceStyles from "@/styles/services.module.scss";

function ServiceCard(props) {
  return (
    <Col sm={12} lg={6} xl={4} className="p-3">
      <label className="d-block">
        <input type="checkbox" className="d-none" value={1} />
        <Card className={`${serviceStyles.outlined} ${serviceStyles.horizontal} shadow`} >
          <Card.Body>
            <Row className="g-3">
              <Col xs={4} sm={3} lg={5} xl={12}>
                <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/72"
                    className="img-fluid rounded"
                    alt="..."
                />
              </Col>
              <Col xs={8} sm={9} lg={7} xl={12} className="lh-05">
                <Card.Title className="fw-semibold fs-6">{props.title}</Card.Title>
                <p className="text-secondary mb-2">
                  <small>₱{props.price}</small>
                </p>
                <small>
                  <Badge pill bg="warning" className="text-dark">
                    {props.category}
                  </Badge>
                </small>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </label>
    </Col>
  );
}

export default ServiceCard;
