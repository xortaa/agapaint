"use client";

import React from "react";
import custhomeStyles from "@/styles/home.module.scss";
import { Container, Row, Col, Card } from "react-bootstrap";
import Image from "next/image";
import about1 from "@/public/assets/img/about1.png";
import about2 from "@/public/assets/img/about2.png";
import Header from "@/components/CustomerHeader";
import Footer from "@/components/CustomerFooter";
import Navbar from "@/components/CustomerNav";

function CustHome() {
  return (
    <>
      <Navbar />
      <Header />

      <div className={custhomeStyles.home}>
        {/* SQUARES - service, appointment, faq*/}
        <Container>
          <Row>
            {/* View our services */}
            <Col lg={4} className={`mb-4 mb-lg-0 ${custhomeStyles.squares}`}>
              <Card className="bg-dark text-white rounded-card">
                <Card.Img src="../assets/img/servicesbg.png" alt="Card image" />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                  <Card.Text className={`mb-0 ${custhomeStyles.cardText}`}>
                    View our
                  </Card.Text>
                  <Card.Title className={`mt-0 ${custhomeStyles.cardTitle}`}>
                    SERVICES
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>

            {/* Book an appointment */}
            <Col lg={4} className={`mb-4 mb-lg-0 ${custhomeStyles.squares}`}>
              <Card className="bg-dark text-white d-flex flex-column">
                <Card.Img src="../assets/img//appointmentbg.png" alt="Card image" />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                  <Card.Text className={`mb-0 ${custhomeStyles.cardText}`}>
                    Book an
                  </Card.Text>
                  <Card.Title className={`mt-0 ${custhomeStyles.cardTitle}`}>
                    APPOINTMENT
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>

            {/* Read the FAQ */}
            <Col lg={4} className={`mb-4 mb-lg-0 ${custhomeStyles.squares}`}>
              <Card className="bg-dark text-white">
                <Card.Img src="../assets/img//faqbg.png" alt="Card image" />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                  <Card.Text className={`mb-0 ${custhomeStyles.cardText}`}>
                    Read the
                  </Card.Text>
                  <Card.Title className={`mt-0 ${custhomeStyles.cardTitle}`}>
                    FAQ
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ABOUT US */}
        <div className={custhomeStyles.home}>
          <div className={custhomeStyles.card}>
            <Container>
              <Row className="mb-3">
                <Col lg={12} className="text-center align-items-center ">
                  <h1 className={custhomeStyles.h1abt}>About Agapaint</h1>
                </Col>
              </Row>

              {/* first row */}
              <Row className="mb-3">
                <Col lg={6} className="order-md-1 mb-3">
                  <Image
                    src={about1}
                    alt="about1"
                    className={custhomeStyles.img}
                  />
                </Col>

                <Col lg={6} className="order-md-2 order-lg-2 order-sm-2 order-xs-2 mb-3">
                  <p className={custhomeStyles.leftP}>
                    AGAPAINT, established in 2020, is a shop that specialized in
                    Automotive Detailing, Ceramic & Graphene Coating, and Body
                    Repair and Repaint Services using the highest quality
                    products, tools, and materials.
                    <br /><br />

                    AGAPAINT, earned a solid reputation for excellence and
                    reliable workmanship began as a small one-service shop and
                    has now grown to become one of the most trusted names.
                  </p>
                </Col>
              </Row>

              {/* second row */}
              <Row className="mb-5">
                <Col lg={6} className="order-md-2 order-lg-1">
                  <p className={custhomeStyles.rightP}>
                    AGAPAINT provides an automotive service with multiple
                    packages for a variety of vehicles. Whether you only need
                    your interior done or only a basic detail, focused on
                    developing and improving painting, detailing, and ceramic
                    coating services, whether you only need your interior done
                    or only a basic detail, focused on developing and improving
                    painting, detailing, and ceramic coating services.
                    
                  </p>
                </Col>

                <Col lg={6} className="order-md-1 order-lg-2 order-sm-1 order-xs-1">
                  <Image
                    src={about2}
                    alt="about1"
                    className={custhomeStyles.img}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CustHome;
