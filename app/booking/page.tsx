"use client";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import Link from "@/components/Link";
// Images
import bookDesktop from "@/public/assets/img/bookDesktop.svg";
import bookMobile from "@/public/assets/img/bookMobile.svg";
import logoSecondary from "@/public/assets/logo/logoSecondaryBlack.png";
// SCSS
import styles from "@/styles/booking.module.scss";
// Icons
import { FaArrowLeft } from "react-icons/fa";
// Components
import CarType from "@/components/forms/CarType";
import PersonalInfo from "@/components/forms/PersonalInfo";
import Services from "@/components/forms/Services";
import { useForm } from "react-hook-form";
import { AppointmentData, ServiceData } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import Stepper from "@keyvaluesystems/react-stepper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

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
    <p className="lead ps-4 ps-lg-0 pe-4 pe-lg-0 ">Choose a vehicle type</p>
    {/* Car Type Radio Button */}
    <div className="d-flex flex-column">
      <CarType setAppointmentData={setAppointmentData} />
    </div>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
      <Button
        variant="warning"
        type="submit"
        className="ps-4 pe-4 ms-auto fw-medium me-3 me-lg-0 mt-3"
        onClick={onNext}
      >
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
  currentDate,
  startDate,
  setStartDate,
  excludedDates,
}: {
  onNext: () => void;
  onBack: () => void;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
  currentDate: Date;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  excludedDates: Date[];
}) => (
  <div className="ps-4 ps-lg-0 pe-4 pe-lg-0">
    <h2 className="fw-bold">Book an Appointment</h2>
    <p className="lead">Choose a desired date and time</p>
    {/* Date */}
    <Form.Group className="mb-3" controlId="formBasicEmail" style={{ display: "flex", flexDirection: "column" }}>
      <Form.Label>Appointment Date</Form.Label>

      <DatePicker
        selected={startDate}
        onChange={(date: Date) => {
          const dateString = format(date, "yyyy-MM-dd");
          const localDate = new Date(dateString);
          setStartDate(localDate);
        }}
        minDate={new Date()}
        excludeDates={excludedDates}
        selectsDisabledDaysInRange
        className="form-control"
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
    <p className="lead ps-4 ps-lg-0 pe-4 pe-lg-0">Choose desired services for your vehicle type</p>
    {/* Services */}
    <Services
      setSelectedService={setSelectedService}
      setAppointmentData={setAppointmentData}
      appointmentData={appointmentData}
    />
    {/* Nav Buttons */}
    <div className="d-flex justify-content-between ps-4 ps-lg-0 pe-4 pe-lg-0">
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
  <div className="ps-4 ps-lg-0 pe-4 pe-lg-0">
    <h2 className="fw-bold">Client Information</h2>
    <p className="lead">Please provide your personal information</p>
    {/* Personal Info */}
    <PersonalInfo setAppointmentData={setAppointmentData} />
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

// Confirmation Step
const Step5 = ({
  onNext,
  onBack,
  appointmentData,
  selectedService,
  bookAppointment,
  startDate,
}: {
  onNext: () => void;
  onBack: () => void;
  appointmentData: AppointmentData;
  selectedService: ServiceData[];
  bookAppointment: () => void;
  startDate: Date;
}) => (
  <div className="ps-4 ps-lg-0 pe-4 pe-lg-0">
    <h2 className="fw-bold">Review Details</h2>
    {/* Confirmation */}
    <Row className="lh-05 mb-1 small">
      <Col xs={12} md={6}>
        <h6 className="mb-3">Client Information</h6>
        <p>
          <span className="fw-semibold">Name:</span> {appointmentData.firstName} {appointmentData.lastName}
        </p>
        <p className="lh-sm">
          <span className="fw-semibold">Email:</span> {appointmentData.email}
        </p>
        <p>
          <span className="fw-semibold">Phone:</span> {appointmentData.phoneNumber}
        </p>
        <hr />
      </Col>
      <Col xs={12} md={6}>
        <h6 className="mb-3">Appointment Details</h6>
        <p>
          <span className="fw-semibold">Vehicle Type:</span> {appointmentData.carType}
        </p>
        <p>
          <span className="fw-semibold">Date:</span> {startDate.toDateString()}
        </p>
        <p>
          <span className="fw-semibold">Time:</span> {appointmentData.time}
        </p>
        <hr />
      </Col>
      <h6 className="mb-3">Services Selected</h6>
      <p>
        <span className="fw-semibold">Services: </span>
        {selectedService.map((service) => (
          <span key={service._id}>{service.name}, </span>
        ))}
      </p>
      <hr />
      <h6 className="mb-3">Vehicle Information</h6>
      <Col>
        <p>
          <span className="fw-semibold">Vehicle Manufacturer:</span> {appointmentData.carManufacturer}
        </p>
        <p>
          <span className="fw-semibold">Vehicle Model:</span> {appointmentData.carModel}
        </p>
      </Col>
      <Col>
        <p>
          <span className="fw-semibold">Color:</span> {appointmentData.carColor}
        </p>

        <p>
          <span className="fw-semibold">Plate#:</span> {appointmentData.plateNumber}
        </p>
      </Col>
      <p>
        <span className="fw-semibold">Comments/ Request:</span> {appointmentData.requests}
      </p>
      <hr />
      <p className="lh-sm small">
        NOTE: THAT WE ARE NOT RESPONSIBLE FOR ANY ITEMS LEFT ON THE VEHICLE <br />I hereby agree voluntarily to drop the
        key for my vehicle for servicing and acknowledge that any damage or wrong service given due to false information
        given above our company will not be responsible. I hereby declare that all information given above is true and I
        agree to the terms and conditions of Agapaint.
      </p>
    </Row>
    {/* Nav Buttons */}
    <div className="d-sm-grid">
      <Button
        variant="warning"
        type="submit"
        className="fw-bold p-2 w-100 mb-2"
        onClick={() => {
          bookAppointment();
          onNext();
        }}
      >
        Book My Appointment
      </Button>
      <Button variant="outline-dark" type="submit" className="ps-4 pe-4 w-100" onClick={onBack}>
        Back
      </Button>
    </div>
  </div>
);

// Thank you Step
const Step6 = ({ onBack }) => (
  <div className="d-flex flex-column justify-content-center ps-4 ps-lg-0 pe-4 pe-lg-0" style={{ height: "50vh" }}>
    <h2 className="fw-bold">Thank you for your booking!</h2>
    {/* Thank you */}
    <p className="responsive-text">
      An email containing instruction on how to pay your booking appointment will be sent to your provided email. Your
      appointment is put on hold until proof of downpayment has been received.
    </p>
    {/* Nav Buttons */}
    <div className="d-flex justify-content-between">
      <Link href="./customer/appointment">
        <Button variant="warning" className="ps-4 pe-4 fw-bold">
          Go to My Appointments
        </Button>
      </Link>
    </div>
  </div>
);

interface NavStep {
  stepLabel: string;
  stepNumber: number;
  completed: boolean;
}

function bookAppointment() {
  // Nav Progress
  const [step, setStep] = useState(1);
  const [navSteps, setNavSteps] = useState<NavStep[]>([
    {
      stepLabel: "Vehicle Type",
      stepNumber: 1,
      completed: false,
    },
    {
      stepLabel: "Date & Time",
      stepNumber: 2,
      completed: false,
    },
    {
      stepLabel: "Services",
      stepNumber: 3,
      completed: false,
    },
    {
      stepLabel: "Client Info",
      stepNumber: 4,
      completed: false,
    },
    {
      stepLabel: "Review Details",
      stepNumber: 5,
      completed: false,
    },
    {
      stepLabel: "Finish",
      stepNumber: 6,
      completed: false,
    },
  ]);

  const handleStepClick = (clickedStep) => {
    const updatedSteps = navSteps.map((step) =>
      step.stepNumber === clickedStep.stepNumber ? { ...step, completed: false } : step
    );

    setNavSteps(updatedSteps);
    setStep(clickedStep.stepNumber);
  };

  const styles = {
    LineSeparator: () => ({
      backgroundColor: "#f1b038",
    }),
    ActiveNode: () => ({
      backgroundColor: "#f1b038",
    }),
    CompletedNode: () => ({
      backgroundColor: "#f1b038",
    }),
    InactiveLineSeparator: () => ({
      backgroundColor: "gray",
    }),
    ActiveLabelTitle: () => ({
      color: "#f1b038",
      fontWeight: "700",
    }),
    LabelTitle: () => ({
      color: "white",
      fontWeight: "300",
    }),
  };

  const nextStep = () => {
    setStep((prevStep) => {
      setNavSteps((prevSteps) =>
        prevSteps.map((step, index) => (index === prevStep - 1 ? { ...step, completed: true } : step))
      );

      return prevStep + 1;
    });
  };

  const prevStep = () => {
    setStep((prevStep) => {
      const previousStep = prevStep - 1;

      setNavSteps((prevSteps) =>
        prevSteps.map((step, index) => (index === previousStep ? { ...step, completed: false } : step))
      );

      return previousStep;
    });
  };

  // Form Validation
  const [validated, setValidated] = useState(false);
  const { data: session } = useSession();
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    customerId: "",
    email: session?.user?.email,
    plateNumber: "ABC 123",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    carManufacturer: "",
    carModel: "",
    requests: "",
    time: "",
    carType: "",
    servicesId: [],
    paymentTerm: "Full",
    carColor: "",
    startingBalance: 0,
    currentBalance: 0,
  });
  const [selectedService, setSelectedService] = useState<ServiceData[]>([]);
  const totalPrice = selectedService.reduce((total, service) => total + service.price, 0);
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(new Date());
  const [excludedDates, setExcludedDates] = useState<Date[]>();

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

  useEffect(() => {
    axios.get("/api/excludedDates").then((res) => {
      const dates = res.data.flatMap((item) => item.dates);
      setExcludedDates(dates);
    });
  }, []);

  const bookAppointment = () => {
    axios
      .post("/api/appointment", {
        ...appointmentData,
        servicesId: selectedService.map((service) => service._id),
        customerId: session?.user?._id,
        startingBalance: totalPrice,
        currentBalance: totalPrice,
        totalPrice,
        date: startDate,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const formattedDate = startDate
    ? `${startDate.toLocaleString("default", { month: "long" })} ${startDate.getDate()}, ${startDate.getFullYear()}`
    : "";

  return (
    <main>
      <Container fluid className="agapaint-bg min-vh-100">
        <Row className="justify-content-center">
          <Row className="justify-content-center">
            <Col>
              <Link href="/" className="align-items-center justify-content-center text-decoration-none d-flex">
                <FaArrowLeft className="text-dark ms-3 d-none d-md-inline" size={25} />
                <FaArrowLeft className="text-dark ms-3 d-md-none" size={15} />
                <img
                  src={logoSecondary.src}
                  style={{ width: "20rem", margin: "auto" }}
                  className="d-none d-md-inline"
                />
                <img src={logoSecondary.src} style={{ width: "15rem", margin: "auto" }} className="d-md-none" />
              </Link>
            </Col>
          </Row>

          <Row className="pt-0 p-3 p-lg-5 pt-lg-0 justify-content-center gap-4 gap-lg-0">
            {/* Main Content */}
            <Col lg={9}>
              <Card className="border-0 p-lg-2 p-0 shadow-sm" style={{ borderRadius: "20px" }}>
                <Card.Body>
                  <Row>
                    {/* Progress Column */}
                    <Col lg={3}>
                      <Card
                        className="d-none d-lg-block"
                        style={{ height: "100%", borderRadius: "13px", overflow: "hidden" }}
                      >
                        <Card.Img
                          className="d-none d-lg-block"
                          src={bookDesktop.src}
                          style={{
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "13px",
                            filter: "brightness(0.7)",
                          }}
                        />
                        <Card.ImgOverlay className="text-white">
                          {/* Progress Stepper 1 */}
                          {/* <ul className="vertical-point-progress">
                            {navSteps.map((navstep, index) => (
                              <li
                                key={index + 1}
                                className={index + 1 === step ? "fw-bold" : ""}
                                onClick={() => handleStepClick(index + 1)}
                              >
                                <span className="ps-3 progress-text">{navstep}</span>
                              </li>
                            ))}
                          </ul> */}
                          {/* Progress Stepper 2 */}
                          <div className="sideBar">
                            <div className="stepSummary">
                              <Stepper
                                steps={navSteps}
                                currentStepIndex={step - 1}
                                orientation="vertical"
                                labelPosition="right"
                                onStepClick={handleStepClick}
                                styles={styles}
                              />
                            </div>
                          </div>
                        </Card.ImgOverlay>
                      </Card>
                    </Col>

                    {/* Form Column */}

                    <Col lg={9} className="p-1 p-lg-5 ps-lg-4 pt-3 pb-3  pt-2  pe-lg-4">
                      <Row>
                        <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                          {step === 1 && <Step1 onNext={nextStep} setAppointmentData={setAppointmentData} />}
                          {step === 2 && (
                            <Step2
                              onNext={nextStep}
                              onBack={prevStep}
                              setAppointmentData={setAppointmentData}
                              currentDate={currentDate}
                              startDate={startDate}
                              setStartDate={setStartDate}
                              excludedDates={excludedDates}
                            />
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
                              startDate={startDate}
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
