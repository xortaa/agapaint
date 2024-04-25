"use client";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Table,
  Badge,
  InputGroup,
  Card,
  Button,
  Alert,
  Dropdown,
  Modal,
  Pagination,
} from "react-bootstrap";
import {
  Funnel,
  Search,
  BoxSeam,
  SortAlphaDown,
  SortAlphaDownAlt,
  SortNumericDown,
  SortNumericDownAlt,
} from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ServiceStatus from "@/components/ServiceStatus";
import PaymentStatus from "@/components/PaymentStatus";
import AdminHeader from "@/components/AdminHeader";
import AptDetails from "@/components/AptDetails";
import AptMaterial from "@/components/AptMaterial";
import { Appointment, AppointmentData } from "@/types";
import axios from "axios";
import ToastPromise from "@/components/ToastPromise";
import PlaceholderRow from "@/components/PlaceholderRow";
import NoRecordRow from "@/components/NoRecordRow";

function manageAppointment() {
  // Show Appointment Detail
  const [showComponent, setShowComponent] = useState<Appointment | null>(null);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [activeAppointments, setActiveAppointments] = useState<Appointment[]>([]);
  const [confirmedApppointments, setConfirmedAppointments] = useState<Appointment[]>([]);
  const [awaitingAppointments, setAwaitingAppointments] = useState<Appointment[]>([]);
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("tr") && event.target.closest("Card")) {
        setShowComponent(null);
      }
    };

    const getAppointments = () => {
      axios.get("/api/appointment").then((res) => {
        setAllAppointments(res.data);
        setActiveAppointments(res.data.filter((apt: Appointment) => apt.isArchived === false));
        setLoading(false);
      });
    };

    getAppointments();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setConfirmedAppointments(
      activeAppointments.filter((apt: Appointment) => apt.status !== "Pending" && apt.status !== "Awaiting Payment")
    );
    setAwaitingAppointments(activeAppointments.filter((apt: Appointment) => apt.status === "Awaiting Payment"));
    setPendingAppointments(activeAppointments.filter((apt: Appointment) => apt.status === "Pending"));
  }, [activeAppointments]);

  // Material Used Modal
  const [muShow, setMuShow] = useState<Appointment | null>(null);

  // Service Status
  const [showAptMaterial, setShowAptMaterial] = useState(false);
  const handleCloseModal = () => {
    setMuShow(null);
    setShowAptMaterial(false);
  };

  // CONFIRMED APT: Search, Sort, Pagination
  // search function
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  const filteredData = confirmedApppointments.filter((apt) =>
    Object.values(apt).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort function
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' for ascending, 'desc' for descending
  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  const sortedData = [...filteredData].sort((a, b) => {
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

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); //set the limit of items per page
  const indexOfLastItem = (currentPage - 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem;
  // eto na laman nung table final final
  const reversedAppointments = [...sortedData].reverse();
  const currentConfirmedItems = reversedAppointments.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const totalPages = Math.ceil(reversedAppointments.length / itemsPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    // Always render the first page, the last page, the current page, and two pages around the current page
    if (i === 1 || i === totalPages || i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
      pages.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i}
        </Pagination.Item>
      );
    } else if (i === 2 || i === currentPage + 2) {
      pages.push(<Pagination.Ellipsis key={i} />);
    }
  }

  // AWAITING APT: Search, Sort, Pagination
  // search function
  const [searchTermAwa, setSearchTermAwa] = useState("");
  const handleSearchChangeAwa = (event) => {
    setSearchTermAwa(event.target.value);
    setCurrentPageAwa(1);
  };
  const filteredDataAwa = awaitingAppointments.filter((apt) =>
    Object.values(apt).some((value) => value.toString().toLowerCase().includes(searchTermAwa.toLowerCase()))
  );

  // Sort function
  const [sortFieldAwa, setSortFieldAwa] = useState(null);
  const [sortDirectionAwa, setSortDirectionAwa] = useState("asc"); // 'asc' for ascending, 'desc' for descending
  const handleSortAwa = (field) => {
    setSortFieldAwa(field);
    setSortDirectionAwa(sortDirectionAwa === "asc" ? "desc" : "asc");
  };
  const sortedDataAwa = [...filteredDataAwa].sort((a, b) => {
    if (!sortFieldAwa) return 0;

    let aValueAwa = a[sortFieldAwa];
    let bValueAwa = b[sortFieldAwa];

    // Check if the values are numeric
    if (!isNaN(aValueAwa) && !isNaN(bValueAwa)) {
      return sortDirectionAwa === "asc" ? aValueAwa - bValueAwa : bValueAwa - aValueAwa;
    } else {
      // Convert to string if not already
      if (typeof aValueAwa !== "string") aValueAwa = String(aValueAwa);
      if (typeof bValueAwa !== "string") bValueAwa = String(bValueAwa);

      return sortDirectionAwa === "asc" ? aValueAwa.localeCompare(bValueAwa) : bValueAwa.localeCompare(aValueAwa);
    }
  });

  // pagination
  const [currentPageAwa, setCurrentPageAwa] = useState(1);
  const [itemsPerPageAwa, setItemsPerPageAwa] = useState(2); //set the limit of items per page
  const indexOfLastItemAwa = (currentPageAwa - 1) * itemsPerPageAwa;
  const indexOfFirstItemAwa = indexOfLastItemAwa;
  // eto na laman nung table final final
  const reversedAppointmentsAwa = [...sortedDataAwa].reverse();
  const currentAwaitingItems = reversedAppointmentsAwa.slice(
    indexOfFirstItemAwa,
    indexOfFirstItemAwa + itemsPerPageAwa
  );

  const totalPagesAwa = Math.ceil(reversedAppointmentsAwa.length / itemsPerPageAwa);
  const pagesAwa = [];
  for (let i = 1; i <= totalPagesAwa; i++) {
    // Always render the first page, the last page, the current page, and two pages around the current page
    if (
      i === 1 ||
      i === totalPagesAwa ||
      i === currentPageAwa ||
      i === currentPageAwa - 1 ||
      i === currentPageAwa + 1
    ) {
      pagesAwa.push(
        <Pagination.Item key={i} active={i === currentPageAwa} onClick={() => setCurrentPageAwa(i)}>
          {i}
        </Pagination.Item>
      );
    } else if (i === 2 || i === currentPageAwa + 2) {
      pagesAwa.push(<Pagination.Ellipsis key={i} />);
    }
  }

  // PENDING APT: Search, Sort, Pagination
  // search function
  const [searchTermPen, setSearchTermPen] = useState("");
  const handleSearchChangePen = (event) => {
    setSearchTermPen(event.target.value);
    setCurrentPagePen(1);
  };
  const filteredDataPen = pendingAppointments.filter((apt) =>
    Object.values(apt).some((value) => value.toString().toLowerCase().includes(searchTermPen.toLowerCase()))
  );

  // Sort function
  const [sortFieldPen, setSortFieldPen] = useState(null);
  const [sortDirectionPen, setSortDirectionPen] = useState("asc"); // 'asc' for ascending, 'desc' for descending
  const handleSortPen = (field) => {
    setSortFieldPen(field);
    setSortDirectionPen(sortDirectionPen === "asc" ? "desc" : "asc");
  };
  const sortedDataPen = [...filteredDataPen].sort((a, b) => {
    if (!sortFieldPen) return 0;

    let aValue = a[sortFieldPen];
    let bValue = b[sortFieldPen];

    // Check if the values are numeric
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortDirectionPen === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      // Convert to string if not already
      if (typeof aValue !== "string") aValue = String(aValue);
      if (typeof bValue !== "string") bValue = String(bValue);

      return sortDirectionPen === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  });

  // pagination
  const [currentPagePen, setCurrentPagePen] = useState(1);
  const [itemsPerPagePen, setItemsPerPagePen] = useState(8); //set the limit of items per page
  const indexOfLastItemPen = (currentPagePen - 1) * itemsPerPagePen;
  const indexOfFirstItemPen = indexOfLastItemPen;
  // eto na laman nung table final final
  const reversedAppointmentsPen = [...sortedDataPen].reverse();
  const currentPendingItems = reversedAppointmentsPen.slice(indexOfFirstItemPen, indexOfFirstItemPen + itemsPerPagePen);

  const totalPagesPen = Math.ceil(reversedAppointmentsPen.length / itemsPerPagePen);
  const pagesPen = [];
  for (let i = 1; i <= totalPagesPen; i++) {
    // Always render the first page, the last page, the current page, and two pages around the current page
    if (
      i === 1 ||
      i === totalPagesPen ||
      i === currentPagePen ||
      i === currentPagePen - 1 ||
      i === currentPagePen + 1
    ) {
      pagesPen.push(
        <Pagination.Item key={i} active={i === currentPagePen} onClick={() => setCurrentPagePen(i)}>
          {i}
        </Pagination.Item>
      );
    } else if (i === 2 || i === currentPagePen + 2) {
      pagesPen.push(<Pagination.Ellipsis key={i} />);
    }
  }

  const closeDetails = () => {
    setShowComponent(null);
  };

  return (
    <main className="agapaint-bg">
      <Container fluid className="p-4 min-vh-100">
        <Row>
          {/* Side Bar Nav */}
          <ToastPromise />

          {/* Header Row */}
          <AdminHeader title="Manage Appointment" subtitle="View all your appointment" />
          {/* Search Row */}
          <CSSTransition in={true} timeout={300} classNames="slide" unmountOnExit>
            <Col>
              {/* Confirmed Appointments */}
              <Row className="mb-4 mt-4">
                <Col>
                  <div className="d-flex align-items-center">
                    <h6 className="me-auto fw-bold agapaint-yellow mb-0">Confirmed Appointments</h6>
                    <div className="d-flex justify-content-end align-items-center">
                      {/* Search */}
                      <InputGroup className="me-2 mb-2">
                        <InputGroup.Text id="basic-addon1">
                          <Search size={20} />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="basic-addon1"
                          onChange={handleSearchChange}
                          size="sm"
                        />
                      </InputGroup>
                      {/* Pagination */}
                      <Pagination className="secondary-pagination mb-2" size="sm">
                        <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                        {pages}
                        <Pagination.Next
                          disabled={currentPage === pages.length}
                          onClick={() => setCurrentPage(currentPage + 1)}
                        />
                      </Pagination>
                    </div>
                  </div>
                  <Card className="border-0 rounded">
                    <Table striped hover className="align-middle">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>
                            Customer
                            <span onClick={() => handleSort("firstName")}>
                              {sortField === "firstName" ? (
                                sortDirection === "asc" ? (
                                  <SortAlphaDownAlt className="text-danger" />
                                ) : (
                                  <SortAlphaDown className="text-success" />
                                )
                              ) : (
                                <SortAlphaDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>Plate#</th>
                          <th>
                            Date
                            <span onClick={() => handleSort("date")}>
                              {sortField === "date" ? (
                                sortDirection === "asc" ? (
                                  <SortNumericDownAlt className="text-danger" />
                                ) : (
                                  <SortNumericDown className="text-success" />
                                )
                              ) : (
                                <SortNumericDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>
                            Time{" "}
                            <span onClick={() => handleSort("time")}>
                              {sortField === "time" ? (
                                sortDirection === "asc" ? (
                                  <SortNumericDownAlt className="text-danger" />
                                ) : (
                                  <SortNumericDown className="text-success" />
                                )
                              ) : (
                                <SortNumericDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>
                            Total Service
                            <span onClick={() => handleSort("startingBalance")}>
                              {sortField === "startingBalance" ? (
                                sortDirection === "asc" ? (
                                  <SortNumericDownAlt className="text-danger" />
                                ) : (
                                  <SortNumericDown className="text-success" />
                                )
                              ) : (
                                <SortNumericDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>
                            Service Status
                            <span onClick={() => handleSort("status")}>
                              {sortField === "status" ? (
                                sortDirection === "asc" ? (
                                  <SortAlphaDownAlt className="text-danger" />
                                ) : (
                                  <SortAlphaDown className="text-success" />
                                )
                              ) : (
                                <SortAlphaDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>INV</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Placeholder Component */}
                        {loading ? (
                          <PlaceholderRow col="8" />
                        ) : currentConfirmedItems.length > 0 ? (
                          [...currentConfirmedItems].map((apt: Appointment, index) => (
                            <tr onClick={() => setShowComponent(apt)} key={apt._id}>
                              <td className="fw-semibold">#{apt.nanoid}</td>
                              <td>{`${apt.firstName} ${apt.lastName}`}</td>
                              <td>{apt.plateNumber}</td>
                              <td>{apt.date.split("T")[0]}</td>
                              <td>
                                {new Date(`1970-01-01T${apt.time}:00`).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </td>
                              <td>{apt.startingBalance && apt.startingBalance.toFixed(2)}</td>
                              <td>
                                <ServiceStatus
                                  width="73%"
                                  option={apt.status}
                                  setActiveAppointments={setActiveAppointments}
                                  appointment={apt}
                                />
                              </td>
                              <td>
                                <BoxSeam size={24} className="text-success" onClick={() => setMuShow(apt)} />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <NoRecordRow
                            colSpan={8}
                            message="It looks like you have nothing due today. Confirm an Appointment from Awaiting and this table will show you what you need to do"
                          />
                        )}
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>

              {/* Awaiting Appointments */}
              <Row className="mb-4">
                <Col>
                  <div className="d-flex align-items-center">
                    <h6 className="me-auto fw-bold agapaint-yellow mb-0">Awaiting Appointments</h6>
                    <div className="d-flex justify-content-end align-items-center">
                      {/* Search */}
                      <InputGroup className="me-2 mb-2">
                        <InputGroup.Text id="basic-addon1">
                          <Search size={20} />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="basic-addon1"
                          onChange={handleSearchChangeAwa}
                          size="sm"
                        />
                      </InputGroup>
                      {/* Pagination */}
                      <Pagination className="secondary-pagination mb-2" size="sm">
                        <Pagination.Prev
                          disabled={currentPageAwa === 1}
                          onClick={() => setCurrentPageAwa(currentPageAwa - 1)}
                        />
                        {pagesAwa}
                        <Pagination.Next
                          disabled={currentPageAwa === pagesAwa.length}
                          onClick={() => setCurrentPageAwa(currentPageAwa + 1)}
                        />
                      </Pagination>
                    </div>
                  </div>
                  <Card className="border-0 rounded">
                    <Table striped hover className="align-middle">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>
                            Customer
                            <span onClick={() => handleSortAwa("firstName")}>
                              {sortFieldAwa === "firstName" ? (
                                sortDirectionAwa === "asc" ? (
                                  <SortAlphaDownAlt className="text-danger" />
                                ) : (
                                  <SortAlphaDown className="text-success" />
                                )
                              ) : (
                                <SortAlphaDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>Plate#</th>
                          <th>
                            Date
                            <span onClick={() => handleSortAwa("date")}>
                              {sortFieldAwa === "date" ? (
                                sortDirectionAwa === "asc" ? (
                                  <SortNumericDownAlt className="text-danger" />
                                ) : (
                                  <SortNumericDown className="text-success" />
                                )
                              ) : (
                                <SortNumericDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>
                            Time
                            <span onClick={() => handleSortAwa("time")}>
                              {sortFieldAwa === "time" ? (
                                sortDirectionAwa === "asc" ? (
                                  <SortNumericDownAlt className="text-danger" />
                                ) : (
                                  <SortNumericDown className="text-success" />
                                )
                              ) : (
                                <SortNumericDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>
                            Total Service{" "}
                            <span onClick={() => handleSortAwa("startingBalance")}>
                              {sortFieldAwa === "startingBalance" ? (
                                sortDirectionAwa === "asc" ? (
                                  <SortNumericDownAlt className="text-danger" />
                                ) : (
                                  <SortNumericDown className="text-success" />
                                )
                              ) : (
                                <SortNumericDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>Service Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Placeholder Component */}
                        {loading ? (
                          <PlaceholderRow col="7" />
                        ) : currentAwaitingItems.length > 0 ? (
                          [...currentAwaitingItems].map((apt: Appointment, index) => (
                            <tr onClick={() => setShowComponent(apt)} key={apt._id}>
                              <td className="fw-semibold">#{apt.nanoid}</td>
                              <td>{`${apt.firstName} ${apt.lastName}`}</td>
                              <td>{apt.plateNumber}</td>
                              <td>{apt.date.split("T")[0]}</td>
                              <td>
                                {new Date(`1970-01-01T${apt.time}:00`).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </td>
                              <td>{apt.startingBalance && apt.startingBalance.toFixed(2)}</td>
                              <td>
                                <ServiceStatus
                                  width="73%"
                                  option={apt.status}
                                  setActiveAppointments={setActiveAppointments}
                                  appointment={apt}
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <NoRecordRow
                            colSpan={7}
                            message="It looks like you have no awaiting appointments today. Approve an Appointment and this table will show you what you need to do"
                          />
                        )}
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>

              {/* Pending Appointments */}
              <Row className="mb-4">
                <Col>
                  <div className="d-flex align-items-center">
                    <h6 className="me-auto fw-bold agapaint-yellow mb-0">Pending Appointments</h6>
                    <div className="d-flex justify-content-end align-items-center">
                      {/* Search */}
                      <InputGroup className="me-2 mb-2">
                        <InputGroup.Text id="basic-addon1">
                          <Search size={20} />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="basic-addon1"
                          onChange={handleSearchChangePen}
                          size="sm"
                        />
                      </InputGroup>
                      {/* Pagination */}
                      <Pagination className="secondary-pagination mb-2" size="sm">
                        <Pagination.Prev
                          disabled={currentPagePen === 1}
                          onClick={() => setCurrentPagePen(currentPagePen - 1)}
                        />
                        {pagesPen}
                        <Pagination.Next
                          disabled={currentPagePen === pagesPen.length}
                          onClick={() => setCurrentPagePen(currentPagePen + 1)}
                        />
                      </Pagination>
                    </div>
                  </div>
                  <Card className="border-0 rounded">
                    <Table striped hover className="align-middle">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>
                            Customer{" "}
                            <span onClick={() => handleSortPen("firstName")}>
                              {sortFieldPen === "firstName" ? (
                                sortDirectionPen === "asc" ? (
                                  <SortAlphaDownAlt className="text-danger" />
                                ) : (
                                  <SortAlphaDown className="text-success" />
                                )
                              ) : (
                                <SortAlphaDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>Plate#</th>
                          <th>
                            Date
                            <span onClick={() => handleSortPen("date")}>
                              {sortFieldPen === "date" ? (
                                sortDirectionPen === "asc" ? (
                                  <SortNumericDownAlt className="text-danger" />
                                ) : (
                                  <SortNumericDown className="text-success" />
                                )
                              ) : (
                                <SortNumericDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>
                            Time
                            <span onClick={() => handleSortPen("time")}>
                              {sortFieldPen === "time" ? (
                                sortDirectionPen === "asc" ? (
                                  <SortNumericDownAlt className="text-danger" />
                                ) : (
                                  <SortNumericDown className="text-success" />
                                )
                              ) : (
                                <SortNumericDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>
                            Total Service
                            <span onClick={() => handleSortPen("startingBalance")}>
                              {sortFieldPen === "startingBalance" ? (
                                sortDirectionPen === "asc" ? (
                                  <SortNumericDownAlt className="text-danger" />
                                ) : (
                                  <SortNumericDown className="text-success" />
                                )
                              ) : (
                                <SortNumericDownAlt className="text-secondary" />
                              )}
                            </span>
                          </th>
                          <th>Service Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Placeholder Component */}
                        {loading ? (
                          <PlaceholderRow col="7" />
                        ) : currentPendingItems.length > 0 ? (
                          [...currentPendingItems].map((apt: Appointment, index) => (
                            <tr onClick={() => setShowComponent(apt)} key={apt._id}>
                              <td className="fw-semibold">#{apt.nanoid}</td>
                              <td>{`${apt.firstName} ${apt.lastName}`}</td>
                              <td>{apt.plateNumber}</td>
                              <td>{apt.date.split("T")[0]}</td>
                              <td>
                                {new Date(`1970-01-01T${apt.time}:00`).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </td>
                              <td>{apt.startingBalance && apt.startingBalance.toFixed(2)}</td>
                              <td>
                                <ServiceStatus
                                  width="73%"
                                  option={apt.status}
                                  setActiveAppointments={setActiveAppointments}
                                  appointment={apt}
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <NoRecordRow
                            colSpan={7}
                            message="It looks like you have nothing due today. Manifesting more appointments to come!"
                          />
                        )}
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>
            </Col>
          </CSSTransition>
          {/* Trigger to View Apt Details and Archive Modal*/}
          <CSSTransition in={showComponent !== null} timeout={300} classNames="slide" unmountOnExit>
            <AptDetails
              appointment={showComponent}
              setActiveAppointments={setActiveAppointments}
              activeAppointments={activeAppointments}
              closeDetails={closeDetails}
            />
          </CSSTransition>
          {/* Modal: Material Used */}
          {muShow !== null && (
            <AptMaterial
              setActiveAppointments={setActiveAppointments}
              appointment={muShow}
              show={muShow}
              hide={handleCloseModal}
            />
          )}
        </Row>
      </Container>
    </main>
  );
}

export default manageAppointment;
