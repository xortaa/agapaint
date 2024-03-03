"use client";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import Link from "next/link";
// Images
import bookDesktop from "@/public/assets/img/bookDesktop.svg";
import bookMobile from "@/public/assets/img/bookMobile.svg";
import logoSecondary from "@/public/assets/logo/logoSecondaryBlack.png";
// SCSS
import styles from "@/styles/booking.module.scss";
// Icons
import { FaCar, FaTruck, FaBus } from "react-icons/fa";
// Components
import CarType from "@/components/forms/CarType";
import PersonalInfo from "@/components/forms/PersonalInfo";
import Services from "@/components/forms/Services";
import { useForm } from "react-hook-form";
import { AppointmentData, ServiceData } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";

// Car Type Step

const Step1 = ({
  onNext,
  setAppointmentData,
}: {
  onNext: () => void;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
}) => (
  <div>
    <h2 className="fw-bold ps-4 ps-lg-0 pe-4 pe-lg-0">Book an Appointment</h2>
    <p className="lead ps-4 ps-lg-0 pe-4 pe-lg-0 ">Choose a car type</p>
    {/* Car Type Radio Button */}
    <div className="d-flex flex-column">
      <CarType setAppointmentData={setAppointmentData} />
    </div>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
      <Button variant="warning" type="submit" className="ps-4 pe-4 ms-auto fw-medium" onClick={onNext}>
        Next
      </Button>
    </div>
  </div>
);

// Appointment Date TIme Step

