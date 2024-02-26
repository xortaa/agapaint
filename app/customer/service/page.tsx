"use client";

import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "@/components/CustomerNav";
import Footer from "@/components/CustomerFooter";
import serviceStyles from "@/styles/custService.module.scss";

function custServices() {

  return (
    <>
      <Navbar />

      <div
        className={serviceStyles.headerBg}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 100)), url(/assets/img/custServiceBG.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <h1 className={serviceStyles.headerText}>Our Services</h1>
      </div>

      <div className={serviceStyles.body}>
        {/* Paint Services */}
        <Container style={{ paddingBottom: "50px" }}>
          <Row>
            <Col lg={12}>
              <h1 className={serviceStyles.serviceTitle}>Paint Services</h1>
            </Col>
          </Row>

          {/* note */}
          <Row>
            <Col lg={12}>
              <p className={serviceStyles.serviceNote}>
                <b style={{ color: '#f1b038' }}>We accept any type of vehicle: </b><br />
                Rims/Mags Repaint - Card, SUV, Van, Truck, Motorcycle, Bicycle
              </p>
            </Col>
          </Row>

          {/* cards for paint services*/}
          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>Washover</h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>Strip/Scrap to Metal</h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>
                  Under Coating <i>(Raptor, Rubberized)</i>
                </h2>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Body Repair */}
        <Container style={{ paddingBottom: "30px" }}>
          <Row>
            <Col lg={12}>
              <h1 className={serviceStyles.serviceTitle2}>Body Repair</h1>
            </Col>
          </Row>

          {/* cards for body repair*/}
          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>Panel Repair</h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>Fiber Repair</h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>
                  Metal Repair <i>(Latero)</i>
                </h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>Major & Minor Collision Repair</h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>
                  Change Oil <i>(Extra Service)</i>
                </h2>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Detailing Services */}
        <Container style={{ paddingBottom: "30px" }}>
          <Row>
            <Col lg={12}>
              <h1 className={serviceStyles.serviceTitle2}>Detailing Services</h1>
            </Col>
          </Row>
          {/* cards for body repair*/}
          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>Exterior Detailing</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>Interior Detailing</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>Glass Detailing</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>Engine Detailing</h2>
              </div>
            </Col>
          </Row>{" "}
          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>Headlight Detailing</h2>
              </div>
            </Col>
          </Row>{" "}
          <Row>
            <Col lg={12}>
              <div className={serviceStyles.card}>
                <h2 className={serviceStyles.cardContent}>
                  Coating <i>(Graphene)</i>
                </h2>
              </div>
            </Col>
          </Row>
          {/* note */}
          <Row>
            <Col lg={12}>
              <p className={serviceStyles.serviceNote} style={{ paddingTop: "40px" }}>
                Note: Can be done via <b>HOME SERVICE</b> as well
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default custServices;
