import { Category, CategoryData } from "@/types";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function InvAddCatModal({
  setActiveCategories,
}: {
  setActiveCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Category>();

  const handleClose = () => {
    setShow(false);
    setError("");
    reset();
  };
  const handleShow = () => setShow(true);

  const onSubmit = (data: Category) => {
    const AddCategory = new Promise((resolve, reject) => {
      axios
        .post("/api/category", data)
        .then((res) => {
          // Use the category document from the server response
          const newCategory = res.data;
          handleClose();
          setActiveCategories((prev) => [...prev, newCategory]);
          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to add new category: ", error);
          reject(error);
        });
    });

    toast.promise(AddCategory, {
      pending: "Adding category...",
      success: "New category added!",
      error: "Failed to add category, Please try again.",
    });
  };

  return (
    <>
      <Button style={{ backgroundColor: "#8540F5", border: "none" }} onClick={handleShow}>
        <FaPlus /> Add Category
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a category name"
                isInvalid={!!errors.name}
                {...register("name", { required: "Please provide a category name" })}
              />
              <Form.Control.Feedback type="invalid">{errors.name && errors.name.message}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" style={{ backgroundColor: "#8540F5", border: "none" }}>
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default InvAddCatModal;
