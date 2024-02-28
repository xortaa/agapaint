"use client";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
// Images
import bookDesktop from "@/public/assets/img/bookDesktop.svg";
import bookMobile from "@/public/assets/img/bookMobile.svg";
import logoSecondary from "@/public/assets/logo/logoSecondaryBlack.png";
// SCSS
import styles from "@/styles/bookApt.module.scss";
// Icons
import { FaCar, FaTruck, FaBus } from "react-icons/fa";
// Components
import CarType from "@/components/forms/CarType";
import PersonalInfo from "@/components/forms/PersonalInfo";
import Services from "@/components/forms/Services";

// Car Type Step
const Step1 = ({ onNext }) => (
  <div>
    <h2 className="fw-bold">Book an Appointment</h2>
    <p className="lead">Choose a car type</p>
    {/* Car Type Radio Button */}
    <div className="d-flex flex-column">
      <CarType />
    </div>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
      <Button variant="warning" type="submit" className="ps-4 pe-4 ms-auto fw-medium" onClick={onNext}>
        Next
      </Button>
    </div>
  </div>
);

// Appointment Date TIme Step
const Step2 = ({ onNext, onBack }) => (
  <div>
    <h2 className="fw-bold">Book an Appointment</h2>
    <p className="lead">Choose a desired date and time</p>
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
    {/* Nav Buttons */}
    <div className="d-flex justify-content-between mt-5 pt-5">
      <Button variant="outline-dark" type="submit" className="ps-4 pe-4" onClick={onBack}>
        Back
      </Button>
      <Button variant="warning" type="submit" className="ps-4 pe-4 fw-medium" onClick={onNext}>
        Next
      </Button>
    </div>
  </div>
);

// Services Step
const Step3 = ({ onNext, onBack }) => (
  <div>
    <h2 className="fw-bold">Book an Appointment</h2>
    <p className="lead">Choose desired services for your car type</p>
    {/* Services */}
    <Services />
    {/* Nav Buttons */}
    <div className="d-flex justify-content-between">
      <Button variant="outline-dark" type="submit" className="ps-4 pe-4" onClick={onBack}>
        Back
      </Button>
      <Button variant="warning" type="submit" className="ps-4 pe-4 fw-medium" onClick={onNext}>
        Next
      </Button>
    </div>
  </div>
);

// Personal Info Step
const Step4 = ({ onNext, onBack }) => (
  <div>
    <h2 className="fw-bold">Book an Appointment</h2>
    <p className="lead">Please provide your personal information</p>
    {/* Personal Info */}
    <PersonalInfo />
    {/* Nav Buttons */}
    <div className="d-flex justify-content-between">
      <Button variant="outline-dark" type="submit" className="ps-4 pe-4" onClick={onBack}>
        Back
      </Button>
      <Button variant="warning" type="submit" className="ps-4 pe-4">
        Next
      </Button>
    </div>
  </div>
);

// Confirmation Step
const Step5 = ({ onNext, onBack }) => (
  <div>
    <h2 className="fw-bold mb-3">Confirm Details</h2>
    {/* Confirmation */}
    <Row className="lh-05 mb-1">
      <Col>
        <h5 className="mb-3">Personal Information</h5>
        <p>
          <span className="fw-semibold">Name:</span> Mia Eleazar
        </p>
        <p>
          <span className="fw-semibold">Email:</span> agapaint@gmail.com
        </p>
        <p>
          <span className="fw-semibold">Phone:</span> 09123456789
        </p>
        <hr />
      </Col>
      <Col>
        <h5 className="mb-3">Appointment Details</h5>
        <p>
          <span className="fw-semibold">Car Type:</span> Compact Car/Hatchback
        </p>
        <p>
          <span className="fw-semibold">Date:</span> 12/12/2021
        </p>
        <p>
          <span className="fw-semibold">Time:</span> 12:00 PM
        </p>
        <hr />
      </Col>
      <h5 className="mb-3">Services Selected</h5>
      <p>
        <span className="fw-semibold">Services:</span> Washover, Under Coating Rubber, Rims/Mags Repaint
      </p>
      <hr />
      <h5 className="mb-3">Vehicle Information</h5>
      <p>
        <span className="fw-semibold">Car Manufacturer:</span> Toyota
      </p>
      <p>
        <span className="fw-semibold">Car Model:</span> Fortuner 2022
      </p>
      <p>
        <span className="fw-semibold">Comments/ Request:</span> N\A
      </p>
    </Row>
    {/* Nav Buttons */}
    <div className="d-flex justify-content-between mt-4">
      <Button variant="outline-dark" type="submit" className="ps-4 pe-4" onClick={onBack}>
        Back
      </Button>
      <Button variant="warning" type="submit" className="ps-4 pe-4 fw-bold" onClick={onNext}>
        Book Appointment
      </Button>
    </div>
  </div>
);

