"use client";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { useState } from "react";
// Images
import bookDesktop from "@/public/assets/img/bookDesktop.svg";
import bookMobile from "@/public/assets/img/bookMobile.svg";
import logoSecondary from "@/public/assets/logo/logoSecondaryBlack.png";
// SCSS
import styles from "@/styles/bookApt.module.scss";

const Step1 = ({ onNext }) => (
  <div>
    {/* Date */}
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Appointment Date</Form.Label>
      <Form.Control type="date" placeholder="Enter your appointment date" />
    </Form.Group>
    {/* Time */}
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Appointment Time</Form.Label>
      <Form.Control type="time" placeholder="Enter your appointment time" />
    </Form.Group>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
      <Button variant="warning" type="submit" className="ps-4 pe-4 ms-auto" onClick={onNext}>
        Next
      </Button>
    </div>
  </div>
);

const Step2 = ({ onNext, onBack }) => (
  <div>
    <h2>Step 2</h2>
    {/* Your form fields here */}
    {/* Date */}
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Appointment Date</Form.Label>
      <Form.Control type="date" placeholder="Enter your appointment date" />
    </Form.Group>
    {/* Time */}
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Appointment Time</Form.Label>
      <Form.Control type="time" placeholder="Enter your appointment time" />
    </Form.Group>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
      <Button variant="warning" type="submit" className="ps-4 pe-4 ms-auto" onClick={onNext}>
        Next
      </Button>
    </div>

    <button onClick={onBack}>Back</button>
    <button onClick={onNext}>Next</button>
  </div>
);

const Step3 = ({ onBack }) => (
  <div>
    <h2>Step 3</h2>
    {/* Your form fields here */}
    <button onClick={onBack}>Back</button>
    <button type="submit">Submit</button>
  </div>
);

function bookAppointment() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  return (
    <main>
      <Container fluid className="agapaint-light min-vh-100">
        <Row>
          <Row className="align-items-center justify-content-center">
            <img src={logoSecondary.src} style={{ width: "20rem" }} />
          </Row>
          <Row className="p-5 pt-0">
            <Col lg={9}>
              <Card className="border-0 p-2" style={{ borderRadius: "20px" }}>
                <Card.Body>
                  <Row>
                    {/* Progress Column */}
                    <Col lg={3}>
                      <Image src={bookDesktop.src} style={{ borderRadius: "10px", width: "100%" }} />
                    </Col>

                    {/* Form Column */}
                    <Col lg={9} className="p-5 ps-4">
                      <Row>
                        <h2 className="fw-bold">Book an Appointment</h2>
                        <p>Please select desired appointment date and time </p>
                      </Row>
                      <Form>
                        {step === 1 && <Step1 onNext={nextStep} />}
                        {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} />}
                        {step === 3 && <Step3 onBack={prevStep} />}
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Row>
      </Container>
    </main>
  );
}

export default bookAppointment;
