"use client";

import React from "react";
// Styles
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Dropdown, FormControl } from "react-bootstrap";
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

function ManageFAQPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    axios.get("/api/faq").then((res) => {
      setFaqs(res.data);
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

                <div className="ms-auto d-flex gap-2">
                  <AddQuestionModal setFaqs={setFaqs} />
                </div>
              </div>
            </Row>
          </Col>
        </Row>

        <Table hover className="align-middle text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq._id}>
                <td>{faq._id}</td>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td>
                  <EditQuestionModal setFaqs={setFaqs} faqData={faq} />
                  <ArchiveQuestionModal setFaqs={setFaqs} faqData={faq} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </main>
  );
}

export default ManageFAQPage;