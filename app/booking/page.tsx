"use client";
import { Container, Row, Col, Card, Form, Button, Image, Badge } from "react-bootstrap";
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
import { isSameDay, isSameMonth, isThisMonth, isToday, isFuture } from "date-fns";
import { Calendar, Calendar2 } from "react-bootstrap-icons";
import { set } from "mongoose";
import { errorToJSON } from "next/dist/server/render";

// Car Type Step

const Step1 = ({
  onNext,
  setAppointmentData,
}: {
  onNext: () => void;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
}) => {
  const [carType, setCarType] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!carType) {
      setError("Car Type is required");
    } else {
      setError("");
      onNext();
    }
  };

  return (
    <div>
      <h2 className="fw-bold ps-4 ps-lg-0 pe-4 pe-lg-0">Book an Appointment</h2>
      <div className="d-flex justify-content-between">
        <p className="lead ps-4 ps-lg-0 pe-4 pe-lg-0">Choose a vehicle type</p>
        {error && <p className="small text-danger d-none d-lg-block">Please choose a car type</p>}
      </div>
      {error && <p className="ps-4 ps-lg-0 pe-4 pe-lg-0 text-danger d-sm-block d-lg-none">Please choose a car type</p>}
      {/* Car Type Radio Button */}
      <div className="d-flex flex-column">
        <CarType setAppointmentData={setAppointmentData} setCarType={setCarType} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
        <Button variant="warning" className="ps-4 pe-4 ms-auto fw-medium me-3 me-lg-0 mt-3" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

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
}) => {
  const [timeError, setTimeError] = useState("");
  const [validateTime, setValidateTime] = useState("");
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    if (time < "08:00" || time > "16:00") {
      setTimeError("Please choose a time between 08:00 AM and 4:00 PM");
    } else {
      setAppointmentData((prev) => ({ ...prev, time: e.target.value }));
      setValidateTime(e.target.value);
      setTimeError("");
    }
  };

  const [error, setError] = useState("");
  const handleNext = () => {
    if (!validateTime) {
      setTimeError("Please choose a time");
      return;
    }
    if (!startDate) {
      setError("Please choose a date");
      return;
    }
    setError("");
    setTimeError("");
    onNext();
  };

  const currentYear = new Date().getFullYear();
  const holidays = [
    { date: `${currentYear}-01-01`, holidayName: "New Year's Day" },
    { date: `${currentYear}-04-09`, holidayName: "Araw ng Kagitingan" },
    { date: `${currentYear}-05-01`, holidayName: "Labor Day" },
    { date: `${currentYear}-06-12`, holidayName: "Independence Day" },
    { date: `${currentYear}-08-21`, holidayName: "Ninoy Aquino Day" },
    { date: `${currentYear}-08-30`, holidayName: "National Heroes Day" },
    { date: `${currentYear}-11-30`, holidayName: "Bonifacio Day" },
    { date: `${currentYear}-12-25`, holidayName: "Christmas Day" },
    { date: `${currentYear}-12-30`, holidayName: "Rizal Day" },
    { date: `${currentYear}-12-31`, holidayName: "New Year's Eve" },
  ];
  const excludedDatesWithHolidays = [...excludedDates, ...holidays.map((holiday) => new Date(holiday.date))];

  return (
    <div className="ps-4 ps-lg-0 pe-4 pe-lg-0">
      <h2 className="fw-bold">Book an Appointment</h2>
      <div className="d-flex justify-content-between">
        <p className="lead">Choose an appointment date and time</p>
        {error && <p className="small text-danger d-none d-lg-block">Please choose a date</p>}
      </div>
      {error && <p className="text-danger d-sm-block d-lg-none">Please choose a date</p>}
      {/* Date */}
      <Row className="gap-4 gap-lg-0">
        <Col lg={6} sm={12} className="text-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Appointment Date</Form.Label>
            <br />
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => {
                const dateString = format(date, "yyyy-MM-dd");
                const localDate = new Date(dateString);
                setStartDate(localDate);
              }}
              minDate={new Date()}
              excludeDates={excludedDatesWithHolidays}
              selectsDisabledDaysInRange
              className="form-control"
              showIcon
              icon={<Calendar2 className="ms-2" />}
              dayClassName={(date) => {
                if (isSameDay(date, startDate)) {
                  return "datepicker-selected";
                } else if (
                  excludedDatesWithHolidays &&
                  excludedDatesWithHolidays.some((excludedDate) => isSameDay(date, excludedDate))
                ) {
                  return "datepicker-excluded";
                } else if ((isToday(date) || isFuture(date)) && isThisMonth(date)) {
                  return "datepicker-available";
                } else {
                  return "datepicker-other-month";
                }
              }}
              inline
              holidays={holidays}
            />
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <Badge bg="danger-subtle" text="danger-emphasis">
              Not Available
            </Badge>
            <Badge bg="success-subtle" text="success-emphasis">
              Available
            </Badge>
          </div>
        </Col>

        {/* Time */}
        <Col lg={4} sm={12} className="text-center">
          <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
            <Form.Label>Appointment Time</Form.Label>
            <Form.Control
              type="time"
              min="08:00"
              max="16:00"
              placeholder="Enter your appointment time"
              onChange={handleTimeChange}
              isInvalid={!!timeError}
            />
            <Form.Control.Feedback type="invalid" className="text-start">
              {!!timeError && "Please choose a time between 08:00 AM and 4:00 PM"}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Nav Buttons */}
      <div className="d-flex justify-content-between mt-4 pt-2">
        <Button variant="outline-dark" type="submit" className="ps-4 pe-4" onClick={onBack}>
          Back
        </Button>
        <Button variant="warning" className="ps-4 pe-4 fw-medium" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

