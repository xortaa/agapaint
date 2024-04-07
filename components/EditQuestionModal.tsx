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
import { toast } from "react-toastify";

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
    const UpdateFaq = new Promise((resolve, reject) => {
      axios
        .patch(`/api/faq/${faqData._id}`, data)
        .then((res) => {
          handleClose();
          setFaqs((prev) => prev.map((faq) => (faq._id === faqData._id ? res.data : faq)));
          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to update FAQ: ", error);
          reject(error);
        });
    });

    toast.promise(UpdateFaq, {
      pending: "Updating FAQ...",
      success: "FAQ updated!",
      error: "Failed to update FAQ, Please try again.",
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
