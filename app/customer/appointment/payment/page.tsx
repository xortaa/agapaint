"use client";
import { Container, Row, Col, Image, Table, Badge, InputGroup, Card, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import paymentStyles from "@/styles/payment.module.scss";
import { ArrowLeft, CarFrontFill, CreditCard } from "react-bootstrap-icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Appointment, User } from "@/types";
import paymentStatusBg from "@/public/assets/img/paymentStatusBg.png";
import Footer from "@/components/CustomerFooter";
import Navbar from "@/components/CustomerNav";
import Banner from "@/components/Banner";
import StatusBadge from "@/components/StatusBadge";

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

  return (
    <main>
      {/* Navbar */}
      <Navbar />

      {/* New Banner */}
      <Banner page="payment" />

      {/* Payment Status Body */}
      <Container className="p-5 justify-content-around mb-5">
        <Row className="d-flex flex-column flex-md-row">
          <h3 className="fw-bold agapaint-yellow">Customer</h3>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <p>
              <span className="fw-bold">Name:</span> Juan Dimagiba
            </p>
            <p>
              <span className="fw-bold">Email:</span> juandimagiba@gmail.com
            </p>
          </div>
        </Row>

        <hr className="mb-4" />

        <Row>
          <Col xs={12}>
            <h3 className="fw-bold agapaint-yellow">Services Availed</h3>
            <p className="mb-4">Panel Repair, Wash Over</p>
          </Col>
          <Col xs={12}>
            <Row className="g-4 mb-3">
              <Col xs={12} md={4}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold">
                      <span className="me-2">
                        <CarFrontFill />
                      </span>
                      Sedan Kia Rio 2016
                    </Card.Title>
                    <Card.Text>Car Information</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold">
                      <span className="me-2">
                        <CreditCard />
                      </span>
                      Partial
                    </Card.Title>
                    <Card.Text>Payment Term</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold">
                      <StatusBadge status="Pending"/>
                    </Card.Title>
                    <Card.Text>Service Status</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <hr className="mb-4" />

        <Row className="d-flex mb-3">
          <Col>
            <h3 className="fw-bold agapaint-yellow">Current Total Balance</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <h3 className="fw-bold">PHP 1,300.00</h3>
          </Col>
        </Row>

        <Row className="mb-4">
          <Table responsive className="m-0 ps-3 table-borderless">
            <tbody>
              {/* Placeholder */}
              <tr className="py-5">
                <td className="fw-bold">Down payment (50%)</td>
                <td>PHP 5,200.00</td>
                <td className="text-end">
                  <Badge pill bg="success">
                    Paid
                  </Badge>
                </td>
              </tr>

              {/* Placeholder */}
              <tr className="py-3">
                <td className="fw-bold">Half Balance (25%)</td>
                <td>PHP 1,300.00</td>
                <td className="text-end">
                  <Badge pill bg="success">
                    Paid
                  </Badge>
                </td>
              </tr>

              {/* Placeholder */}
              <tr className="py-3">
                <td className="fw-bold">Release Balance (25%)</td>
                <td>PHP 1,300.00</td>
                <td className="text-end">
                  <Badge pill bg="warning" text="dark">
                    Awaiting
                  </Badge>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>

        <hr className="mb-4" />

        <Row className="d-flex mb-5">
          <Col>
            <h3 className="fw-bold agapaint-yellow">Total Service Amount</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <h3 className="fw-bold">PHP 7,800.00</h3>
          </Col>
        </Row>
      </Container>

      {/* Footer Here */}
      <Footer />
    </main>
  );
}

export default custPayment;
