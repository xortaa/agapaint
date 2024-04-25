"use client";
import { Container, Row, Col, Image, Table, Badge, InputGroup, Card, Button, Placeholder } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import paymentStyles from "@/styles/payment.module.scss";
import { Messenger } from "react-bootstrap-icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Appointment, User } from "@/types";
import paymentStatusBg from "@/public/assets/img/paymentStatusBg.png";
import Footer from "@/components/CustomerFooter";
import Navbar from "@/components/CustomerNav";
import Navbar2 from "@/components/CustomerNav2";
import Banner from "@/components/Banner";
import StatusBadge from "@/components/StatusBadge";
import { getSession } from "next-auth/react";
import PaymentStatusBadge from "@/components/PaymentStatusBadge";
import { useSearchParams } from "next/navigation";
import PlaceholderPayment from "@/components/PlaceholderPayment";

function custPayment() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("id");
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [appointment, setAppointment] = useState<Appointment>();
  const [status, setStatus] = useState(appointment?.status);

  const handleRowClick = () => {
    router.push("../appointment");
  };

  useEffect(() => {
    axios.get(`/api/appointment/${appointmentId}`).then((res) => {
      setAppointment(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    if (
      (appointment?.status === "Pending" && appointment.isArchived) ||
      (appointment?.status === "Awaiting Payment" && appointment.isArchived)
    ) {
      setStatus("Cancelled");
    } else {
      setStatus(appointment?.status);
    }
  }, [appointment]);

  useEffect(() => {
    if (session?.user?._id) {
      console.log(session);
      axios
        .get(`/api/users/${session?.user?._id}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [session?.user?._id]);

  let capitalizedFirstName = "";
  if (session && session.user && session.user.name) {
    const nameParts = session.user.name.split(" ");
    const firstName = nameParts[0].toLowerCase();
    capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

  //time 12-hour format AM PM
  let formattedTime = "";
  if (appointment && appointment.time) {
    const appointmentDate = new Date(`1970-01-01T${appointment.time}:00`);
    formattedTime = appointmentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // ...

  // Logged in
  const [isSignedIn, setIsSignedIn] = useState(false);

  const checkSignInStatus = async () => {
    const session = await getSession();
    return session ? true : false;
  };

  useEffect(() => {
    checkSignInStatus().then((isSignedIn) => setIsSignedIn(isSignedIn));
  }, []);

  return (
    <main className="agapaint-bg">
      {/* Navbar */}
      {isSignedIn ? <Navbar2 /> : <Navbar />}

      {/* New Banner */}
      {appointment ? <Banner page="payment" aptId={appointment.nanoid} /> : <Banner page="payment" />}

      {/* Body */}
      {!appointment ? (
        <PlaceholderPayment />
      ) : (
        <Container className="p-4 p-lg-5">
          <Row className="pt-1 pt-lg-3 gap-4 gap-lg-0">
            {/* Service and Payment Status Card */}
            <Col lg={8}>
              <Card style={{ borderRadius: "15px" }}>
                <Card.Header className="p-3 ps-4 pe-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 fw-semibold text-dark fs-6">Services Availed: {appointment.servicesId.length}</p>
                  </div>
                </Card.Header>
                <Card.Body className="p-2 ps-4 pe-4">
                  {/* Services View */}
                  <Row>
                    <Table responsive className="align-middle">
                      <tbody>
                        {/* BACKEND HERE:  Service Name, Description, Price*/}
                        {appointment.servicesId.map((service, index) => (
                          <tr key={index}>
                            <td className="text-start" style={{ width: "70%" }}>
                              <p className="fw-semibold mb-0">{service.name}</p>
                              <p className="small text-secondary mb-0">{service.description}</p>
                            </td>
                            <td className="text-end" style={{ width: "30%" }}>
                              <p className="small mb-0">starts at</p>
                              <p className="fw-semibold mb-0">₱ {service.price}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Row>
                </Card.Body>

                {/* Payment Information */}
                <Card.Header className="p-3 ps-4 pe-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div style={{ width: "70%" }}>
                      <p className="mb-0 fw-semibold text-dark fs-6">
                        {appointment.status === "Pending" ? <span className="text-danger">Estimated </span> : ""} Total
                        Service Amount
                      </p>
                      {appointment.paymentTerm === "Partial" ? (
                        <p className="small text-secondary mb-0 responsive-text">Partial Payment Term</p>
                      ) : (
                        <p className="small text-secondary mb-0 responsive-text">Full Payment Term</p>
                      )}
                      {appointment.status === "Pending" ? (
                        <p className="small text-danger mb-0 responsive-text">
                          *Price Adjustments Possible Depending on Vehicle's Case, We will notify you on email for any
                          changes before proceeding with the service.
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div style={{ width: "30%" }}>
                      <p className="fw-semibold mb-0 responsive-text text-end">₱ {appointment.startingBalance}</p>
                      {appointment.status === "Pending" ? (
                        <p className="small text-danger-emphasis fw-semibold mb-0 responsive-text text-end">
                          Under Review
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="p-4 pt-2">
                  <Row className="mb-2">
                    <Table responsive className="align-middle">
                      <tbody>
                        {appointment.paymentTerm === "Full"
                          ? appointment.payments.map((payment, index) => (
                              <tr>
                                <td className="text-start" style={{ width: "50%" }}>
                                  <p className="fw-semibold mb-0">Full Payment (100%)</p>
                                </td>
                                <td className="text-start" style={{ width: "25%" }}>
                                  <p className="mb-0">₱ {payment.amount}</p>
                                </td>
                                <td className="text-end" style={{ width: "25%" }}>
                                  <p className="fw-semibold mb-0">
                                    <PaymentStatusBadge status={payment.status} />
                                  </p>
                                </td>
                              </tr>
                            ))
                          : appointment.payments.map((payment, index) => (
                              <tr>
                                <td className="text-start" style={{ width: "50%" }}>
                                  {index === 0 ? (
                                    <p className="fw-semibold mb-0">Down Payment (50%)</p>
                                  ) : index === 1 ? (
                                    <p className="fw-semibold mb-0">Half Balance (25%)</p>
                                  ) : (
                                    <p className="fw-semibold mb-0">Release Balance (25%)</p>
                                  )}
                                </td>
                                <td className="text-start" style={{ width: "25%" }}>
                                  <p className="mb-0">₱ {payment.amount}</p>
                                </td>
                                <td className="text-end" style={{ width: "25%" }}>
                                  <p className="fw-semibold mb-0">
                                    <PaymentStatusBadge status={payment.status} />
                                  </p>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </Table>
                  </Row>

                  <hr />

                  <Row>
                    <p className="fw-semibold mb-0">Appointment Note:</p>
                    <p className="small text-secondary mb-3">
                      {appointment.requests === "" ? "No additional notes" : appointment.requests}
                    </p>
                    <p className="fw-semibold mb-0">Valued Customer</p>
                    <p className="small text-secondary mb-0">
                      {appointment.firstName} {appointment.lastName}
                    </p>
                    <p className="small text-secondary mb-0">{appointment.phoneNumber}</p>
                    <p className="small text-secondary mb-0">{appointment.email}</p>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card style={{ borderRadius: "15px" }} className="mb-4">
                <Card.Body className="p-2 ps-4 pe-4">
                  <p className="mt-3 mb-1 fw-semibold text-dark fs-5">Appointment Summary</p>
                  <Table responsive borderless className="align-middle small">
                    <tbody>
                      <tr>
                        <td className="text-start ps-0 p-1">
                          <p className="text-secondary mb-0">Service Status</p>
                        </td>
                        <td className="text-end p-1">
                          <p className="fw-semibold mb-0 fs-5">
                            <StatusBadge
                              status={
                                status as
                                  | "Pending"
                                  | "Awaiting Payment"
                                  | "Cancelled"
                                  | "Ongoing"
                                  | "For Release"
                                  | "Complete"
                              }
                            />
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-start ps-0 p-1">
                          <p className="text-secondary mb-0">Appointment Date</p>
                        </td>
                        <td className="text-end p-1">
                          <p className="fw-semibold mb-0">
                            {
                              <p className="fw-semibold mb-0">
                                {new Date(appointment.date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            }
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-start ps-0 p-1">
                          <p className="text-secondary mb-0">Appointment Time</p>
                        </td>
                        <td className="text-end p-1">
                          <p className="fw-semibold mb-0">{formattedTime}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-start ps-0 p-1">
                          <p className="text-secondary mb-0">Vehicle</p>
                        </td>
                        <td className="text-end p-1">
                          <p className="fw-semibold mb-0">
                            {appointment.carManufacturer} {appointment.carModel}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-start ps-0 p-1">
                          <p className="text-secondary mb-0">Vehicle Color</p>
                        </td>
                        <td className="text-end p-1">
                          <p className="fw-semibold mb-0">{appointment.carColor}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-start ps-0 p-1">
                          <p className="text-secondary mb-0">Plate#</p>
                        </td>
                        <td className="text-end p-1">
                          <p className="fw-semibold mb-0">{appointment.plateNumber}</p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              {/* Contact Support Card */}
              <Card style={{ borderRadius: "15px" }}>
                <Card.Body className="p-2 ps-4 pe-4 text-center">
                  <p className="mt-3 fw-semibold text-dark fs-6">
                    Have Question About Your Appointment? Get In Touch With Us!
                  </p>
                  <p className="small text-secondary" style={{ textAlign: "justify" }}>
                    Our friendly owner and staff is here for questions about the status of your appointment service,
                    billing and payment, and other service related concerns.
                  </p>
                  <Button
                    variant="outline-dark"
                    className="mb-3"
                    href="https://m.me/agapaint"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Messenger className="me-2" />
                    Contact Us On Messenger
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}

      {/* Footer Here */}
      <Footer />
    </main>
  );
}

export default custPayment;
