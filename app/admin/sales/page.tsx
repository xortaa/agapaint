"use client";

import React, { useEffect, useRef } from "react";
import saleStyles from "@/styles/adminSales.module.scss";
import { Container, Row, Col, Card, Image, Button, Table } from "react-bootstrap";

//component
import AdminHeader from "@/components/AdminHeader";

//icons
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";

//line graph
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { BoxSeam } from "react-bootstrap-icons";
import ServiceStatus from "@/components/ServiceStatus";
Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

function AdminSales() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

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
      {/* Admin Header */}

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
            {/* graph */}
            <canvas ref={chartRef} />
          </Col>
        </Row>
      </div>

      {/* Generate Revenue for the Month - header and button */}
      <div className={saleStyles.container}>
        <Row>
          <Col lg={8}>
            <h1>
              <b>Generate Revenue for the Month</b>
            </h1>
          </Col>

          <Col lg={4} className="d-flex justify-content-end">
            <Button variant="0" className={saleStyles.generateButton}>
              <MdFileDownload /> Download Report
            </Button>
          </Col>
        </Row>
      </div>

      {/* Table  */}
      <div style={{paddingTop: "10px", paddingLeft: "50px", paddingRight: "50px",}}>
        <Row>
          <Col>
            <Card className="border-0 rounded">
              <Table striped hover className="align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Generated by</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date Generated</th>
                    <th>Time Generated</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="fw-bold">1</td>
                        <td>AdminLuigi</td>
                        <td>01 January 2024</td>
                        <td>01 February 2024</td>
                        <td>02 February 2024</td>
                        <td>11:59 AM</td>
                    </tr>

                    <tr>
                        <td className="fw-bold">2</td>
                        <td>AdminJean</td>
                        <td>01 June 2024</td>
                        <td>01 July 2024</td>
                        <td>02 July 2024</td>
                        <td>11:11 AM</td>
                    </tr>

                    <tr>
                        <td className="fw-bold">3</td>
                        <td>AdminLuigi</td>
                        <td>01 November 2024</td>
                        <td>01 December 2024</td>
                        <td>02 December 2024</td>
                        <td>11:13 AM</td>
                    </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AdminSales;
