"use client";

import React, { use, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Appointment, Material, Service, User } from "@/types";
import axios, { all } from "axios";
import { Badge, Card, Col, Container, Pagination, Row, Table } from "react-bootstrap";
import { Cart, CreditCard, PeopleFill, QuestionCircle } from "react-bootstrap-icons";

// Components
import AdminHeader from "@/components/AdminHeader";
import DashboardCards from "@/components/DashboardCards";
import DashboardWeekCards from "@/components/DashboardWeekCards";
import PlaceholderRow from "@/components/PlaceholderRow";
import NoRecordRow from "@/components/NoRecordRow";

// SCSS
import weekCardStyles from "@/styles/dashboardWeekCard.module.scss";

function Dashboard() {
  //for mat backend
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);
  const [activeMaterials, setActiveMaterials] = useState<Material[]>([]);
  const [lowStockMaterials, setLowStockMaterials] = useState<Material[]>([]);

  //for apt backend
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [activeAppointments, setActiveAppointments] = useState<Appointment[]>([]);
  const [forRelease, setForRelease] = useState<Appointment[]>([]);
  const [pending, setPending] = useState<Appointment[]>([]);
  const [ongoing, setOngoing] = useState<Appointment[]>([]);
  const [completed, setCompleted] = useState<Appointment[]>([]);
  const [awaiting, setAwaiting] = useState<Appointment[]>([]);
  const [forThisWeek, setForThisWeek] = useState<Appointment[]>([]);

  //for cards content
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [noOfServices, setNoOfServices] = useState(0);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [activeCustomers, setActiveCustomers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  //for loading effect
  const [loading, setLoading] = useState(true);

  // Calculate total revenue
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let total = 0;
        completed.forEach((apt) => {
          total += apt.startingBalance;
        });
        setTotalRevenue(total);
      } catch (error) {
        console.error("Error calculating total revenue:", error);
      }
    };

    fetchAppointments();
  }, [completed]);

  //mga pangfetch and filter
  useEffect(() => {
    const getMaterials = () => {
      axios.get("/api/material").then((res) => {
        setAllMaterials(res.data);
        setActiveMaterials(res.data.filter((material: Material) => material.isArchived === false));
      });
    };

    const getAppointments = () => {
      axios.get("/api/appointment").then((res) => {
        setAllAppointments(res.data);
        setActiveAppointments(res.data.filter((apt: Appointment) => apt.isArchived === false));
      });
    };

    const getNoOfServices = () => {
      axios.get("/api/service").then((res) => {
        setAllServices(res.data);
        setNoOfServices(res.data.length);
      });
    };

    const getCustomers = () => {
      axios.get("/api/users").then((res) => {
        setAllUsers(res.data);
        const customers = res.data.filter((user: User) => user.role === "customer");
        setActiveCustomers(customers.length);
      });
    };

    getCustomers();
    getNoOfServices();
    getMaterials();
    getAppointments();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLowStockMaterials(activeMaterials.filter((material: Material) => material.quantity <= 10));
  }, [activeMaterials]);

  useEffect(() => {
    setPending(activeAppointments.filter((apt: Appointment) => apt.status === "Pending"));
    setOngoing(activeAppointments.filter((apt: Appointment) => apt.status === "Ongoing"));
    setForRelease(activeAppointments.filter((apt: Appointment) => apt.status === "For Release"));
    setCompleted(activeAppointments.filter((apt: Appointment) => apt.status === "Complete"));
    setAwaiting(activeAppointments.filter((apt: Appointment) => apt.status === "Awaiting Payment"));
    setForThisWeek(
      activeAppointments.filter((apt: Appointment) => apt.date === new Date().toLocaleDateString("en-US"))
    );

    //Filter the appointments so it returns only today and onwards for this week
    // Calculate the start of the current week (Sunday) and end of the week (Saturday)
    const todayMidnight = new Date();
    const startOfWeek = new Date(
      todayMidnight.getFullYear(),
      todayMidnight.getMonth(),
      todayMidnight.getDate() - todayMidnight.getDay()
    );
    const endOfWeek = new Date(
      todayMidnight.getFullYear(),
      todayMidnight.getMonth(),
      todayMidnight.getDate() - todayMidnight.getDay() + 6
    );

    // Filter appointments for todayMidnight and onwards for the rest of the week
    const filteredAppointments = activeAppointments.filter((apt) => {
      const aptDate = new Date(apt.date);

      aptDate.setHours(0, 0, 0, 0); // Set the time to midnight
      todayMidnight.setHours(0, 0, 0, 0); // Set todayMidnight's date to midnight

      return aptDate >= todayMidnight && aptDate <= endOfWeek;
    });

    // Sort appointments by date
    filteredAppointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Update state or display the appointments
    setForThisWeek(filteredAppointments);
  }, [activeAppointments]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 3;

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = forThisWeek.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const totalPages = Math.ceil(forThisWeek.length / appointmentsPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  //for the doughnut chart
  useEffect(() => {
    const cty = document.getElementById("doughnutChart") as HTMLCanvasElement;
    if (cty) {
      cty.width = 250;
      cty.height = 250;

      const ctx = cty.getContext("2d");
      if (ctx) {
        const existingChart = Chart.getChart(cty);
        if (existingChart) {
          existingChart.destroy();
        }

        const hasData = pending.length > 0 || awaiting.length > 0 || ongoing.length > 0 || completed.length > 0;

        const data = hasData ? [pending.length, awaiting.length, ongoing.length, completed.length] : [0.5]; // Placeholder value

        const backgroundColor = hasData ? ["#dc3545", "#6c757d", "#ffc107", "#28a745"] : ["#CCCCCC"]; // Placeholder color

        const myDoughnutChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            datasets: [
              {
                data: data,
                label: "Number of appointments",
                backgroundColor: backgroundColor,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const labelIndex = context.dataIndex;
                    const labelValue = data[labelIndex];
                    return labelValue === 0.5 ? "No Appointments" : `Number of appointments: ${labelValue}`;
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [pending, awaiting, ongoing, completed]);

  return (
    <main className="agapaint-bg">
      <Container fluid className="p-4 min-vh-100">
        <AdminHeader
          title="Welcome to Dashboard!"
          subtitle="View to quickly check the status of appointment and inventory for the week"
        />

        {/* col for this week cards, low-mat table, and overview cards */}
        <Row className="mt-2">
          <Col sm={9}>
            {/* row for this week cards */}
            <Col sm={12} lg={12} md={12} xl={12}>
              <div className="mb-2" style={{ backgroundColor: "#FFC94D", borderRadius: "5px" }}>
                <h5 className="py-1 ps-2">This Week</h5>
              </div>
            </Col>
            {currentAppointments.length > 0 ? (
              <div
                className={weekCardStyles.row_wrapper}
                style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
              >
                {currentAppointments.map((apt: Appointment) => (
                  <DashboardWeekCards
                    key={apt._id}
                    date={apt.date}
                    time={apt.time}
                    name={apt.firstName + " " + apt.lastName}
                    carInfo={apt.carManufacturer + " " + apt.carModel + " • " + apt.plateNumber}
                  />
                ))}
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <table>
                  <tbody>
                    <tr>
                      <NoRecordRow colSpan={12} message="No appointments for this week." />
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="d-flex align-items-center justify-content-end mt-2">
              {/* Pagination */}
              <Pagination className="secondary-pagination" size="sm">
                <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                {pages}
                <Pagination.Next
                  disabled={currentPage === Math.ceil(forThisWeek.length / appointmentsPerPage)}
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </Pagination>
            </div>

            {/* row for overview: low-mat table and overview cards */}
            <Row className="mt-1">
              <Col sm={12} lg={12} md={12} xl={12}>
                <div className="mb-2" style={{ backgroundColor: "#FFC94D", borderRadius: "5px" }}>
                  <h5 className="py-1 ps-2">Overview</h5>
                </div>
              </Col>

              {/* row for overview, col for low-mat table only */}
              <Col sm={8}>
                <Card className="p-2">
                  <Col>
                    <h5 className="mb-0 pt-2 ps-2">Low Material List</h5>
                    <small className="text-muted pt-2 ps-2">
                      An overview of the list of materials that are currently considered to be low on stock.
                    </small>
                    {/* reminder: this view allows the admin to see a scroll bar if marami na nakalista */}
                    <Card
                      className="border-0 rounded pb-2 mt-3"
                      style={{ height: currentAppointments.length > 0 ? "334px" : "328px", overflow: "auto" }}
                    >
                      <Table striped hover className="align-middle responsive">
                        <thead>
                          <tr>
                            <th>Material Name</th>
                            <th>Category</th>
                            <th>Current Stock</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Placeholder Component */}
                          {loading ? (
                            <PlaceholderRow col="3" />
                          ) : lowStockMaterials.length > 0 ? (
                            [...lowStockMaterials].reverse().map((material: Material, index) => (
                              <tr key={material._id}>
                                <td>{material.name}</td>
                                <td>
                                  <Badge pill bg="danger-subtle" text="dark">
                                    {material.category.name}
                                  </Badge>
                                </td>
                                <td className="text-danger fw-semibold">{material.quantity}</td>
                              </tr>
                            ))
                          ) : (
                            <NoRecordRow colSpan={3} message="Looks like all your materials are still sufficient!" />
                          )}
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Card>
              </Col>

              {/* row of overview, col for overview cards like total rev, etc */}
              <Col sm={4} className="m-0 ps-0 pe-3">
                <DashboardCards
                  cardTitle="Total Revenue (₱)"
                  count={totalRevenue.toFixed(2)}
                  logo={<CreditCard size={32} />}
                />
                <DashboardCards
                  cardTitle="Services Available"
                  count={noOfServices.toString()}
                  logo={<Cart size={32} />}
                />
                <DashboardCards
                  cardTitle="Customers"
                  count={activeCustomers.toString()}
                  logo={<PeopleFill size={32} />}
                />
              </Col>
            </Row>
          </Col>

          {/* col for appointments section */}
          <Col sm={3}>
            <Row>
              <div className="mb-2 p-0" style={{ backgroundColor: "#FFC94D", borderRadius: "5px" }}>
                <h5 className="pt-1 ps-2 pb-0">Appointments</h5>
              </div>
              <Card style={{ backgroundColor: "#f4f7f9" }}>
                <Card.Body className="px-0 py-2">
                  <Row className="pb-1">
                    <Col>
                      {/* displays the doughnut chart */}
                      <canvas
                        id="doughnutChart"
                        className="p-0 m-0"
                        style={{ width: "250px", height: "250px" }}
                      ></canvas>
                    </Col>
                  </Row>

                  {/* row below is created solely for custom legends, numbers represent total of appointments per class: 
                  total pending, etc */}
                  <Row className="mt-2">
                    <Col>
                      <Row className="mb-2">
                        <Col className="d-flex align-items-center text-muted">
                          <Card className="me-1 bg-danger text-white border-0">
                            <Card.Body className="px-2 py-1 text-center">
                              <h6 className="fw-bold p-0 m-0">{pending.length}</h6>
                            </Card.Body>
                          </Card>
                          Pending
                        </Col>
                        <Col className="d-flex align-items-center text-muted">
                          <Card className="me-1 text-white border-0" style={{ backgroundColor: "#6c757d" }}>
                            <Card.Body className="px-2 py-1 text-center">
                              <h6 className="fw-bold p-0 m-0">{awaiting.length}</h6>
                            </Card.Body>
                          </Card>
                          Awaiting
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-flex align-items-center text-muted">
                          <Card className="me-1 bg-warning text-white border-0">
                            <Card.Body className="px-2 py-1 text-center">
                              <h6 className="fw-bold p-0 m-0">{ongoing.length}</h6>
                            </Card.Body>
                          </Card>
                          Ongoing
                        </Col>
                        <Col className="d-flex align-items-center text-muted">
                          <Card className="me-1 bg-success text-white border-0">
                            <Card.Body className="px-2 py-1 text-center">
                              <h6 className="fw-bold p-0 m-0">{completed.length}</h6>
                            </Card.Body>
                          </Card>
                          Completed
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>

            {/* new row for 'for release' section under same col of appointments section */}
            <Row className="my-2">
              <Card className="p-1">
                <h5 className="pt-2 ps-2 pb-0 mb-1">Available for Release</h5>
                {/* may pascroll din to pag marami nakalista boogsh */}
                <Card
                  className="border-0"
                  style={{ height: currentAppointments.length > 0 ? "289px" : "218px", overflow: "auto" }}
                >
                  <Table className="border-none">
                    <tbody style={{ fontSize: "15px" }}>
                      {/* Placeholder Component */}
                      {loading ? (
                        <PlaceholderRow col="3" />
                      ) : forRelease.length > 0 ? (
                        [...forRelease].reverse().map((apt: Appointment, index) => (
                          <tr key={apt._id}>
                            <td>{apt.firstName + " " + apt.lastName}</td>
                            <td>{apt.carManufacturer + " " + apt.carModel}</td>
                            <td className="fw-semibold">{apt.plateNumber}</td>
                          </tr>
                        ))
                      ) : (
                        <NoRecordRow
                          colSpan={3}
                          message="You have no cars available for release yet. Mark an appointment as For Release in the appointment page to make it appear here."
                        />
                      )}
                    </tbody>
                  </Table>
                </Card>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Dashboard;
