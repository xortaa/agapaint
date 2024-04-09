"use client";

import React from "react";

import { FaPlus } from "react-icons/fa";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Dropdown, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AdminFAQStyles from "@/styles/AdminFAQ.module.scss";
import { Faq, FaqData } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";

function AddQuestionModal({ setFaqs }: { setFaqs: React.Dispatch<React.SetStateAction<Faq[]>> }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqData>();

  const handleClose = () => {
    setShow(false);
    setError("");
    reset();
  };

  const onSubmit = (data: FaqData) => {
    const AddFaq = new Promise((resolve, reject) => {
      axios
        .post("/api/faq", data)
        .then((res) => {
          handleClose();
          setFaqs((prev) => [...prev, res.data]);
          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to add question: ", error);
          reject(error);
        });
    });

    toast.promise(AddFaq, {
      pending: "Adding FAQ...",
      success: "New FAQ added!",
      error: "Failed to add FAQ, Please try again.",
    });
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button className={AdminFAQStyles.addqbtn} variant="warning" onClick={handleShow}>
        <FaPlus /> Add Question
      </Button>

      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                isInvalid={!!errors.question}
                {...register("question", { required: "Please provide a question" })}
              />
              <Form.Control.Feedback type="invalid">{errors.question && errors.question.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                isInvalid={!!errors.answer}
                {...register("answer", { required: "Please provide an answer" })}
              />
              <Form.Control.Feedback type="invalid">{errors.answer && errors.answer.message}</Form.Control.Feedback>
            </Form.Group>

            <Modal.Footer>
              <Button className={AdminFAQStyles.addqformclose} variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button className={AdminFAQStyles.addqformadd} variant="warning" type="submit">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddQuestionModal;
