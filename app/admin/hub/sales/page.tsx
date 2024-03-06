"use client";

import React, { useEffect, useRef, useState } from "react";
import saleStyles from "@/styles/adminSales.module.scss";
import { Container, Row, Col, Card, Image, Button, Table } from "react-bootstrap";

//component
import AdminHeader from "@/components/AdminHeader";
import ServiceStatus from "@/components/ServiceStatus";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import ErrorAlert from "@/components/alerts/ErrorAlert";

//icons
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";

//line graph
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { BoxSeam } from "react-bootstrap-icons";
Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

//date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdminSales() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  //date picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: [0, 10, 20, 30, 40, 50, 60], // Replace with your labels
          datasets: [
            {
              label: "Appointments",
              data: [20, 30, 20, 60, 50, 30, 40], // Replace with your data for Appointments
              backgroundColor: "rgba(71, 225, 167, 1)",
              borderColor: "rgb(71, 225, 167)",
              pointBackgroundColor: "var(--agapaint-blue)",
              borderWidth: 1,
              fill: true,
            },
            {
              label: "Revenue",
              data: [10, 20, 10, 50, 60, 20, 30], // Replace with your data for Revenue
              backgroundColor: "rgba(194, 116, 161, 1)",
              borderColor: "rgb(194, 116, 161)",
              pointBackgroundColor: "var(--agapaint-pink)",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  function setShowComponent(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  function setMuShow(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Container fluid className="p-4 min-vh-100">
        {/* Admin Header */}
        <AdminHeader
          title="Generate Service Revenue"
          subtitle="View all your service revenue from completed appointments"
        />

        {/* Side Navbar */}

        <div className={saleStyles.container}>
          <Row>
            <Col lg={6}>
              {/* Row 1 of card = this months appointments/revenue/sales */}
              <Row>
                <Col lg={6}>
                  <Card className={saleStyles.card}>
                    <Card.Body>
                      <Card.Title className={saleStyles.cardTitle}>
                        <FaRegCalendarDays />
                        &nbsp; This Month's Appointments
                      </Card.Title>

                      {/* # - % */}
                      <Row>
                        <Col lg={8}>
                          <Card.Text className={saleStyles.cardBody}>101</Card.Text>
                        </Col>

                        <Col lg={4}>
                          <Card.Text className={saleStyles.percentGreen}>
                            <IoMdArrowDropup size="2em" /> 32%
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={6}>
                  <Card className={saleStyles.card}>
                    <Card.Body>
                      <Card.Title className={saleStyles.cardTitle}>
                        <FaRegCreditCard />
                        &nbsp; This Month's Revenue
                      </Card.Title>
                      {/* php - % */}
                      <Row>
                        <Col lg={8}>
                          <Card.Text className={saleStyles.cardBody}>₱ 9990.00</Card.Text>
                        </Col>

                        <Col lg={4}>
                          <Card.Text className={saleStyles.percentRed}>
                            <IoMdArrowDropdown size="2em" /> 32%
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Row 2 of card = last months appointments/revenue/sales */}
              <Row style={{ paddingTop: "20px" }}>
                <Col lg={6}>
                  <Card className={saleStyles.card}>
                    <Card.Body>
                      <Card.Title className={saleStyles.cardTitle}>
                        <FaRegCalendarDays />
                        &nbsp; Last Month's Appointments
                      </Card.Title>
                      {/* php - % */}
                      <Row>
                        <Col lg={8}>
                          <Card.Text className={saleStyles.cardBody}>98</Card.Text>
                        </Col>

                        <Col lg={4}>
                          <Card.Text className={saleStyles.percentRed}>
                            <IoMdArrowDropdown size="2em" /> 32%
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={6}>
                  <Card className={saleStyles.card}>
                    <Card.Body>
                      <Card.Title className={saleStyles.cardTitle}>
                        <FaRegCreditCard />
                        &nbsp; Last Month's Revenue
                      </Card.Title>

                      {/* php - % */}
                      <Row>
                        <Col lg={8}>
                          <Card.Text className={saleStyles.cardBody}>₱ 11990.00</Card.Text>
                        </Col>

                        <Col lg={4}>
                          <Card.Text className={saleStyles.percentGreen}>
                            <IoMdArrowDropup size="2em" color="green" /> 32%
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col lg={6}>
              <Row className="justify-content-end">
                <Col md="auto">
                  <label>From: &nbsp;</label>
                  <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} className={saleStyles.datePicker} />
                </Col>
                <Col md="auto">
                  <label>To: &nbsp;</label>
                  <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} className={saleStyles.datePicker} />
                </Col>
              </Row>
              <canvas ref={chartRef} />
            </Col>
          </Row>
        </div>

        {/* Generate Revenue for the Month - header and button */}
        <Row>
          <Col lg={8}>
            <h3 style={{ paddingTop: "30px" }}>
              <b>Generate Revenue for the Month</b>
            </h3>
          </Col>

          <Col lg={4} className="d-flex justify-content-end">
            <Button
              variant="0"
              className={saleStyles.generateButton}
              style={{ height: "50px", width: "auto", marginTop: "20px" }}
            >
              <MdFileDownload /> Download Report
            </Button>
          </Col>
        </Row>

        {/* Alerts */}
        <Row className="ps-2 pe-2 mt-3">
          <SuccessAlert title="Service Revenue File" action="downloading" />
          <ErrorAlert title="Downloading Service Revenue File" />
        </Row>

        {/* Table  */}
        <Row>
          <Col>
            <Card className="border-0 rounded">
              <Table striped hover className="align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Plate#</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Total Service</th>
                    <th>Service Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={() => setShowComponent(true)}>
                    <td className="fw-bold">1</td>
                    <td>Nik Makino</td>
                    <td>NIK 456</td>
                    <td>November 15, 2023</td>
                    <td>11:00 AM</td>
                    <td>P10,000</td>
                    <td>
                      <ServiceStatus width="50%" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminSales;
