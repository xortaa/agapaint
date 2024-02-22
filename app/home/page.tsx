"use client";

import React from "react";
import custhomeStyles from "@/styles/home.module.scss";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import Link from "next/link";
import { RiServiceFill } from "react-icons/ri";
import { MdGppGood } from "react-icons/md";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FaFlagCheckered, FaShoppingBasket } from "react-icons/fa";

import icon from "@/public/assets/img/icon.png";
import about1 from "@/public/assets/img/about1.png";
import about2 from "@/public/assets/img/about2.png";
import about3 from "@/public/assets/img/about3.png";
import Header from "@/components/CustomerHeader";
import Footer from "@/components/CustomerFooter";
import Navbar from "@/components/CustomerNav";
import Header2 from "@/components/Header";

function CustHome() {
  return (
    <>
      <Navbar />
      <Header />

      <div className={custhomeStyles.home}>
        {/* SQUARES - service, appointment, faq*/}
        <Container>
          <Row>
            <Col lg={12} className="text-center align-items-center mb-3">
              <h1 className={custhomeStyles.offer}>WHAT WE OFFER</h1>
              <hr className={custhomeStyles.hrCustom}></hr>
            </Col>
          </Row>

          <Row>
            {/* View our services */}
            <Col lg={4} md={4} s={12} xs={12} className={custhomeStyles.squares}>
              <Card className="bg-dark text-white rounded-card d-flex flex-column aspect-1x1">
                <Card.Img src="../assets/img/fraqbg.png" alt="Card image" />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                  <Card.Text className={`mb-0 ${custhomeStyles.cardText}`}>Paint</Card.Text>
                  <Card.Title className={`mt-0 ${custhomeStyles.cardTitle}`}>Services</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>

            {/* Book an appointment */}
            <Col lg={4} md={4} s={12} xs={12} className={custhomeStyles.squares}>
              <Card className="bg-dark text-white rounded-card d-flex flex-column aspect-1x1">
                <Card.Img src="../assets/img//appointmentbg.png" alt="Card image" />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                  <Card.Text className={`mb-0 ${custhomeStyles.cardText}`}>Body</Card.Text>
                  <Card.Title className={`mt-0 ${custhomeStyles.cardTitle}`}>Repair</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>

            {/* Read the faq */}
            <Col lg={4} md={4} s={12} xs={12} className={custhomeStyles.squares}>
              <Card className="bg-dark text-white rounded-card d-flex flex-column aspect-1x1">
                <Card.Img src="../assets/img//servicesbg.png" alt="Card image" />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                  <Card.Text className={`mb-0 ${custhomeStyles.cardText}`}>Detailing</Card.Text>
                  <Card.Title className={`mt-0 ${custhomeStyles.cardTitle}`}>Services</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="p-5 text-center mb-3">
          <h1 className="fw-bold display-6 mb-5">WHY AGAPAINT?</h1>
          <Col className="text-center">
            <RiServiceFill className="display-1 text-warning mb-3" />
            <h5 className="fw-bold">Quality Service</h5>
            <p className="mb-0">Experience top-tier automotive care</p>
          </Col>
          <Col className="text-center">
            <MdGppGood className="display-1 text-warning mb-3" />
            <h5 className="fw-bold">Convenience</h5>
            <p className="mb-0">Enjoy hassle-free solutions on the go</p>
          </Col>
          <Col className="text-center">
            <FaPeopleCarryBox className="display-1 text-warning mb-3" />
            <h5 className="fw-bold">Personalized Service</h5>
            <p className="mb-0">Tailored options for your unique needs</p>
          </Col>
          <Col className="text-center">
            <FaFlagCheckered className="display-1 text-warning mb-3" />
            <h5 className="fw-bold">Unmatched Finish</h5>
            <p className="mb-0">Transforming your vehicle with precision</p>
          </Col>
          <Col className="text-center">
            <FaShoppingBasket className="display-1 text-warning mb-3" />
            <h5 className="fw-bold">Versatile Choices</h5>
            <p className="mb-0">Explore a variety of services tailored to you</p>
          </Col>
        </Row>
      </Container>

      {/* ABOUT US */}
      <section className="bg-white">
        <aside className="text-center bg-warning p-5">
          <Container>
            <Row className="justify-content-center">
              <Col xl={8}>
                <h6 className="fs-2 text-white mb-3">
                  Reviving Classics, Restoring Dreams: <br />
                  Learn About Our Automotive Restoration Journey
                </h6>
                <Image src={icon.src} alt="..." style={{ height: "3rem", filter: "brightness(5) invert(1)" }} />
              </Col>
            </Row>
          </Container>
        </aside>

        <Container fluid>
          <Row>
            <Col
              lg={6}
              className="order-lg-2 text-white"
              style={{
                backgroundImage: `url(${about1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Col>
            <Col lg={6} className="order-lg-1 my-auto p-6">
              <h2>The Beginning</h2>
              <p className="lead mb-0">
                AGAPAINT, established in 2020, is a shop that specializes in Automotive Detailing, Ceramic & Graphene
                Coating, and Body Repair and Repaint Services using the highest quality products, tools, and materials
              </p>
            </Col>
          </Row>
          <Row>
            <Col
              lg={6}
              className="text-white"
              style={{
                backgroundImage: `url(${about2.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Col>
            <Col lg={6} className="my-auto p-6">
              <h2>Mission and Values</h2>
              <p className="lead mb-0">
                AGAPAINT offers comprehensive automotive services with various packages for all vehicle types. Whether
                you require interior work or a basic detail, we specialize in enhancing painting, detailing, and ceramic
                coating services.
              </p>
            </Col>
          </Row>
          <Row>
            <Col
              lg={6}
              className="order-lg-2 text-white"
              style={{
                backgroundImage: `url(${about3.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Col>
            <Col lg={6} className="order-lg-1 my-auto p-6">
              <h2>Team Commitment</h2>
              <p className="lead mb-0">
                At AGAPAINT, we are more than just a team – we are a family united by our love for cars and our
                dedication to exceeding customer expectations. When you trust us with your vehicle, you can rest assured
                that you are in the hands of skilled professionals who care deeply about delivering outstanding results.
              </p>
            </Col>

            {/* Map Embed */}
          </Row>
          <Row>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.3388184008886!2d121.0353128748887!3d14.749931485754274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b0386a31d5d1%3A0xc75f36c9f7afed54!2sCamarin%20Rd%2C%20173%2C%20Caloocan%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1708529662079!5m2!1sen!2sph"
              width="800"
              height="400"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Row>
        </Container>
      </section>

      <Container className="p-5 mt-4 mb-4">
        {/* Call to Action */}
        <aside className="bg-warning rounded-3 p-sm-5">
          <Container className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
            <div className="mb-4 mb-xl-0">
              <div className="fs-3 fw-bold text-white">Experience Precision Performance Today!</div>
              <div className="text-white">Book an appointment for quality automotive care.</div>
            </div>
            <div className="ms-xl-4">
              <Link href="/customer/signup">
                <Button variant="dark" size="lg">
                  Book an Appointment
                </Button>
              </Link>
            </div>
          </Container>
        </aside>
      </Container>

      <Footer />
    </>
  );
}

export default CustHome;