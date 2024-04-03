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
import { Funnel, Search } from "react-bootstrap-icons";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); //set the limit of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];
  for (let i = 1; i <= Math.ceil(services.length / itemsPerPage); i++) {
    if (i === 1 || i === Math.ceil(services.length / itemsPerPage) || (i >= currentPage - 2 && i <= currentPage + 2)) {
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
                  <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                </InputGroup>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <Funnel />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
                  <th className={AdminServiceStyles.tableheader}>Service Name</th>
                  <th className={AdminServiceStyles.tableheader}>Description</th>
                  <th className={AdminServiceStyles.tableheader}>Price</th>
                  <th className={AdminServiceStyles.tableheader}>Car Type</th>
                  <th className={AdminServiceStyles.tableheader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Placeholder Component
                  <PlaceholderRow col="7" />
                ) : (
                  // Render the actual data
                  currentItems.length > 0 ? (
                  currentItems.map((service: Service, index) => (
                    <tr key={service._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img className={AdminServiceStyles.tableimg} src={service.image} alt="Service" />
                      </td>
                      <td>{service.name}</td>
                      <td>{service.description}</td>
                      <td>₱{service.price}</td>
                      <td>{service.carType}</td>
                      <td>
                        <EditService setServices={setServices} serviceData={service} />
                        <ArchiveServiceModal setServices={setServices} serviceData={service} />
                      </td>
                    </tr>
                  ))
                  ) : (
                    <NoRecordRow colSpan={7} message="Click 'Add Service' to create a new service for your potential customers, Hwaiting!" />
                  )
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
