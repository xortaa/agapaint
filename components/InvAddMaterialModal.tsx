import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Material, MaterialData, Category } from "@/types";

function InvAddMaterialModal({
  setMaterials,
  disabled,
  categories,
}: {
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
  disabled?: boolean;
  categories: Category[];
}) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Material>();

  const handleClose = () => {
    setShow(false);
    setError("");
    reset();
  };

  const handleShow = () => setShow(true);

  // Category: Get all categories for select dropdown and fetch newly added cat every time the modal is shown
  const onSubmit = (data: Material) => {
    const newData = { ...data };

    const AddMaterial = new Promise((resolve, reject) => {
      axios
        .post("/api/material", newData)
        .then((res) => {
          // Use the material document from the server response
          const newMaterial = res.data;
          handleClose();
          console.log(newMaterial);

          setTimeout(() => {
            setMaterials((prev) => [...prev, newMaterial]);
            resolve("Success");
          }, 1000);
        })
        .catch((error) => {
          console.error("Failed to add new material: ", error);
          reject(error);
        });
    });

    toast.promise(AddMaterial, {
      pending: "Adding material...",
      success: "New material added!",
      error: "Failed to add material, Please try again.",
    });
  };

  return (
    <>
      {disabled ? (
        <OverlayTrigger overlay={<Tooltip id="button-tooltip">Add a category first!</Tooltip>} placement="bottom">
          <span className="d-inline-block">
            <Button
              disabled={disabled}
              style={{ backgroundColor: "#17A2B8 ", border: "none", pointerEvents: "none" }}
              onClick={handleShow}
            >
              <FaPlus /> Add Material
            </Button>
          </span>
        </OverlayTrigger>
      ) : (
        <Button disabled={disabled} style={{ backgroundColor: "#17A2B8 ", border: "none" }} onClick={handleShow}>
          <FaPlus /> Add Material
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Material</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Material Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a material name"
                isInvalid={!!errors.name}
                required
                {...register("name", { required: "Please provide a material name" })}
              />
              <Form.Control.Feedback type="invalid">{errors.name && errors.name.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Category Name</Form.Label>
                  <Form.Select aria-label="Select category" required {...register("category")}>
                    {categories.map((category: Category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Initial Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter current stock"
                    min="0"
                    isInvalid={!!errors.quantity}
                    required
                    {...register("quantity", { required: "Please provide provide current stock" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.quantity && errors.quantity.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" style={{ backgroundColor: "#17A2B8 ", border: "none" }}>
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default InvAddMaterialModal;
