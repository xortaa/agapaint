"use client";

import React from "react";
// Styles
import AdminServiceStyles from "@/styles/AdminService.module.scss";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  InputGroup,
  Dropdown,
  FormControl,
  Pagination,
  Card,
} from "react-bootstrap";
import {
  Funnel,
  Search,
  SortAlphaDown,
  SortAlphaDownAlt,
  SortAlphaUp,
  SortAlphaUpAlt,
  SortNumericDown,
  SortNumericDownAlt,
  SortNumericUp,
} from "react-bootstrap-icons";
// Components
import AdminHeader from "@/components/AdminHeader";
import AddService from "@/components/AddServiceModal";
import EditService from "@/components/UpdateServiceModal";
import ArchiveServiceModal from "@/components/ArchiveServiceModal";
import ToastPromise from "@/components/ToastPromise";
// Utilities
import { useState, useEffect } from "react";
import axios from "axios";
import { Service } from "@/types";
import PlaceholderRow from "@/components/PlaceholderRow";
import NoRecordRow from "@/components/NoRecordRow";

function AdminManageServicePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // search function
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  const filteredData = services.filter((service) =>
    Object.values(service).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // filter by car type
  const [selectedCarType, setSelectedCarType] = useState("");
  const handleCarTypeChange = (carType) => {
    setSelectedCarType(carType);
  };
  const finalFilteredSortedData = services.filter(
    (service) =>
      Object.values(service).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCarType === "" || service.carType.includes(selectedCarType))
  );

  // Sort function
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc"); // 'asc' for ascending, 'desc' for descending
  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  const sortedData = [...finalFilteredSortedData].sort((a, b) => {
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
  const [itemsPerPage, setItemsPerPage] = useState(5); //set the limit of items per page
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  // eto na laman nung table final final
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];
  for (let i = 1; i <= Math.ceil(sortedData.length / itemsPerPage); i++) {
    if (
      i === 1 ||
      i === Math.ceil(sortedData.length / itemsPerPage) ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pages.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i}
        </Pagination.Item>
      );
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      pages.push(<Pagination.Ellipsis />);
    }
  }

  useEffect(() => {
    axios.get("/api/service").then((res) => {
      setServices(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="agapaint-bg">
      <Container fluid className="p-4 min-vh-100">
        <Row>
          {/* Toast Component */}
          <ToastPromise />

          {/* Header Row */}
          <AdminHeader title="Manage Services" subtitle="View all your services offered" />

          {/* Search Row */}
          <Col>
            <Row className="mt-2 mb-4" sm={8}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <InputGroup className="w-25">
                  <InputGroup.Text id="basic-addon1">
                    <Search size={20} />
                  </InputGroup.Text>
                  <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={handleSearchChange}
                  />
                </InputGroup>
                <Dropdown>
                  <Dropdown.Toggle variant={selectedCarType ? "success" : "secondary"} id="dropdown-basic">
                    <Funnel />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleCarTypeChange("Hatchback")}>Hatchback</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCarTypeChange("Sedan")}>Sedan</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCarTypeChange("SUV/AUV")}>SUV/AUV</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCarTypeChange("Van")}>Van</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCarTypeChange("Motorcycle")}>Motorcycle</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCarTypeChange("Bicycle")}>Bicycle</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCarTypeChange("Others")}>Others</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCarTypeChange("")}>All Record</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <div className="ms-auto d-flex gap-2 align-items-center">
                  {/* Pagination */}
                  <Pagination className="secondary-pagination m-0 me-1">
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                    {pages}
                    <Pagination.Next
                      disabled={currentPage === pages.length}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    />
                  </Pagination>
                  <AddService setServices={setServices} />
                </div>
              </div>
            </Row>
          </Col>
        </Row>

        <Card className="border-0" style={{ borderRadius: "10px" }}>
          <Card.Body className="p-2 pb-0 pt-0">
            <Table hover responsive className="align-middle text-left">
              <thead>
                <tr>
                  <th className={AdminServiceStyles.tableheader}>#</th>
                  <th className={AdminServiceStyles.tableheader}>Image</th>
                  <th className={AdminServiceStyles.tableheader}>
                    Service Name
                    <span onClick={() => handleSort("name")}>
                      {sortField === "name" ? (
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
                  <th className={AdminServiceStyles.tableheader}>Description</th>
                  <th className={AdminServiceStyles.tableheader}>
                    Price
                    <span onClick={() => handleSort("price")}>
                      {sortField === "price" ? (
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
                  <th className={AdminServiceStyles.tableheader}>
                    Car Type
                    <span onClick={() => handleSort("carType")}>
                      {sortField === "carType" ? (
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
                  <th className={AdminServiceStyles.tableheader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Placeholder Component
                  <PlaceholderRow col="7" />
                ) : // Render the actual data
                currentItems.length > 0 ? (
                  currentItems.map((service: Service, index) => (
                    <tr key={service._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img className={AdminServiceStyles.tableimg} src={service.image} alt="Service" />
                      </td>
                      <td>{service.name}</td>
                      <td>{service.description}</td>
                      <td>₱{typeof service.price === 'number' ? service.price.toFixed(2) : service.price}</td>
                      <td>{service.carType}</td>
                      <td>
                        <EditService setServices={setServices} serviceData={service} />
                        <ArchiveServiceModal setServices={setServices} serviceData={service} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <NoRecordRow
                    colSpan={7}
                    message="Click 'Add Service' to create a new service for your potential customers, Hwaiting!"
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
      </Container>
    </main>
  );
}

export default AdminManageServicePage;
