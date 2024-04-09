"use client";

import React from "react";
// Styles
import { Container, Row, Col, Table, Pagination, Card, InputGroup, Dropdown, FormControl } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { SortAlphaDown, SortAlphaDownAlt } from "react-bootstrap-icons";
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
import NoRecordRow from "@/components/NoRecordRow";
import PlaceholderRow from "@/components/PlaceholderRow";



function ManageFAQPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; //set the limit of items per page

// Filter faqs based on searchTerm
const filteredFaqs = faqs.filter(
  (faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
);

// sort function
const [sortField, setSortField] = useState<string | null>(null);
const [sortDirection, setSortDirection] = useState("desc"); // 'asc' for ascending, 'desc' for descending
const handleSort = (field: string) => {
  setSortField(field);
  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
};

const sortedFaqs = [...filteredFaqs].sort((a, b) => {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFaqs.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];
  for (let i = 1; i <= Math.ceil(filteredFaqs.length / itemsPerPage); i++) {
    if (
      i === 1 ||
      i === Math.ceil(filteredFaqs.length / itemsPerPage) ||
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
    axios.get("/api/faq").then((res) => {
      setFaqs(res.data);
      setLoading(false);
    });
  }, []);

  // search function
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
                  <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={handleSearchChange}
                  />
                </InputGroup>

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
                  <th onClick={() => handleSort("question")}>
                    Question
                    {sortField === "question" ? (
                      sortDirection === "asc" ? (
                        <SortAlphaDown className="text-success" />
                      ) : (
                        <SortAlphaDownAlt className="text-danger" />
                      )
                    ) : (
                      <SortAlphaDown className="text-secondary" />
                    )}
                  </th>
                  <th>Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Placeholder Component
                  <PlaceholderRow col="4" />
                ) : currentItems.length > 0 ? (
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
                ) : (
                  <NoRecordRow
                    colSpan={4}
                    message="Click 'Add Question' to create a new FAQ for your potential customers, Hwaiting!"
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

export default ManageFAQPage;
