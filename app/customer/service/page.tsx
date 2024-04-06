"use client";

import { Container, Row, Col, Card, Nav, Tab } from "react-bootstrap";
import Navbar from "@/components/CustomerNav";
import Navbar2 from "@/components/CustomerNav2";
import Footer from "@/components/CustomerFooter";
import serviceStyles from "@/styles/custService.module.scss";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Service } from "@/types";
import axios from "axios";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function custServices() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCarType, setSelectedCarType] = useState("Hatchback");

  const checkSignInStatus = async () => {
    const session = await getSession();
    return session ? true : false;
  };

  useEffect(() => {
    checkSignInStatus().then((isSignedIn) => setIsSignedIn(isSignedIn));
  }, []);

  // Fetch
  useEffect(() => {
    axios.get("/api/service").then((res) => {
      setServices(res.data);
    });
  }, []);

  // Filter services by car type
  const filteredServices = services.filter(
    (service) => selectedCarType === "" || service.carType.includes(selectedCarType)
  );

  return (
    <>
      {isSignedIn ? <Navbar2 /> : <Navbar />}

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
        <Container style={{ paddingBottom: "50px" }}>
          <h3 className={serviceStyles.headerDesc}>We offer a wide range of services to cater to your vehicle type:</h3>

          {/* vehicle tabs */}
          <Row className="pt-5 justify-content-center">
            <Tab.Container id="left-tabs-example" defaultActiveKey="hatchback">
              <Row>
                <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="hatchback"
                        onClick={() => setSelectedCarType("Hatchback")}
                        className={selectedCarType === "Hatchback" ? "bg-warning text-dark" : "text-dark"} style={{fontWeight: "500", fontSize: "1.1em"}}
                      >
                        <img src="/assets/img/rbHatchback.svg" height="25" width="25" /> &nbsp; Hatchback
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="sedan"
                        onClick={() => setSelectedCarType("Sedan")}
                        className={selectedCarType === "Sedan" ? "bg-warning text-dark" : "text-dark"} style={{fontWeight: "500", fontSize: "1.1em"}}
                      >
                        <img src="/assets/img/rbSedan.svg" height="25" width="25" /> &nbsp; Sedan
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="suv/auv"
                        onClick={() => setSelectedCarType("SUV")}
                        className={selectedCarType === "SUV" ? "bg-warning text-dark" : "text-dark"} style={{fontWeight: "500", fontSize: "1.1em"}}
                      >
                        <img src="/assets/img/rbSUV.svg" height="25" width="25" /> &nbsp; SUV/AUV
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="van"
                        onClick={() => setSelectedCarType("Van")}
                        className={selectedCarType === "Van" ? "bg-warning text-dark" : "text-dark"} style={{fontWeight: "500", fontSize: "1.1em"}}
                      >
                        <img src="/assets/img/rbVan.svg" height="25" width="25" /> &nbsp; Van
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="motorcycle"
                        onClick={() => setSelectedCarType("Motorcycle")}
                        className={selectedCarType === "Motorcycle" ? "bg-warning text-dark" : "text-dark"} style={{fontWeight: "500", fontSize: "1.1em"}}
                      >
                        <img src="/assets/img/rbMotor.svg" height="25" width="25" /> &nbsp; Motorcycle
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="bicycle"
                        onClick={() => setSelectedCarType("Bicycle")}
                        className={selectedCarType === "Bicycle" ? "bg-warning text-dark" : "text-dark"} style={{fontWeight: "500", fontSize: "1.1em"}}
                      >
                        <img src="/assets/img/rbBike.svg" height="25" width="25" /> &nbsp; Bicycle
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="others"
                        onClick={() => setSelectedCarType("Others")}
                        className={selectedCarType === "Others" ? "bg-warning text-dark" : "text-dark"} style={{fontWeight: "500", fontSize: "1.1em"}}
                      >
                        <HiOutlineDotsHorizontal size={25} /> &nbsp; Others
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>

                {/* tab content */}
                <Col xl={10} lg={10} md={10} sm={12} xs={12}>
                  <Tab.Content>
                    {["hatchback", "sedan", "suv/auv", "van", "motorcycle", "bicycle", "others"].map((carType) => (
                      <Tab.Pane eventKey={carType}>
                        <Row>
                          {filteredServices
                            .filter((service) => service.carType.toLowerCase() === carType)
                            .map((service) => (
                              <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                <Card className={serviceStyles.card}>
                                  <Card.Img src={service.image} alt="Card image" className={serviceStyles.cardImg1} />
                                  <Card.ImgOverlay>
                                    <Card.Title className={serviceStyles.cardTitle1}>{service.name}</Card.Title>
                                    <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                                    <Card.Text className={serviceStyles.cardPrice1}>₱{service.price}</Card.Text>
                                    <Card.Text className={serviceStyles.cardDescription1}>
                                      {service.description}
                                    </Card.Text>
                                  </Card.ImgOverlay>
                                </Card>
                              </Col>
                            ))}
                        </Row>
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default custServices;
