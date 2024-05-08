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
import NoRecordRow from "@/components/NoRecordRow";
import { table } from "console";
import PlaceholderCard from "@/components/PlaceholderCard";

function custServices() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCarType, setSelectedCarType] = useState("Hatchback");
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });
  }, []);

  // Filter services by car type
  const filteredServices = services.filter(
    (service) => selectedCarType === "" || service.carType.toString().includes(selectedCarType)
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
          <h4 className={serviceStyles.headerNote}>*Please note that <b style={{fontWeight: '600'}}>prices may vary </b>depending on service options and vehicle specifications</h4>

          {/* vehicle tabs */}
          <Row className="pt-5 justify-content-center">
            <Tab.Container id="left-tabs-example" defaultActiveKey="hatchback">
              <Row>
                <Col xl={2} lg={2} md={4} sm={12} xs={12}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="hatchback"
                        onClick={() => setSelectedCarType("Hatchback")}
                        className={selectedCarType === "Hatchback" ? "bg-warning text-dark" : "text-dark"}
                        style={{ fontWeight: "500", fontSize: "1.1em" }}
                      >
                        <img src="/assets/img/rbHatchback.svg" height="25" width="25" /> &nbsp; Hatchback
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="sedan"
                        onClick={() => setSelectedCarType("Sedan")}
                        className={selectedCarType === "Sedan" ? "bg-warning text-dark" : "text-dark"}
                        style={{ fontWeight: "500", fontSize: "1.1em" }}
                      >
                        <img src="/assets/img/rbSedan.svg" height="25" width="25" /> &nbsp; Sedan
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="suv/auv"
                        onClick={() => setSelectedCarType("SUV/AUV")}
                        className={selectedCarType === "SUV/AUV" ? "bg-warning text-dark" : "text-dark"}
                        style={{ fontWeight: "500", fontSize: "1.1em" }}
                      >
                        <img src="/assets/img/rbSUV.svg" height="25" width="25" /> &nbsp; SUV/AUV
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="van"
                        onClick={() => setSelectedCarType("Van")}
                        className={selectedCarType === "Van" ? "bg-warning text-dark" : "text-dark"}
                        style={{ fontWeight: "500", fontSize: "1.1em" }}
                      >
                        <img src="/assets/img/rbVan.svg" height="25" width="25" /> &nbsp; Van
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="motorcycle"
                        onClick={() => setSelectedCarType("Motorcycle")}
                        className={selectedCarType === "Motorcycle" ? "bg-warning text-dark" : "text-dark"}
                        style={{ fontWeight: "500", fontSize: "1.1em" }}
                      >
                        <img src="/assets/img/rbMotor.svg" height="25" width="25" /> &nbsp; Motorcycle
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="bicycle"
                        onClick={() => setSelectedCarType("Bicycle")}
                        className={selectedCarType === "Bicycle" ? "bg-warning text-dark" : "text-dark"}
                        style={{ fontWeight: "500", fontSize: "1.1em" }}
                      >
                        <img src="/assets/img/rbBike.svg" height="25" width="25" /> &nbsp; Bicycle
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="others"
                        onClick={() => setSelectedCarType("Others")}
                        className={selectedCarType === "Others" ? "bg-warning text-dark" : "text-dark"}
                        style={{ fontWeight: "500", fontSize: "1.1em" }}
                      >
                        <HiOutlineDotsHorizontal size={25} /> &nbsp; Others
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>

                {/* tab content */}
                <Col xl={10} lg={10} md={8} sm={12} xs={12}>
                  <Tab.Content>
                    {["hatchback", "sedan", "suv/auv", "van", "motorcycle", "bicycle", "others"].map((carType) => (
                      <Tab.Pane eventKey={carType}>
                        <Row>
                          {loading ? (
                            <>
                              <PlaceholderCard />
                              <PlaceholderCard />
                              <PlaceholderCard />
                            </>
                          ) : filteredServices.filter((service) => service.carType.toLowerCase().includes(carType)).length >
                            0 ? (
                            filteredServices
                              .filter((service) => service.carType.toLowerCase().includes(carType.toLowerCase()))
                              .map((service) => (
                                <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                                  <Card className={serviceStyles.cardTo} style={{ borderRadius: "15px" }}>
                                    <Card.Img
                                      src={service.image}
                                      alt="Card image"
                                      className={serviceStyles.cardImg1}
                                      style={{ borderRadius: "15px" }}
                                    />
                                    <Card.ImgOverlay
                                      style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
                                    >
                                      <p className={`${serviceStyles.cardTitle1} text-white fw-semibold mb-0`}>
                                        {service.name}
                                      </p>
                                      <p className={serviceStyles.cardDescription2}>starting at</p>
                                      <p className={serviceStyles.cardPrice1}>₱{typeof service.price === 'number' ? service.price.toFixed(2) : service.price}</p>
                                      <p className={`${serviceStyles.cardDescription1} mb-0`}>{service.description}</p>
                                    </Card.ImgOverlay>
                                  </Card>
                                </Col>
                              ))
                          ) : (
                            <table>
                              <tbody>
                                <tr>
                                  <NoRecordRow colSpan={12} message="No services available for this vehicle type." />
                                </tr>
                              </tbody>
                            </table>
                          )}
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
