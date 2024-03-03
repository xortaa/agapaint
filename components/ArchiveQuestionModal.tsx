"use client";

import React from "react";
import AdminFAQStyles from "@/styles/AdminFAQ.module.scss";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { FaArchive } from "react-icons/fa";
import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";
import { Service } from "@/types";
import axios from "axios";
import ImageUploadPreview from "./ImageUploadPreview";

function ArchiveQuestionModal() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <InboxFill size={20} className="text-danger" onClick={handleShow}>
        <FaArchive /> Archive Question
      </InboxFill>

      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Archive Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to archive?</p>
          <Form>
            <Form.Group className="mb-3">
              <Row>
                <Form.Label>
                  Question: <em>placeholder</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Description: <em>placeholder</em>
                </Form.Label>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className={AdminFAQStyles.addqformclose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className={AdminFAQStyles.archiveqformarchive} variant="danger">
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ArchiveQuestionModal;