// Services Step
const Step3 = ({
  onNext,
  onBack,
  setSelectedService,
  setAppointmentData,
  appointmentData,
  validateService,
}: {
  onNext: () => void;
  onBack: () => void;
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceData[]>>;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
  appointmentData: AppointmentData;
  validateService: number;
}) => {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (validateService === 0) {
      setError("Please choose at least one service");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div>
      <h2 className="fw-bold ps-4 ps-lg-0 pe-4 pe-lg-0">Book an Appointment</h2>
      <p className="lead ps-4 ps-lg-0 pe-4 pe-lg-0">Choose desired services for your vehicle type</p>
      {error && <p className="small text-danger">{error}</p>}
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
        <Button variant="warning" className="ps-4 pe-4 fw-medium" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

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

      <Button variant="warning" type="submit" className="ps-4 pe-4 fw-medium">
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
  formattedTime,
}: {
  onNext: () => void;
  onBack: () => void;
  appointmentData: AppointmentData;
  selectedService: ServiceData[];
  bookAppointment: () => void;
  startDate: Date;
  formattedTime: String;
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
          <span className="fw-semibold">Time:</span> {formattedTime}
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
      <p className="lh-sm small" style={{ fontSize: "15px" }}>
        <b>
          NOTE: WE WILL INFORM YOU THROUGH EMAIL OF ANY CHANGES TO THE SERVICE AMOUNT BEFORE PROCEEDING WITH THE
          SERVICE.
        </b>
        <br />
        Please note, the total service amount might change after inspection especially for 'Others' vehicle type. We aim
        to give accurate estimates, but the final amount could vary.
      </p>
      <p className="lh-sm small" style={{ fontSize: "15px" }}>
        <b>NOTE: THAT WE ARE NOT RESPONSIBLE FOR ANY ITEMS LEFT ON THE VEHICLE </b>
        <br />I hereby agree voluntarily to drop the key for my vehicle for servicing and acknowledge that any damage or
        wrong service given due to false information given above our company will not be responsible. I hereby declare
        that all information given above is true and I agree to the terms and conditions of Agapaint.
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
    plateNumber: "",
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
  const [startDate, setStartDate] = useState<Date>();
  const [excludedDates, setExcludedDates] = useState<Date[]>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AppointmentData>();

  const onSubmit = () => {
    // Check if appointmentData is not empty for Personal Info
    if (Object.values(appointmentData).filter((value) => value !== null && value !== "").length >= 14) {
      nextStep();
      console.log("Proceeding to next step" + Object.values(appointmentData) !== "");
    } else {
      setValidated(true);
      console.log("Validation failed");
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

  const time = appointmentData.time;
  let formattedTime = "";

  if (time) {
    const [hours, minutes] = time.split(":");
    const hourIn12HourFormat = parseInt(hours, 10) % 12 || 12;
    const period = parseInt(hours, 10) >= 12 ? "PM" : "AM";
    formattedTime = `${hourIn12HourFormat}:${minutes} ${period}`;
  }

  const resetStep1 = () => {
    setAppointmentData((prev) => ({ ...prev, carType: "" }));
    setAppointmentData((prev) => ({ ...prev, servicesId: [] }));
    setSelectedService([]);
  };

  const resetStep2 = () => {
    setAppointmentData((prev) => ({ ...prev, time: "" }));
    setStartDate(null);
  };

  const resetStep3 = () => {
    setAppointmentData((prev) => ({ ...prev, servicesId: [] }));
    setSelectedService([]);
  };

  const resetStep4 = () => {
    setAppointmentData((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      carManufacturer: "",
      carModel: "",
      carColor: "",
      plateNumber: "",
      requests: "",
      paymentTerm: "Full",
      startingBalance: 0,
      currentBalance: 0,
    }));
  };

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
                          <div className="sideBar">
                            <div className="stepSummary">
                              <Stepper
                                steps={navSteps}
                                currentStepIndex={step - 1}
                                orientation="vertical"
                                labelPosition="right"
                                // onStepClick={handleStepClick}
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
                              onBack={() => {
                                prevStep();
                                resetStep1();
                              }}
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
                              onBack={() => {
                                prevStep();
                                resetStep2();
                              }}
                              setSelectedService={setSelectedService}
                              setAppointmentData={setAppointmentData}
                              appointmentData={appointmentData}
                              validateService={selectedService.length}
                            />
                          )}
                          {step === 4 && (
                            <Step4
                              onNext={nextStep}
                              onBack={() => {
                                prevStep();
                                resetStep3();
                              }}
                              setAppointmentData={setAppointmentData}
                            />
                          )}
                          {step === 5 && (
                            <Step5
                              onNext={nextStep}
                              onBack={() => {
                                prevStep();
                                resetStep4();
                              }}
                              appointmentData={appointmentData}
                              selectedService={selectedService}
                              bookAppointment={bookAppointment}
                              startDate={startDate}
                              formattedTime={formattedTime}
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
                          <p className="ms-auto fw-bold lh-1">{formattedTime}</p>
                        </div>
                        <hr />
                        {/* Services */}
                        <p>Services Selected:</p>
                        {selectedService.map((service) => (
                          <div className="d-flex" key={service._id}>
                            <p className="lh-1">{service.name}</p>
                            <p className="ms-auto lh-1">{service.price && service.price.toFixed(2)}</p>
                          </div>
                        ))}
                        <p><b><i>Note: Service prices are subject to changes</i></b></p>
                        <hr />
                        <div className="d-flex">
                          <h4 className="ms-auto fw-bold lh-1">{totalPrice && totalPrice.toFixed(2)}</h4>
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
