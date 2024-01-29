"use client";
import { Container, Row, Col, Image, Table, Badge, InputGroup, Card, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import paymentStyles from "@/styles/payment.module.scss";
import { ArrowLeft } from "react-bootstrap-icons";

import paymentStatusBg from "@/public/assets/img/paymentStatusBg.png";

function custPayment() {
  const router = useRouter();

  const handleRowClick = () => {
    router.push("../appointment");
  };

  return (
    <main>
      {/* Payment Status header with back to profile button*/}
      <header className={paymentStyles.head}>
        <Image src={paymentStatusBg.src} alt="" />
        <div className={paymentStyles.buttonOverlay}>
          <Button variant="outline-warning" onClick={handleRowClick}>
            <span className="d-none d-md-inline">Back to Profile</span>
            <span className="d-md-none">
              <ArrowLeft size={25} />
            </span>
          </Button>
        </div>
        <div className={paymentStyles.textOverlay}>
          <h1 className={`fw-bold display-4 agapaint-yellow`}>Payment Status</h1>
          <p className="text-white">View the balance and dues of your appointment</p>
        </div>
      </header>

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

        <Row className="d-flex">
          <h3 className="fw-bold agapaint-yellow">Services Availed</h3>
          <p className="mb-4">Panel Repair, Wash Over</p>
          <Row className="d-flex justify-content-between">
            <Col xs={6} md={4} className="text-start">
              <h5 className="fw-bold agapaint-black">Car Information</h5>
              <p>Sedan Kia Rio 2016</p>
            </Col>
            <Col xs={6} md={4} className="text-start">
              <div className="d-flex flex-column align-items-start">
                <h5 className="fw-bold agapaint-black">Payment Term</h5>
                <p>Partial</p>
              </div>
            </Col>
            <Col xs={12} md={4} className="text-start">
              <div className="d-flex flex-column align-items-start">
                <h5 className="fw-bold agapaint-black">Service Status</h5>
                <Badge pill bg="primary mb-3">
                  For Release
                </Badge>
              </div>
            </Col>
          </Row>
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
    </main>
  );
}

export default custPayment;
