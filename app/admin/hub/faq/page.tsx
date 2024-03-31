"use client";

import React from "react";
// Styles
import { Container, Row, Col, Table, Pagination, Card, InputGroup, Dropdown, FormControl } from "react-bootstrap";
import { Funnel, Search } from "react-bootstrap-icons";
// Components
import AdminHeader from "@/components/AdminHeader";
import AddQuestionModal from "@/components/AddQuestionModal";
import EditQuestionModal from "@/components/EditQuestionModal";
import ArchiveQuestionModal from "@/components/ArchiveQuestionModal";
import ToastPromise from "@/components/ToastPromise";
// Utilities
import { useState, useEffect } from "react";
import axios from "axios";
import { Faq } from "@/types";
import { set } from "mongoose";
import PlaceholderRow from "@/components/PlaceholderRow";

function ManageFAQPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); //set the limit of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = faqs.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];
  for (let i = 1; i <= Math.ceil(faqs.length / itemsPerPage); i++) {
    if (i === 1 || i === Math.ceil(faqs.length / itemsPerPage) || (i >= currentPage - 2 && i <= currentPage + 2)) {
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
    axios.get("/api/faq").then((res) => {
      setFaqs(res.data);
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
          <AdminHeader title="Manage FAQs" subtitle="View all your frequently asnwered questions" />

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
                  <AddQuestionModal setFaqs={setFaqs} />
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
                  <th>#</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Placeholder Component
                  <PlaceholderRow col="4" />
                ) : (
                  // Render the actual data
                  currentItems.map((faq, index) => (
                    <tr key={faq._id}>
                      <td>{index + 1}</td>
                      <td>{faq.question}</td>
                      <td>{faq.answer}</td>
                      <td>
                        <EditQuestionModal setFaqs={setFaqs} faqData={faq} />
                        <ArchiveQuestionModal setFaqs={setFaqs} faqData={faq} />
                      </td>
                    </tr>
                  ))
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

export default ManageFAQPage;
