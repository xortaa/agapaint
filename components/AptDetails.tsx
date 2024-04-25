import { Col, Row, Card, Table, Modal, Button, Accordion, Form } from "react-bootstrap";
import { InboxFill, CarFrontFill, GearWideConnected } from "react-bootstrap-icons";

import { useState, useEffect } from "react";
import ServiceStatus from "@/components/ServiceStatus";
import PaymentStatus from "@/components/PaymentStatus";
import { Appointment, AppointmentData } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";
import ApproveAptModal from "@/components/ApproveAptModal";
import ConfirmAptModal from "@/components/ConfirmAptModal";
import CancelAptModal from "@/components/CancelAptModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function AptDetails({
  appointment,
  setActiveAppointments,
  activeAppointments,
  closeDetails,
}: {
  appointment: Appointment;
  setActiveAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  activeAppointments: Appointment[];
  closeDetails: () => void;
}) {
  //   Archive Modal
  const [smShow, setSmShow] = useState(false);
  const [endDate, setEndDate] = useState<Date>(appointment ? appointment.endDate : new Date());
  const handleCloseModal = () => setSmShow(false);
  const [isApproved, setIsApproved] = useState(appointment ? appointment.status === "Awaiting Payment" : false);
  const [selectedOption, setSelectedOption] = useState(appointment ? appointment.status : "");
  const [showChangeBalance, setShowChangeBalance] = useState(false);
  const [newBalance, setNewBalance] = useState<number>();
  const [startingBalance, setStartingBalance] = useState<number>();
  const [currentBalance, setCurrentBalance] = useState<number>();
  const [unformattedDate, setUnformattedDate] = useState<String>();
  const [selectedAppointment, setSelectedAppointmepnt] = useState<Appointment>(appointment);
  const [showEndDateError, setShowEndDateError] = useState(false);
  const [newEndDate, setNewEndDate] = useState<String>();
  // const [datePickerStartDate, setDatePickerStartDate] = useState<Date>();
  const [localAppointment, setLocalAppointment] = useState<Appointment>(appointment);

  useEffect(() => {
    if (appointment === null) {
      closeDetails();
      return;
    }
    setLocalAppointment(appointment);
    setCurrentBalance(appointment.currentBalance);
    setStartingBalance(appointment.startingBalance);
  }, [appointment]);

  const handleArchive = () => {
    setStartingBalance(currentBalance);
    const archiveAppointment = new Promise((resolve, reject) => {
      axios
        .delete(`/api/appointment/${appointment._id}`)
        .then((res) => {
          handleCloseModal();

          setActiveAppointments((prev) => prev.filter((apt) => apt._id !== appointment._id));

          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to archive appointment: ", error);
          reject(error);
        });
    });

    toast.promise(archiveAppointment, {
      pending: "Archiving appointment...",
      success: "Appointment Archived!",
      error: "Failed to archive appointment, Please try again.",
    });
  };

  // const handleEndDateChange = (e) => {
  //   setEndDate(new Date(e.target.value));
  //   setUnformattedDate(e.target.value);
  //   setNewEndDate(e.target.value);
  // };

  const handleDatePickerEndDateChange = (date) => {
    setEndDate(date);
    setUnformattedDate(date);
    setNewEndDate(date);
  };

  const handleNewBalanceChange = (e) => {
    setNewBalance(parseFloat(e.target.value));
    setCurrentBalance(parseFloat(e.target.value));
    setStartingBalance(parseFloat(e.target.value));
  };

  const handleApproveAppointment = () => {
    if (!endDate) {
      setShowEndDateError(true);
      return;
    }

    const approveAppointmentData = {
      endDate,
      status: "Awaiting Payment",
      startingBalance: newBalance,
      currentBalance: newBalance,
      paymentTerm: localAppointment.paymentTerm,
    };

    const ApproveAppointment = new Promise((resolve, reject) => {
      axios
        .patch(`/api/appointment/${appointment._id}`, approveAppointmentData)
        .then((res) => {
          const servicesString = localAppointment.servicesId.map((service) => service.name).join(", ");

          const date = new Date(res.data.date);
          const formattedDate = `${date.toLocaleString("default", {
            month: "long",
          })} ${date.getDate()} ${date.getFullYear()}`;

          const emailData = {
            nanoid: appointment.nanoid,
            date: formattedDate,
            time: res.data.time,
            paymentTerm: res.data.paymentTerm,
            startingBalance: res.data.startingBalance,
            currentBalance: res.data.currentBalance,
            carType: res.data.carType,
            carManufacturer: res.data.carManufacturer,
            carModel: res.data.carModel,
            url: `${process.env.NEXT_PUBLIC_URL}/customer/appointment/payment?id=${localAppointment._id}`,
            services: servicesString,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            plateNumber: res.data.plateNumber,
            carColor: res.data.carColor,
            payments: res.data.payments,
          };

          if (res.data.paymentTerm === "Partial") {
            axios.post("/api/email/approvePartial", emailData).then((emailRes) => {
              console.log(emailRes.data);

              setActiveAppointments((prev) => prev.map((apt) => (apt._id === appointment._id ? res.data : apt)));
              setLocalAppointment(res.data);
              setIsApproved(true);
              setSelectedOption("Awaiting Payment");
              setShowEndDateError(false);

              resolve("Success");
            });
          } else if (res.data.paymentTerm === "Full") {
            axios.post("/api/email/approveFull", emailData).then((emailRes) => {
              console.log(emailRes.data);

              setActiveAppointments((prev) => prev.map((apt) => (apt._id === appointment._id ? res.data : apt)));
              setLocalAppointment(res.data);
              setIsApproved(true);
              setSelectedOption("Awaiting Payment");
              setShowEndDateError(false);

              resolve("Success");
            });
          }
        })
        .catch((error) => {
          console.error("Failed to confirm appointment: ", error);
          reject(error);
        });
    });

    toast.promise(ApproveAppointment, {
      pending: "Approving appointment & Email Sending...",
      success: "Appointment approved! Email has been sent to the customer.",
      error: "Failed to approve appointment, Please try again.",
    });
  };

  const handleConfirmAppointment = () => {
    // set the appointment status to ongoing
    const confirmAppointmentData = {
      status: "Ongoing",
    };

    const ConfirmAppointment = new Promise((resolve, reject) => {
      axios
        .patch(`/api/appointment/${appointment._id}`, confirmAppointmentData)
        .then((res) => {
          const servicesString = localAppointment.servicesId.map((service) => service.name).join(", ");

          const date = new Date(res.data.date);
          const formattedDate = `${date.toLocaleString("default", {
            month: "long",
          })} ${date.getDate()} ${date.getFullYear()}`;

          const emailData = {
            nanoid: appointment.nanoid,
            date: formattedDate,
            time: res.data.time,
            paymentTerm: res.data.paymentTerm,
            startingBalance: res.data.startingBalance,
            currentBalance: res.data.currentBalance,
            carType: res.data.carType,
            carManufacturer: res.data.carManufacturer,
            carModel: res.data.carModel,
            url: `${process.env.NEXT_PUBLIC_URL}/customer/appointment/payment?id=${localAppointment._id}`,
            services: servicesString,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            plateNumber: res.data.plateNumber,
            carColor: res.data.carColor,
            payments: res.data.payments,
          };

          if (res.data.paymentTerm === "Partial") {
            axios.post("/api/email/confirmPartial", emailData).then((emailRes) => {
              console.log(emailRes.data);
              setActiveAppointments((prev) => prev.map((apt) => (apt._id === appointment._id ? res.data : apt)));
              setLocalAppointment(res.data);
              setSelectedOption("Ongoing");
              resolve("Success");
            });
          } else if (res.data.paymentTerm === "Full") {
            axios.post("/api/email/confirmFull", emailData).then((emailRes) => {
              console.log(emailRes.data);
              setActiveAppointments((prev) => prev.map((apt) => (apt._id === appointment._id ? res.data : apt)));
              setLocalAppointment(res.data);
              setSelectedOption("Ongoing");
              resolve("Success");
            });
          }
        })
        .catch((error) => {
          console.error("Failed to confirm appointment: ", error);
          reject(error);
        });
    });

    toast.promise(ConfirmAppointment, {
      pending: "Confirming appointment & Email Sending...",
      success: "Appointment confirmed! Email has been sent to the customer.",
      error: "Failed to confirm appointment, Please try again.",
    });
  };

  const handleCancelAppointment = () => {
    const cancelAppointment = new Promise((resolve, reject) => {
      axios
        .delete(`/api/appointment/${appointment._id}`)
        .then((res) => {
          handleCloseModal();
          setActiveAppointments((prev) => prev.filter((apt) => apt._id !== appointment._id));
          closeDetails();

          const date = new Date(res.data.date);
          const formattedDate = `${date.toLocaleString("default", {
            month: "long",
          })} ${date.getDate()} ${date.getFullYear()}`;

          const emailData = {
            nanoid: appointment.nanoid,
            date: formattedDate,
            time: res.data.time,
            carManufacturer: res.data.carManufacturer,
            carModel: res.data.carModel,
            url: `${process.env.NEXT_PUBLIC_URL}/customer/appointment/payment?id=${localAppointment._id}`,
            email: res.data.email,
          };

          axios.post("/api/email/cancelled", emailData).then((emailRes) => {
            console.log(emailRes.data);
            resolve("Success");
          });
        })
        .catch((error) => {
          console.error("Failed to cancel appointment: ", error);
          reject(error);
        });
    });

    toast.promise(cancelAppointment, {
      pending: "Cancelling appointment & Sending Cancellation email...",
      success: "Appointment Cancellation email sent!",
      error: "Failed to cancel appointment, Please try again.",
    });
  };

  return (
    <>
      <Col sm={3}>
        <Card className="border-0 shadow-sm p-1" style={{ fontSize: "14px" }}>
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="fw-bold mb-0">Appointment Details</h4>
              <InboxFill size={24} className="me-2 text-danger" onClick={() => setSmShow(true)} />
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-semibold me-1 mb-0">#{localAppointment.nanoid}</h5>
              {/* Approve and Confirm Button */}
              {localAppointment.status === "Pending" && (
                // <Button variant="warning" className="text-white" onClick={handleApproveAppointment}>
                //   Approve Appointment
                // </Button>
                <ApproveAptModal
                  carryFunction={handleApproveAppointment}
                  aptId={localAppointment.nanoid}
                  aptDate={localAppointment.date.split("T")[0]}
                  aptTime={localAppointment.time}
                  aptEndDate={newEndDate}
                  totalAmount={currentBalance}
                  setShowEndDateError={setShowEndDateError}
                />
              )}
              {localAppointment.status === "Awaiting Payment" && (
                // <Button variant="success" onClick={handleConfirmAppointment}>
                //   Confirm Appointment
                // </Button>
                <ConfirmAptModal
                  carryFunction={handleConfirmAppointment}
                  aptId={localAppointment.nanoid}
                  aptDate={localAppointment.date.split("T")[0]}
                  aptTime={localAppointment.time}
                  aptEndDate={
                    localAppointment && localAppointment.endDate
                      ? new Date(localAppointment.endDate).toISOString().split("T")[0]
                      : `${unformattedDate}`
                  }
                  totalAmount={currentBalance}
                />
              )}
            </div>
            <hr />
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Date</p>
              <p className="ms-auto">{localAppointment.date.split("T")[0]}</p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Time</p>
              <p className="ms-auto">
                {new Date(`1970-01-01T${localAppointment.time}:00`).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Customer</p>
              <p className="ms-auto">
                {localAppointment.firstName} {localAppointment.lastName}
              </p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Email</p>
              <p className="ms-auto">
                <a href="mailto:malizalde@gmail.com" className="text-decoration-none text-dark">
                  {localAppointment.email}
                </a>
              </p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold mb-2">Contact</p>
              <p className="ms-auto mb-2">{localAppointment.phoneNumber}</p>
            </Row>
            <p className="fw-bold mb-0">Requests</p>
            <p className="ms-auto mb-2">{localAppointment.requests === "" ? "N/A" : localAppointment.requests}</p>

            {localAppointment.status !== "Pending" ? (
              <Row xs="auto" className="lh-05">
                <p className="fw-bold mb-0">Target End Date</p>
                <p className="ms-auto">
                  {localAppointment && localAppointment.endDate
                    ? new Date(localAppointment.endDate).toISOString().split("T")[0]
                    : `${unformattedDate}`}
                </p>
              </Row>
            ) : (
              <Form.Group controlId="dob" style={{ marginLeft: "auto" }}>
                <Form.Label className="mt-2 mb-1 small">Target End Date</Form.Label>
                {isApproved ? (
                  <p>
                    {localAppointment && localAppointment.endDate
                      ? new Date(localAppointment.endDate).toISOString().split("T")[0]
                      : `${unformattedDate}`}
                  </p>
                ) : (
                  // <Form.Control
                  //   type="date"
                  //   name="dob"
                  //   placeholder="Target End Date"
                  //   size="sm"
                  //   onChange={handleEndDateChange}
                  //   required
                  // />
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => {
                      const dateString = format(date, "yyyy-MM-dd");
                      const localDate = new Date(dateString);
                      handleDatePickerEndDateChange(localDate);
                      // setDatePickerStartDate(localDate);
                    }}
                    minDate={localAppointment.date}
                    selectsDisabledDaysInRange
                    className="form-control"
                  />
                )}
                {showEndDateError && <p className="text-danger">Please select a target end date</p>}
              </Form.Group>
            )}
            <hr />
            <Row className="align-items-center justify-content-between lh-1">
              <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <CarFrontFill className="me-2 text-secondary" size={20} />
                    Vehicle Information
                  </Accordion.Header>
                  <Accordion.Body className="pb-0">
                    <Row xs="auto" className="lh-05">
                      <p className="text-secondary">Manufacturer</p>
                      <p className="ms-auto">{localAppointment.carManufacturer}</p>
                    </Row>
                    <Row xs="auto" className="lh-05">
                      <p className="text-secondary">Model</p>
                      <p className="ms-auto">{localAppointment.carModel}</p>
                    </Row>
                    <Row xs="auto" className="lh-05">
                      <p className="text-secondary">Type</p>
                      <p className="ms-auto">{localAppointment.carType}</p>
                    </Row>
                    <Row xs="auto" className="lh-05">
                      <p className="text-secondary">Color</p>
                      <p className="ms-auto">{localAppointment.carColor}</p>
                    </Row>
                    <Row xs="auto" className="lh-05">
                      <p className="text-secondary">Plate#</p>
                      <p className="ms-auto">{localAppointment.plateNumber}</p>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="p-0 shadow-sm">
                  <Accordion.Header>
                    <GearWideConnected className="me-2 text-secondary" size={20} />
                    Services Availed
                  </Accordion.Header>
                  <Accordion.Body className="small pb-0">
                    {localAppointment.servicesId.map((service) => (
                      <Row xs="auto" className="lh-05 text-secondary" key={service._id}>
                        <p>{service.name}</p>
                      </Row>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>
            <hr />
            <Row className="align-items-center justify-content-between mb-2">
              <Col xs="auto" className="lh-05 fw-bold">
                <p>Payment Term</p>
                <p className="m-0">Remaining Balance</p>
              </Col>
              <Col xs="auto" className="lh-05 text-end">
                <p>{localAppointment.paymentTerm}</p>
                <p className="m-0 fs-5 fw-bold">{currentBalance && currentBalance.toFixed(2)}</p>
              </Col>
              {showChangeBalance && (
                <Form.Group controlId="dob" style={{ marginLeft: "auto" }}>
                  <Form.Label className="mt-3 mb-1 small">New Balance</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    step="0.01"
                    onChange={handleNewBalanceChange}
                    defaultValue={localAppointment.startingBalance && localAppointment.startingBalance.toFixed(2)}
                  />
                </Form.Group>
              )}
              {localAppointment.status === "Pending" && (
                <Col xs="auto" className="lh-05 text-end my-2">
                  <Button className="btn btn-warning btn-sm text-white" onClick={() => setShowChangeBalance(true)}>
                    Change Balance
                  </Button>
                </Col>
              )}
            </Row>

            <p className="fs-5 agapaint-yellow m-0">Breakdown</p>
            <Table striped responsive style={{ fontSize: "13px" }} className="align-middle">
              <thead>
                <tr>
                  <th>Term</th>
                  <th>%</th>
                  <th>Amount</th>
                  <th style={{ fontSize: "11px" }}>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {localAppointment.payments &&
                  startingBalance &&
                  localAppointment.payments.map((payment, index) => {
                    let term;
                    let percent;
                    let amount;

                    if (localAppointment.paymentTerm === "Partial") {
                      if (index === 0) {
                        term = "1st";
                        percent = "50%";
                        amount = (startingBalance * 0.5).toFixed(2);
                      } else if (index === 1) {
                        term = "2nd";
                        percent = "25%";
                        amount = (startingBalance * 0.25).toFixed(2);
                      } else if (index === 2) {
                        term = "3rd";
                        percent = "25%";
                        amount = (startingBalance * 0.25).toFixed(2);
                      }
                    } else {
                      term = "1st";
                      percent = "100%";
                      amount = startingBalance.toFixed(2);
                    }

                    return (
                      <tr key={payment._id}>
                        <td>{term}</td>
                        <td>{percent}</td>
                        <td>{amount}</td>
                        <td>
                          <PaymentStatus
                            payment={payment}
                            appointment={localAppointment}
                            setActiveAppointments={setActiveAppointments}
                            setCurrentBalance={setCurrentBalance}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <Row className="align-items-center justify-content-between mb-2">
              <Col xs="auto" className="lh-1 fw-bold">
                <p className="m-0 fs-6">Total Service Amount</p>
              </Col>
              <Col xs="auto" className="lh-1 text-end">
                <p className="m-0 fs-5 fw-bold">{startingBalance && startingBalance.toFixed(2)}</p>
              </Col>
            </Row>
            {(localAppointment.status === "Pending" || localAppointment.status === "Awaiting Payment") && (
              <CancelAptModal
                carryFunction={handleCancelAppointment}
                aptId={localAppointment.nanoid}
                aptDate={localAppointment.date.split("T")[0]}
                aptTime={localAppointment.time}
                customer={localAppointment.firstName + " " + localAppointment.lastName}
              />
            )}
          </Card.Body>
        </Card>
      </Col>

      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="archive-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Archive Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-4">Are you sure you want to archive?</p>
          <div className="lh-05">
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Customer</p>
              <p className="ms-auto">{`${localAppointment.firstName} ${localAppointment.lastName}`}</p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Date:</p>
              <p className="ms-auto">{`${localAppointment.date.split("T")[0]}`}</p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Time:</p>
              <p className="ms-auto">{localAppointment.time}</p>
            </Row>
            <Row xs="auto" className="lh-05">
              <p className="fw-bold">Service Status:</p>
              <p className="ms-auto">{localAppointment.status}</p>
            </Row>
            <p className="fw-bold">Services Availed:</p>
            {localAppointment.servicesId.map((service) => (
              <p className="ms-auto" key={service._id}>
                {service.name}
              </p>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleArchive}>
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AptDetails;