const Step2 = ({
  onNext,
  onBack,
  setAppointmentData,
}: {
  onNext: () => void;
  onBack: () => void;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
}) => (
  <div>
    <h2 className="fw-bold ps-4 ps-lg-0 pe-4 pe-lg-0">Book an Appointment</h2>
    <p className="lead ps-4 ps-lg-0 pe-4 pe-lg-0">Choose a desired date and time</p>
    {/* Date */}
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Appointment Date</Form.Label>
      <Form.Control
        type="date"
        placeholder="Enter your appointment date"
        onChange={(e) => setAppointmentData((prev) => ({ ...prev, date: e.target.value }))}
      />
    </Form.Group>
    {/* Time */}
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Appointment Time</Form.Label>
      <Form.Control
        type="time"
        placeholder="Enter your appointment time"
        onChange={(e) => setAppointmentData((prev) => ({ ...prev, time: e.target.value }))}
      />
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
const Step3 = ({
  onNext,
  onBack,
  setSelectedService,
  setAppointmentData,
  appointmentData,
}: {
  onNext: () => void;
  onBack: () => void;
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceData[]>>;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
  appointmentData: AppointmentData;
}) => (
  <div>
    <h2 className="fw-bold ps-4 ps-lg-0 pe-4 pe-lg-0">Book an Appointment</h2>
    <p className="lead ps-4 ps-lg-0 pe-4 pe-lg-0">Choose desired services for your car type</p>
    {/* Services */}
    <Services
      setSelectedService={setSelectedService}
      setAppointmentData={setAppointmentData}
      appointmentData={appointmentData}
    />
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
const Step4 = ({
  onNext,
  onBack,
  setAppointmentData,
}: {
  onNext: () => void;
  onBack: () => void;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
}) => (
  <div>
    <h2 className="fw-bold ps-4 ps-lg-0 pe-4 pe-lg-0">Book an Appointment</h2>
    <p className="lead ps-4 ps-lg-0 pe-4 pe-lg-0">Please provide your personal information</p>
    {/* Personal Info */}
    <PersonalInfo setAppointmentData={setAppointmentData} />
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
const Step5 = ({
  onNext,
  onBack,
  appointmentData,
  selectedService,
  bookAppointment,
}: {
  onNext: () => void;
  onBack: () => void;
  appointmentData: AppointmentData;
  selectedService: ServiceData[];
  bookAppointment: () => void;
}) => (
  <div>
    <h2 className="fw-bold mb-3 ps-4 ps-lg-0 pe-4 pe-lg-0">Confirm Details</h2>
    {/* Confirmation */}
    <Row className="lh-05 mb-1">
      <Col>
        <h5 className="mb-3">Personal Information</h5>
        <p>
          <span className="fw-semibold">Name:</span> {appointmentData.firstName} {appointmentData.lastName}
        </p>
        <p>
          <span className="fw-semibold">Email:</span> {appointmentData.email}
        </p>
        <p>
          <span className="fw-semibold">Phone:</span> {appointmentData.phoneNumber}
        </p>
        <hr />
      </Col>
      <Col>
        <h5 className="mb-3">Appointment Details</h5>
        <p>
          <span className="fw-semibold">Car Type:</span> {appointmentData.carType}
        </p>
        <p>
          <span className="fw-semibold">Date:</span> {appointmentData.date}
        </p>
        <p>
          <span className="fw-semibold">Time:</span> {appointmentData.time}
        </p>
        <hr />
      </Col>
      <h5 className="mb-3">Services Selected</h5>
      <p>
        <span className="fw-semibold">Services: </span>
        {selectedService.map((service) => (
          <span key={service._id}>{service.name}, </span>
        ))}
      </p>
      <hr />
      <h5 className="mb-3">Vehicle Information</h5>
      <p>
        <span className="fw-semibold">Car Manufacturer:</span> {appointmentData.carManufacturer}
      </p>
      <p>
        <span className="fw-semibold">Car Model:</span> {appointmentData.carModel}
      </p>
      <p>
        <span className="fw-semibold">Comments/ Request:</span> {appointmentData.requests}
      </p>
    </Row>
    {/* Nav Buttons */}
    <div className="d-flex justify-content-between mt-4">
      <Button variant="outline-dark" type="submit" className="ps-4 pe-4" onClick={onBack}>
        Back
      </Button>
      <Button
        variant="warning"
        type="submit"
        className="ps-4 pe-4 fw-bold"
        onClick={() => {
          bookAppointment();
          onNext();
        }}
      >
        Book Appointment
      </Button>
    </div>
  </div>
);

// Thank you Step
const Step6 = ({ onBack }) => (
  <div className="d-flex flex-column justify-content-center" style={{ height: "400px" }}>
    <h2 className="fw-bold ps-4 ps-lg-0 pe-4 pe-lg-0">Thank you for your booking!</h2>
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
  const [step, setStep] = useState(3);
  const navSteps = ["Car Type", "Date & Time", "Services", "Personal Info", "Confirm Details", "Finish"]; // Add or remove steps as needed
  const handleStepClick = (stepNumber) => {
    setStep(stepNumber);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Form Validation
  const [validated, setValidated] = useState(false);
  const { data: session } = useSession();
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    customerId: "",
    plateNumber: "ABC 123",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    carManufacturer: "",
    carModel: "",
    requests: "",
    date: "",
    time: "",
    carType: "",
    servicesId: [],
  });
  const [selectedService, setSelectedService] = useState<ServiceData[]>([]);
  const totalPrice = selectedService.reduce((total, service) => total + service.price, 0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AppointmentData>();

  const onSubmit = () => {
    if (Object.keys(errors).length === 0) {
      nextStep(); // Call onNext with nextStep if all fields are valid
      setValidated(true);
    }
  };

  const bookAppointment = () => {
    axios
      .post("/api/appointment", {
        ...appointmentData,
        servicesId: selectedService.map((service) => service._id),
        customerId: session?.user?._id,
      })
      .then((res) => {
        console.log(res);
      });
  };


  const date = appointmentData.date ? new Date(appointmentData.date) : null;
  const formattedDate = date
    ? `${date.toLocaleString("default", { month: "long" })} ${date.getDate()}, ${date.getFullYear()}`
    : "";

  return (
    <main>
      <Container fluid className="agapaint-bg min-vh-100">
        <Row className="justify-content-center">
          <Row className="align-items-center justify-content-center">
            <img src={logoSecondary.src} style={{ width: "20rem" }} />
          </Row>
          <Row className="pt-0 p-3 p-lg-5 pt-lg-0 justify-content-center gap-4 gap-lg-0">
            {/* Main Content */}
            <Col lg={9}>
              <Card className="border-0 p-lg-2 p-0 shadow-sm" style={{ borderRadius: "20px" }}>
                <Card.Body>
                  <Row>
                    {/* Progress Column */}
                    <Col lg={3}>
                      <Card style={{ height: "100%", borderRadius: "13px", overflow: "hidden" }}>
                        <Card.Img
                          className="d-none d-lg-block"
                          src={bookDesktop.src}
                          style={{
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "13px",
                          }}
                        />
                        <Card.Img
                          className="d-sm-block d-lg-none"
                          src={bookMobile.src}
                          style={{
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "13px",
                          }}
                        />
                        <Card.ImgOverlay className="text-white">
                          <ul className="vertical-point-progress">
                            {navSteps.map((navstep, index) => (
                              <li key={index + 1} className={index + 1 === step ? "fw-bold" : ""} onClick={() => handleStepClick(index + 1)}>
                                <span className="ps-3" style={{ fontSize: "14px" }}>
                                  {navstep}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </Card.ImgOverlay>
                      </Card>
                    </Col>

                    {/* Form Column */}

                    <Col lg={9} className="p-1 p-lg-5 ps-lg-4 pt-3 pb-3">

                      <Row>
                        <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                          {step === 1 && <Step1 onNext={nextStep} setAppointmentData={setAppointmentData} />}
                          {step === 2 && (
                            <Step2 onNext={nextStep} onBack={prevStep} setAppointmentData={setAppointmentData} />
                          )}
                          {step === 3 && (
                            <Step3
                              onNext={nextStep}
                              onBack={prevStep}
                              setSelectedService={setSelectedService}
                              setAppointmentData={setAppointmentData}
                              appointmentData={appointmentData}
                            />
                          )}
                          {step === 4 && (
                            <Step4 onNext={nextStep} onBack={prevStep} setAppointmentData={setAppointmentData} />
                          )}
                          {step === 5 && (
                            <Step5
                              onNext={nextStep}
                              onBack={prevStep}
                              appointmentData={appointmentData}
                              selectedService={selectedService}
                              bookAppointment={bookAppointment}
                            />
                          )}
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
                          <p className="ms-auto fw-bold lh-1">{formattedDate}</p>
                        </div>
                        <div className="d-flex">
                          <p className="lh-1">Time</p>
                          <p className="ms-auto fw-bold lh-1">{appointmentData.time}</p>
                        </div>
                        <hr />
                        {/* Services */}
                        <p>Services Selected:</p>
                        {selectedService.map((service) => (
                          <div className="d-flex" key={service._id}>
                            <p className="lh-1">{service.name}</p>
                            <p className="ms-auto lh-1">{service.price}</p>
                          </div>
                        ))}
                        <hr />
                        <div className="d-flex">
                          <h4 className="ms-auto fw-bold lh-1">{totalPrice}</h4>
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
