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
import { Faq, FaqData } from "@/types";

function ArchiveQuestionModal({
  faqData,
  setFaqs,
}: {
  faqData: Faq;
  setFaqs: React.Dispatch<React.SetStateAction<Faq[]>>;
}) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const onDelete = (faqData: Faq) => {
    axios.delete(`/api/faq/${faqData._id}`).then((res) => {
      setFaqs((prev) => prev.filter((faq) => faq._id !== faqData._id));
      handleClose();
    });
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
                  Question: <em>{faqData.question}</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Description: <em>{faqData.answer}</em>
                </Form.Label>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className={AdminFAQStyles.addqformclose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className={AdminFAQStyles.archiveqformarchive} variant="danger" onClick={() => onDelete(faqData)}>
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ArchiveQuestionModal;
