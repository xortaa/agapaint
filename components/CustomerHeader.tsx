import React from "react";
import custHeadStyles from "@/styles/custHead.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";

function Header() {
  return (
    <>
      <div className={custHeadStyles.topHeader}>
        <Container>
          <Row>
            <Col className="pl-lg-5 pl-md-3 pl-sm-1">
              <h1 className={custHeadStyles.h1Top}>
                COMMITMENT
                <br />
                TO <span className="text-warning">QUALITY</span>
              </h1>
            </Col>
          </Row>

          <Row>
            <Col className="pl-lg-5 pl-md-3 pl-sm-1">
              <p className={custHeadStyles.p}>
                <span className={custHeadStyles.white}>Paint</span> &nbsp;&nbsp;|&nbsp;&nbsp;
                <span className={custHeadStyles.white}>Body Repair</span> &nbsp;&nbsp;|&nbsp;&nbsp;
                <span className={custHeadStyles.white}>Detailing</span>
              </p>
            </Col>
          </Row>

          <Row>
            <Col className="pl-lg-5 pl-md-3 pl-sm-1">
              {/* <Button className={custHeadStyles.bookBtn}>Book an Appointment</Button>  */}
              <ScrollLink to="offerSection" smooth={true} duration={100}>
                <Button className={custHeadStyles.learnBtn}>Learn More</Button>
              </ScrollLink>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Header;
