"use client";

import React from "react";

import { FaPlus } from "react-icons/fa";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Dropdown, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AdminFAQStyles from "@/styles/AdminFAQ.module.scss";
import { Pencil } from "react-bootstrap-icons";
import { MdEdit } from "react-icons/md";

function EditQuestionModal() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Pencil size={20} className="text-success me-2" onClick={handleShow}>
        <MdEdit />
      </Pencil>

      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Update Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control required type="text" isInvalid={!!error} />
              <Form.Control.Feedback type="invalid">Please provide a service name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} isInvalid={!!error} required />
              <Form.Control.Feedback type="invalid">Please provide a service description</Form.Control.Feedback>
            </Form.Group>

            <Modal.Footer>
              <Button className={AdminFAQStyles.addqformclose} variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button className={AdminFAQStyles.updateqformupdate} variant="success" type="submit">
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditQuestionModal;
