"use client";

import React, { useEffect, useRef, useState } from "react";
import saleStyles from "@/styles/adminSales.module.scss";
import { Container, Row, Col, Card, Button, Table, Pagination } from "react-bootstrap";

//component
import AdminHeader from "@/components/AdminHeader";
import PlaceholderRow from "@/components/PlaceholderRow";
import NoRecordRow from "@/components/NoRecordRow";

//icons
import { FaRegCalendarDays } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { FaRegCreditCard } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { SortNumericDown, SortNumericDownAlt, SortAlphaDown, SortAlphaDownAlt } from "react-bootstrap-icons";

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

// CSV download
import { unparse } from "papaparse";
import { useSession } from "next-auth/react";

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
  const [itemsPerPage, setItemsPerPage] = useState(12); //set the limit of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredAppointments = showAll
    ? appointments
    : appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date); // assuming appointment.date is a Date object
        return (
          appointmentDate.getMonth() + 1 === selectedMonthData.month &&
          appointmentDate.getFullYear() === selectedMonthData.year
        );
      });

  // Sort function
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc"); // 'asc' for ascending, 'desc' for descending
  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  const sortedData = [...filteredAppointments].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    // Check if the values are numeric
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      // Convert to string if not already
      if (typeof aValue !== "string") aValue = String(aValue);
      if (typeof bValue !== "string") bValue = String(bValue);

      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  });

  const currentAppointments = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];
  for (let i = 1; i <= Math.ceil(filteredAppointments.length / itemsPerPage); i++) {
    pages.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  const { data: session } = useSession();
  const reportGeneratedTime = new Date().toLocaleString();

  // statistics
  // 1 and 2: This and Last Month's Appointments
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  const currentYear = currentDate.getFullYear();

  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const thisMonthAppointments = [];
  const lastMonthAppointments = [];

  appointments.forEach((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const appointmentMonth = appointmentDate.getMonth() + 1;
    const appointmentYear = appointmentDate.getFullYear();

    if (appointmentMonth === currentMonth && appointmentYear === currentYear) {
      thisMonthAppointments.push(appointment);
    } else if (appointmentMonth === lastMonth && appointmentYear === lastMonthYear) {
      lastMonthAppointments.push(appointment);
    }
  });

  const numberOfAppointmentsThisMonth = thisMonthAppointments.length;
  const numberOfAppointmentsLastMonth = lastMonthAppointments.length;
  let percentageDifference = 0;
  if (numberOfAppointmentsLastMonth !== 0) {
    percentageDifference =
      ((numberOfAppointmentsThisMonth - numberOfAppointmentsLastMonth) / numberOfAppointmentsLastMonth) * 100;
  } else if (numberOfAppointmentsThisMonth > 0) {
    percentageDifference = 100;
  }

  // 3 and 4: This and Last Month's Revenue
  let totalRevenueThisMonth = 0;
  thisMonthAppointments.forEach((appointment) => {
    totalRevenueThisMonth += appointment.startingBalance;
  });

  let totalRevenueLastMonth = 0;
  lastMonthAppointments.forEach((appointment) => {
    totalRevenueLastMonth += appointment.startingBalance;
  });

  let revenuePercentageDifference = 0;
  if (totalRevenueLastMonth !== 0) {
    revenuePercentageDifference = ((totalRevenueThisMonth - totalRevenueLastMonth) / totalRevenueLastMonth) * 100;
  } else if (totalRevenueThisMonth > 0) {
    revenuePercentageDifference = 100;
  }

  //line chaert
  useEffect(() => {
    axios
      .get("/api/appointment")
      .then((res) => {
        const completedAppointments = res.data.filter((appointment) => appointment.status === "Complete");
        setAppointments(completedAppointments);

        const monthlyRevenue = Array.from({ length: 12 }, () => 0);
        completedAppointments.forEach((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const appointmentMonth = appointmentDate.getMonth();
          monthlyRevenue[appointmentMonth] += appointment.startingBalance;
        });

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(chartRef.current, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Monthly Revenue",
                data: monthlyRevenue,
                backgroundColor: "rgba(71, 225, 167, 0.5)",
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
                  text: "Month",
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Revenue",
                },
              },
            },
          },
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointment data:", error);
        setLoading(false);
      });

    setCurrentPage(1);
  }, []);

  // year picker
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    axios
      .get("/api/appointment")
      .then((res) => {
        const completedAppointments = res.data.filter((appointment) => appointment.status === "Complete");
        setAppointments(completedAppointments);

        const monthlyRevenue = Array.from({ length: 12 }, () => 0);
        completedAppointments.forEach((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const appointmentYear = appointmentDate.getFullYear();
          const appointmentMonth = appointmentDate.getMonth();
          if (appointmentYear === selectedYear) {
            // Only add revenue for the selected year
            monthlyRevenue[appointmentMonth] += appointment.startingBalance;
          }
        });

        // Update chart data with monthly revenue for the selected year
        if (chartInstance.current) {
          chartInstance.current.data.datasets[0].data = monthlyRevenue;
          chartInstance.current.update();
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointment data:", error);
        setLoading(false);
      });

    setCurrentPage(1);
  }, [selectedYear]); // Update chart data when the selected year changes

  return (
    <main className="agapaint-bg">
      <Container fluid className="p-4 min-vh-100">
        {/* Admin Header */}
        <AdminHeader
          title="Operating Service Revenue Report"
          subtitle="View all your operating service revenue from completed appointments"
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
                          <Card.Text className={saleStyles.cardBody}>{numberOfAppointmentsThisMonth}</Card.Text>
                        </Col>

                        <Col lg={4}>
                          <Card.Text className={saleStyles.percentGreen}>
                            <IoMdArrowDropup size="2em" /> {percentageDifference}%
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
                          <Card.Text className={saleStyles.cardBody}>₱ {totalRevenueThisMonth.toFixed(2)}</Card.Text>
                        </Col>

                        <Col lg={4}>
                          <Card.Text
                            className={
                              revenuePercentageDifference >= 0 ? saleStyles.percentGreen : saleStyles.percentRed
                            }
                          >
                            {revenuePercentageDifference >= 0 ? (
                              <IoMdArrowDropup size="2em" />
                            ) : (
                              <IoMdArrowDropdown size="2em" />
                            )}
                            {Math.abs(revenuePercentageDifference)}%
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
                          <Card.Text className={saleStyles.cardBody}>{numberOfAppointmentsLastMonth}</Card.Text>
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
                          <Card.Text className={saleStyles.cardBody}>₱ {totalRevenueLastMonth.toFixed(2)}</Card.Text>
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
                  <select value={selectedYear} onChange={handleYearChange} className={saleStyles.yearPicker}>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
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
              <Button
                variant={showAll ? "success" : "secondary"}
                className="ms-2 align-self-start p-2"
                onClick={() => setShowAll(true)}
              >
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
                onClick={() => {
                  const totalAmount = currentAppointments.reduce(
                    (total, appointment) => total + appointment.startingBalance,
                    0
                  );
                  // Convert appointments to CSV data
                  const csvData = unparse([
                    ...currentAppointments.map((appointment: Appointment, index) => {
                      const date = new Date(appointment.date);
                      const formattedDate = `${date.toLocaleString("default", {
                        month: "long",
                      })} ${date.getDate()}, ${date.getFullYear()}`;

                      return {
                        "#": `#${appointment.nanoid}`,
                        Date: formattedDate,
                        Name: `${appointment.firstName} ${appointment.lastName}`,
                        "Plate Number": appointment.plateNumber,
                        Status: "Complete",
                        "Total Amount": `${appointment.startingBalance.toFixed(2)}`,
                      };
                    }),
                    {
                      "#": "",
                      Date: "",
                      Name: "",
                      "Plate Number": "",
                      Status: "Total",
                      "Total Amount": `${totalAmount.toFixed(2)}`,
                    },
                    {
                      "#": showAll
                        ? `---End of Agapaint Service Revenue Report for all records---`
                        : `---End of Agapaint Service Revenue Report for the month of ${selectedMonthData.month}/${selectedMonthData.year}---`,
                      Date: "",
                      Name: "",
                      "Plate Number": "",
                      Status: "",
                      "Total Amount": "",
                    },
                    {
                      "#": `--This report is generated by ${session?.user?.name} on ${reportGeneratedTime}--`,
                      Date: "",
                      Name: "",
                      "Plate Number": "",
                      Status: "",
                      "Total Amount": "",
                    },
                  ]);

                  // Create a download link
                  const csvBlob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
                  const csvUrl = URL.createObjectURL(csvBlob);
                  const link = document.createElement("a");
                  link.href = csvUrl;
                  link.setAttribute("download", `Agapaint_ServiceRevenue_Report_${selectedMonthData.month}/${selectedMonthData.year}.csv`);
                  link.click();
                }}
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
                      <th>
                        Date
                        <span onClick={() => handleSort("date")}>
                          {sortField === "date" ? (
                            sortDirection === "asc" ? (
                              <SortNumericDown className="text-success" />
                            ) : (
                              <SortNumericDownAlt className="text-danger" />
                            )
                          ) : (
                            <SortNumericDown className="text-secondary" />
                          )}
                        </span>
                      </th>
                      <th>
                        Customer
                        <span onClick={() => handleSort("firstName")}>
                          {sortField === "firstName" ? (
                            sortDirection === "asc" ? (
                              <SortAlphaDown className="text-success" />
                            ) : (
                              <SortAlphaDownAlt className="text-danger" />
                            )
                          ) : (
                            <SortAlphaDown className="text-secondary" />
                          )}
                        </span>
                      </th>
                      <th>Plate#</th>
                      <th>Service Status</th>
                      <th>
                        Total Amount{" "}
                        <span onClick={() => handleSort("startingBalance")}>
                          {sortField === "startingBalance" ? (
                            sortDirection === "asc" ? (
                              <SortNumericDown className="text-success" />
                            ) : (
                              <SortNumericDownAlt className="text-danger" />
                            )
                          ) : (
                            <SortNumericDown className="text-secondary" />
                          )}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      // Placeholder Component
                      <PlaceholderRow col="6" />
                    ) : // Render the actual data
                    currentAppointments.length > 0 ? (
                      currentAppointments.map((appointment: Appointment, index) => {
                        const date = new Date(appointment.date);
                        const formattedDate = `${date.toLocaleString("default", {
                          month: "long",
                        })} ${date.getDate()}, ${date.getFullYear()}`;

                        return (
                          <tr key={appointment._id}>
                            <td className="fw-medium">#{appointment.nanoid}</td>
                            <td>{formattedDate}</td>
                            <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                            <td>{appointment.plateNumber}</td>
                            <td>
                              <StatusBadge status="Complete" />
                            </td>
                            <td className="fw-semibold">₱{appointment.startingBalance.toFixed(2)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <NoRecordRow
                        colSpan={6}
                        message="Appointments that are complete in service and payment will show here"
                      />
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