// Thank you Step
const Step6 = ({ onBack }) => (
  <div className="d-flex flex-column justify-content-center" style={{ height: "400px" }}>
    <h2 className="fw-bold">Thank you for your booking!</h2>
    {/* Thank you */}
    <p className="lead">
      An email containing instruction on how to pay your booking appointment will be sent to your provided email. Your
      appointment is put on hold until proof of downpayment has been received.
    </p>
    {/* Nav Buttons */}
    <div className="d-flex justify-content-between">
      <Link href="./customer/appointment">
        <Button variant="warning" type="submit" className="ps-4 pe-4 fw-medium">
          Go to My Appointments
        </Button>
      </Link>
    </div>
  </div>
);

function bookAppointment() {
  // Nav Progress
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Form Validation
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      nextStep(); // Call onNext with nextStep if all fields are valid
    }

    setValidated(true);
  };
  return (
    <main>
      <Container fluid className="agapaint-bg min-vh-100">
        <Row>
          <Row className="align-items-center justify-content-center">
            <img src={logoSecondary.src} style={{ width: "20rem" }} />
          </Row>
          <Row className="p-5 pt-0 justify-content-center">
            {/* Main Content */}
            <Col lg={9}>
              <Card className="border-0 p-2 shadow-sm" style={{ borderRadius: "20px" }}>
                <Card.Body>
                  <Row>
                    {/* Progress Column */}
                    <Col lg={3}>
                      <Card style={{ height: "100%", borderRadius: "13px", overflow: "hidden" }}>
                        <Card.Img
                          src={bookDesktop.src}
                          style={{
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "13px",
                          }}
                        />
                      </Card>
                    </Col>

                    {/* Form Column */}
                    <Col lg={9} className="p-5 ps-4 pb-3">
                      <Row>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                          {step === 1 && <Step1 onNext={nextStep} />}
                          {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} />}
                          {step === 3 && <Step3 onNext={nextStep} onBack={prevStep} />}
                          {step === 4 && <Step4 onNext={nextStep} onBack={prevStep} />}
                          {step === 5 && <Step5 onNext={nextStep} onBack={prevStep} />}
                          {step === 6 && <Step6 onBack={prevStep} />}
                        </Form>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            {/* Side Summary */}
            {step == 1 ||
              (step < 5 && (
                <Col lg={3}>
                  <Card className="border-0 p-3 bg-warning" style={{ borderRadius: "20px" }}>
                    <Card.Body>
                      <Row>
                        <h3 className="fw-bold">Summary</h3>
                        <p>Your preferred appointment details are as follows:</p>
                        <hr />
                        {/* Date Time */}
                        <div className="d-flex">
                          <p className="lh-1">Date</p>
                          <p className="ms-auto fw-bold lh-1">January 22, 2024</p>
                        </div>
                        <div className="d-flex">
                          <p className="lh-1">Time</p>
                          <p className="ms-auto fw-bold lh-1">12:30PM</p>
                        </div>
                        <hr />
                        {/* Services */}
                        <p>Services Selected:</p>
                        <div className="d-flex">
                          <p className="lh-1 fw-bold">Washover</p>
                          <p className="ms-auto lh-1">P32,000.00</p>
                        </div>
                        <div className="d-flex">
                          <p className="lh-1 fw-bold">Under Coating Rubber</p>
                          <p className="ms-auto lh-1">P3,500.00</p>
                        </div>
                        <div className="d-flex">
                          <p className="lh-1 fw-bold">Rims/Mags Repaint</p>
                          <p className="ms-auto lh-1">P2,500.00</p>
                        </div>
                        <hr />
                        <div className="d-flex">
                          <h4 className="ms-auto fw-bold lh-1">P38,000.00</h4>
                        </div>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Row>
      </Container>
    </main>
  );
}

export default bookAppointment;
