"use client";
import { Container, Row, Col, Image, Table, Badge, InputGroup, Card, Button } from "react-bootstrap";
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

function custPayment() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  const handleRowClick = () => {
    router.push("../appointment");
  };

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
      <Banner page="payment" />

      {/* Body */}
      <Container className="p-4 p-lg-5">
        <Row className="pt-1 pt-lg-3 gap-4 gap-lg-0">
          {/* Service and Payment Status Card */}
          <Col lg={8}>
            <Card style={{ borderRadius: "15px" }}>
              <Card.Header className="p-3 ps-4 pe-4">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 fw-semibold text-dark fs-6">Services Availed (3)</p>
                  <p className="small text-secondary mb-0 d-none d-sm-block responsive-text">Appointment # 123</p>
                </div>
              </Card.Header>
              <Card.Body className="p-2 ps-4 pe-4">
                {/* Services View */}
                <Row>
                  <Table responsive className="align-middle">
                    <tbody>
                      {/* BACKEND HERE:  Service Name, Description, Price*/}
                      <tr>
                        <td className="text-start" style={{ width: "80%" }}>
                          <p className="fw-semibold mb-0">Washover</p>
                          <p className="small text-secondary mb-0 lh-sm">lorem15</p>
                        </td>
                        <td className="text-end" style={{ width: "20%" }}>
                          <p className="fw-semibold mb-0">₱ 99999999.00</p>
                        </td>
                      </tr>
                      {/* Placeholder */}
                      <tr>
                        <td className="text-start">
                          <p className="fw-semibold mb-0">Paint Makeover</p>
                          <p className="small text-secondary mb-0">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, necessitatibus
                          </p>
                        </td>
                        <td className="text-end">
                          <p className="fw-semibold mb-0">₱ 100.00</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-start">
                          <p className="fw-semibold mb-0">Repair Panel</p>
                          <p className="small text-secondary mb-0">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit ex incidunt ad dolores
                            vitae, suscipit nobis modi mollitia velit fuga?
                          </p>
                        </td>
                        <td className="text-end">
                          <p className="fw-semibold mb-0">₱ 123456789.00</p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
              </Card.Body>

              {/* Payment Information */}
              <Card.Header className="p-3 ps-4 pe-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="mb-0 fw-semibold text-dark fs-6">Total Service Amount</p>
                    <p className="small text-secondary mb-0 responsive-text">Partial Payment Term</p>
                  </div>
                  <p className="fw-semibold mb-0 responsive-text">₱ 20,000.00</p>
                </div>
              </Card.Header>
              <Card.Body className="p-4 pt-2">
                {/* Services View */}
                <Row className="mb-2">
                  <Table responsive className="align-middle">
                    <tbody>
                      {/* BACKEND HERE:  Payment Details*/}
                      {/* IF Full Payment Term */}
                      <tr>
                        <td className="text-start" style={{ width: "50%" }}>
                          <p className="fw-semibold mb-0">Full Payment (100%)</p>
                        </td>
                        <td className="text-start" style={{ width: "25%" }}>
                          <p className="mb-0">₱ 20,000.00</p>
                        </td>
                        <td className="text-end" style={{ width: "25%" }}>
                          <p className="fw-semibold mb-0">
                            <PaymentStatusBadge status="Paid" />
                          </p>
                        </td>
                      </tr>
                      {/* ELSE Partial Payment Term */}
                      {/* Downpayment */}
                      <tr>
                        <td className="text-start" style={{ width: "50%" }}>
                          <p className="fw-semibold mb-0">Down Payment (50%)</p>
                        </td>
                        <td className="text-start" style={{ width: "25%" }}>
                          <p className="mb-0">₱ 10,000.00</p>
                        </td>
                        <td className="text-end" style={{ width: "25%" }}>
                          <p className="fw-semibold mb-0">
                            <PaymentStatusBadge status="Paid" />
                          </p>
                        </td>
                      </tr>
                      {/* Half Balance */}
                      <tr>
                        <td className="text-start" style={{ width: "50%" }}>
                          <p className="fw-semibold mb-0">Half Balance (25%)</p>
                        </td>
                        <td className="text-start" style={{ width: "25%" }}>
                          <p className="mb-0">₱ 5,000.00</p>
                        </td>
                        <td className="text-end" style={{ width: "25%" }}>
                          <p className="fw-semibold mb-0">
                            <PaymentStatusBadge status="Paid" />
                          </p>
                        </td>
                      </tr>
                      {/* Release Balance */}
                      <tr>
                        <td className="text-start" style={{ width: "50%" }}>
                          <p className="fw-semibold mb-0">Release Balance (25%)</p>
                        </td>
                        <td className="text-start" style={{ width: "25%" }}>
                          <p className="mb-0">₱ 5,000.00</p>
                        </td>
                        <td className="text-end" style={{ width: "25%" }}>
                          <p className="fw-semibold mb-0">
                            <PaymentStatusBadge status="Awaiting" />
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>

                <hr />

                <Row>
                  <p className="fw-semibold mb-0">Appointment Note:</p>
                  <p className="small text-secondary mb-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis iure ipsum molestiae non rerum illum
                    consectetur suscipit labore sed consequatur.
                  </p>
                  <p className="fw-semibold mb-0">Valued Customer</p>
                  <p className="small text-secondary mb-0">Customer Name</p>
                  <p className="small text-secondary mb-0">Customer Phone</p>
                  <p className="small text-secondary mb-0">Customer Email</p>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Appointment Summary */}
          <Col lg={4}>
            <Card style={{ borderRadius: "15px" }} className="mb-4">
              <Card.Body className="p-2 ps-4 pe-4">
                <p className="mt-3 mb-1 fw-semibold text-dark fs-5">Appointment Summary</p>
                <Table responsive borderless className="align-middle small">
                  <tbody>
                    {/* BACKEND HERE:  Apt Details*/}
                    <tr>
                      <td className="text-start ps-0 p-1">
                        <p className="text-secondary mb-0">Service Status</p>
                      </td>
                      <td className="text-end p-1">
                        <p className="fw-semibold mb-0 fs-5">
                          <StatusBadge status="Pending" />
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start ps-0 p-1">
                        <p className="text-secondary mb-0">Appointment Date</p>
                      </td>
                      <td className="text-end p-1">
                        <p className="fw-semibold mb-0">July 15, 2021</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start ps-0 p-1">
                        <p className="text-secondary mb-0">Appointment Time</p>
                      </td>
                      <td className="text-end p-1">
                        <p className="fw-semibold mb-0">10:00 AM</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start ps-0 p-1">
                        <p className="text-secondary mb-0">Vehicle</p>
                      </td>
                      <td className="text-end p-1">
                        <p className="fw-semibold mb-0">Toyota Fortuner 2022</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start ps-0 p-1">
                        <p className="text-secondary mb-0">Vehicle Color</p>
                      </td>
                      <td className="text-end p-1">
                        <p className="fw-semibold mb-0">White</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start ps-0 p-1">
                        <p className="text-secondary mb-0">Plate#</p>
                      </td>
                      <td className="text-end p-1">
                        <p className="fw-semibold mb-0">ABC 1234</p>
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
                <Button variant="outline-dark" className="mb-3" href="https://m.me/agapaint" target="_blank" rel="noopener noreferrer">
                  <Messenger className="me-2" />
                  Contact Us On Messenger
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer Here */}
      <Footer />
    </main>
  );
}

export default custPayment;
