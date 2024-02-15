import React from "react";
import headerStyles from "@/styles/head.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";

function Header() {
  return (
    <>
      <div className={headerStyles.header}>
        <Container>
          <Row>
            <Col className="pl-lg-5 pl-md-3 pl-sm-1">
              <h1 className={headerStyles.h1}>
                COMMITMENT
                <br />
                TO QUALITY
              </h1>
            </Col>
          </Row>

          <Row>
            <Col className="pl-lg-5 pl-md-3 pl-sm-1">
              <p className={headerStyles.p}>
                <span className={headerStyles.yellow}>Paint</span>{" "}
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span className={headerStyles.yellow}>Body Repair</span>{" "}
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span className={headerStyles.yellow}>Detailing</span>
              </p>
            </Col>
          </Row>

          <Row>
            <Col className="pl-lg-5 pl-md-3 pl-sm-1">
                <Button className={headerStyles.btnBook}>Book an Appointment</Button> 
                <Button className={headerStyles.btnLearn}>Learn More</Button> 
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Header;
