"use client";

import React, { useEffect, useRef, useState } from "react";
import saleStyles from "@/styles/adminSales.module.scss";
import { Container, Row, Col, Card, Button, Table, Pagination } from "react-bootstrap";

//component
import AdminHeader from "@/components/AdminHeader";
import PlaceholderRow from "@/components/PlaceholderRow";

//icons
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";

//line graph
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

//date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StatusBadge from "@/components/StatusBadge";

// utitlities
import axios from "axios";
import { Appointment } from "@/types";

// month picker
import { MonthPicker, MonthInput } from "react-lite-month-picker";

function AdminSales() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  //date picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // month picker
  const currentDate = new Date();
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  // Show all records
  const [showAll, setShowAll] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); //set the limit of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];
  for (let i = 1; i <= Math.ceil(appointments.length / itemsPerPage); i++) {
    pages.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000], // x-axis labels aka Revenue
          datasets: [
            {
              label: "Appointments",
              data: [20, 30, 20, 60, 50, 30, 40, 10, 40, 10], // y axis aka Appointments count
              backgroundColor: "rgba(71, 225, 167, 1)",
              borderColor: "rgb(71, 225, 167)",
              pointBackgroundColor: "var(--agapaint-blue)",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Revenue",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Appointments",
              },
            },
          },
        },
      });
    }
    axios.get("/api/appointment").then((res) => {
      const completedAppointments = res.data.filter((appointment) => appointment.status === "Complete");
      setAppointments(completedAppointments);
      setLoading(false);
    });
    setCurrentPage(1);
  }, []);

  return (
    <main className="agapaint-bg">
      <Container fluid className="p-4 min-vh-100">
        {/* Admin Header */}
        <AdminHeader
          title="Service Revenue Report"
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
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    className={saleStyles.datePicker}
                  />
                </Col>
                <Col md="auto">
                  <label>To: &nbsp;</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    className={saleStyles.datePicker}
                  />
                </Col>
              </Row>
              <canvas ref={chartRef} />
            </Col>
          </Row>
        </div>

        {/* Generate Revenue for the Month - header and button */}
        <Row>
          <Col lg={8}>
            <div className="mt-1 d-flex align-items-center">
              <h3 style={{ marginRight: "20px" }}>
                <b>Service Revenue Report</b>
              </h3>
              {/* Month Picker */}
              {isPickerOpen ? (
                <div style={{ position: "relative", zIndex: 9999 }}>
                  <MonthPicker
                    setIsOpen={setIsPickerOpen}
                    selected={selectedMonthData}
                    onChange={(monthData) => {
                      setSelectedMonthData(monthData);
                      setShowAll(false);
                    }}
                    bgColorMonthActive="#f1b038"
                    size="small"
                  />
                </div>
              ) : null}
              <MonthInput
                selected={selectedMonthData}
                setShowMonthPicker={setIsPickerOpen}
                showMonthPicker={isPickerOpen}
                size="small"
              />
              {/* All Records */}
              <Button variant="secondary" className="ms-2 align-self-start p-2" onClick={() => setShowAll(true)}>
                All Records
              </Button>
            </div>
          </Col>

          <Col lg={4} className="d-flex justify-content-end">
            <div className="d-flex align-items-center gap-2 justify-content-end">
              {/* Pagination */}
              <Pagination className="secondary-pagination m-0 me-1">
                <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                {pages}
                <Pagination.Next
                  disabled={currentPage === pages.length}
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </Pagination>
              <Button
                variant="warning"
                className={`${saleStyles.generateButton}`}
                style={{ height: "50px", width: "auto" }}
              >
                <MdFileDownload /> Download Report
              </Button>
            </div>
          </Col>
        </Row>

        {/* Table  */}
        <Row>
          <Col>
            <Card className="border-0 mt-2" style={{ borderRadius: "10px" }}>
              <Card.Body className="p-2 pb-0 pt-0">
                <Table hover className="align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Plate#</th>

                      <th>Service Status</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      // Placeholder Component
                      <PlaceholderRow col="6" />
                    ) : (
                      // Render the actual data
                      currentAppointments
                        .filter((appointment: Appointment) => {
                          // All Records
                          if (showAll) {
                            return appointment.status === "Complete";
                          }
                          // Filter by selected month
                          const date = new Date(appointment.date);
                          return (
                            appointment.status === "Complete" &&
                            date.getMonth() + 1 === selectedMonthData.month &&
                            date.getFullYear() === selectedMonthData.year
                          );
                        })
                        .map((appointment: Appointment, index) => {
                          const date = new Date(appointment.date);
                          const formattedDate = `${date.toLocaleString("default", {
                            month: "long",
                          })} ${date.getDate()}, ${date.getFullYear()}`;

                          return (
                            <tr key={appointment._id}>
                              <td className="fw-medium">{index + 1}</td>
                              <td>{formattedDate}</td>
                              <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                              <td>{appointment.plateNumber}</td>
                              <td>
                                <StatusBadge status="Complete" />
                              </td>
                              <td className="fw-semibold">₱{appointment.startingBalance}</td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Another Pagination */}
            <Row className="mt-3">
              <div className="ms-auto d-flex gap-2 align-items-center justify-content-end">
                {/* Pagination */}
                <Pagination className="secondary-pagination">
                  <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                  {pages}
                  <Pagination.Next
                    disabled={currentPage === pages.length}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </Pagination>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default AdminSales;
