"use client";
import React from "react";
import AdminServiceStyles from "@/styles/AdminService.module.scss";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Dropdown, FormControl } from "react-bootstrap";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import UploadButton from "./UploadButton";
import ImageUploadPreview from "./ImageUploadPreview";
import { toast } from "react-toastify";
import { Service } from "@/types";
import { set } from "mongoose";

function AddServiceModal({ setServices }: { setServices: React.Dispatch<React.SetStateAction<Service[]>> }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Service>();

  const handleClose = () => {
    setShow(false);
    setError("");
    reset();
    setImageUrl(null);
  };
  const handleShow = () => setShow(true);

  function handleUploadSuccess(result: any) {
    setImageUrl(result.info.secure_url);
  }

  const onSubmit = (data: Service) => {
    const selectedCarTypes = ["Hatchback", "Sedan", "SUV/AUV", "Van", "Motorcycle", "Bicycle", "Others"].filter(
      (carType) => data[carType]
    );
    const carTypeString = selectedCarTypes.join(", ");
    if (!carTypeString) {
      setError("Please choose a car type");
      return;
    }
    const newData = { ...data, image: imageUrl, carType: carTypeString };

    const AddService = new Promise((resolve, reject) => {
      axios
        .post("/api/service", newData)
        .then((res) => {
          // Use the service document from the server response
          const newService = res.data;
          handleClose();
          setServices((prev) => [...prev, newService]);
          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to add new service: ", error);
          reject(error);
        });
    });

    toast.promise(AddService, {
      pending: "Adding service...",
      success: "New service added!",
      error: "Failed to add service, Please try again.",
    });
  };

  return (
    <>
      <Button className={AdminServiceStyles.addservicebtn} variant="warning" onClick={handleShow}>
        <FaPlus /> Add Service
      </Button>

      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a service name"
                isInvalid={!!errors.name}
                {...register("name", { required: "Please provide a service name" })}
              />
              <Form.Control.Feedback type="invalid">{errors.name && errors.name.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Service Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter a service description"
                isInvalid={!!errors.description}
                maxLength={95}
                {...register("description", { required: "Please provide a service description" })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description && errors.description.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <UploadButton onUpload={handleUploadSuccess} />
                  {/* <Form.Control type="file" accept=".jpg,.jpeg,.png" isInvalid={!!error} required />
                  <Form.Control.Feedback type="invalid">
                    Please input .jpg, .jpeg, .png files only
                  </Form.Control.Feedback> */}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Service Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    isInvalid={!!errors.price}
                    min="0"
                    {...register("price", { required: "Please provide a service price" })}
                  />
                  <Form.Control.Feedback type="invalid">{errors.price && errors.price.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Car Type</Form.Label>
              <div className="d-flex">
                {["Hatchback", "Sedan", "SUV/AUV", "Van", "Motorcycle", "Bicycle", "Others"].map((carType) => (
                  <div key={`inline-checkbox`} className="mb-3">
                    <Form.Check
                      inline
                      label={carType}
                      name={carType}
                      type="checkbox"
                      id={carType}
                      {...register(carType as keyof Service)}
                    />
                  </div>
                ))}
              </div>
              <Form.Control.Feedback type="invalid">Please choose a car type</Form.Control.Feedback>
              {error && <Form.Text className="text-danger">{error}</Form.Text>}
            </Form.Group>

            {imageUrl && (
              <Form.Group className="mb-3">
                <Form.Text className="text-muted">Image Preview</Form.Text>
                <ImageUploadPreview imageUrl={imageUrl} width={72} height={72} alt="image preview" />
              </Form.Group>
            )}

            <Modal.Footer>
              <Button className={AdminServiceStyles.addserviceformclose} variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button className={AdminServiceStyles.addserviceformadd} variant="warning" type="submit">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddServiceModal;
