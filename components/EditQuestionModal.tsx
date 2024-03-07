"use client";

import React from "react";

import { FaPlus } from "react-icons/fa";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Dropdown, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminFAQStyles from "@/styles/AdminFAQ.module.scss";
import { Pencil } from "react-bootstrap-icons";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { Faq, FaqData } from "@/types";

function EditQuestionModal({
  faqData,
  setFaqs,
}: {
  faqData: Faq;
  setFaqs: React.Dispatch<React.SetStateAction<Faq[]>>;
}) {
  const [faq, setFaq] = useState<Faq>();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FaqData>();

  useEffect(() => {
    axios.get(`/api/faq/${faqData._id}`).then((res) => {
      setFaq(res.data.question);
      for (const [key, value] of Object.entries(res.data)) {
        setValue(key as keyof FaqData, value as string); // Explicitly type the value as string or number
      }
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const onSubmit = (data: FaqData) => {
    axios.patch(`/api/faq/${faqData._id}`, data).then((res) => {
      setFaqs((prev) => prev.map((faq) => (faq._id === faqData._id ? res.data : faq)));
      handleClose();
    });
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control required type="text" isInvalid={!!error} {...register("question")} />
              <Form.Control.Feedback type="invalid">Please provide a question</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control as="textarea" rows={3} isInvalid={!!error} required {...register("answer")} />
              <Form.Control.Feedback type="invalid">Please provide an answer</Form.Control.Feedback>
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
