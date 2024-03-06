"use client";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
                <b style={{ color: "#f1b038" }}>We accept any type of vehicle: </b>
                <br />
                Rims/Mags Repaint - Card, SUV, Van, Truck, Motorcycle, Bicycle
              </p>
            </Col>
          </Row>

          {/* list of services */}
          <Row style={{ paddingTop: "20px" }} className="justify-content-center">
            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>
                    This is a short description na aabot hanggang 90 characters ata patingin nga wow abot hanggang 3rd
                    row aju nice nice
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Body Repair */}
        <Container style={{ paddingBottom: "30px", paddingTop: "30px" }}>
          <Row>
            <Col lg={12}>
              <h1 className={serviceStyles.serviceTitle2}>Body Repair</h1>
            </Col>
          </Row>

          {/* list of services */}
          <Row style={{ paddingTop: "20px" }} className="justify-content-center">
            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>
                    This is a short description na aabot hanggang 90 characters ata patingin nga wow abot hanggang 3rd
                    row aju nice nice
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Detailing Services */}
        <Container style={{ paddingBottom: "30px", paddingTop: "30px" }}>
          <Row>
            <Col lg={12}>
              <h1 className={serviceStyles.serviceTitle2}>Detailing Services</h1>
            </Col>
          </Row>

          {/* list of services */}
          <Row style={{ paddingTop: "20px" }} className="justify-content-center">
            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>This is a short description</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col lg={4} md={6} sm={12} xs={12} style={{ paddingTop: "20px" }}>
              <Card className={serviceStyles.card}>
                <Card.Img src="/assets/img/custServiceBG.jpg" alt="Card image" className={serviceStyles.cardImg1} />
                <Card.ImgOverlay>
                  <Card.Title className={serviceStyles.cardTitle1}>Service title</Card.Title>
                  <Card.Text className={serviceStyles.cardDescription2}>starting at</Card.Text>
                  <Card.Text className={serviceStyles.cardPrice1}>Php 10,000.00</Card.Text>
                  <Card.Text className={serviceStyles.cardDescription1}>
                    This is a short description na aabot hanggang 90 characters ata patingin nga wow abot hanggang 3rd
                    row aju nice nice
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
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
