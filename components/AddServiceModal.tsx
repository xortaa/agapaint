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
import { Service } from "@/types";

function AddServiceModal({setServices}: {setServices: React.Dispatch<React.SetStateAction<Service[]>>}) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Service>();

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);

  function handleUploadSuccess(result: any) {
    setImageUrl(result.info.secure_url);
  }

  const onSubmit = (data: Service) => {
    const newData = { ...data, image: imageUrl };
    axios.post("/api/service", newData).then((res) => {
      console.log(res);
      setServices((prev) => [...prev, newData]); 
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
              <Form.Control required type="text" isInvalid={!!error} {...register("name", { required: true })} />
              <Form.Control.Feedback type="invalid">Please provide a service name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Service Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                isInvalid={!!error}
                required
                {...register("description", { required: true })}
              />
              <Form.Control.Feedback type="invalid">Please provide a service description</Form.Control.Feedback>
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
                  <Form.Control type="number" isInvalid={!!error} required min="0" {...register("price")} />
                  <Form.Control.Feedback type="invalid">Please provide a service price</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Car Type</Form.Label>
              <Form.Control type="text" isInvalid={!!error} required {...register("carType")} />
              <Form.Control.Feedback type="invalid">Please provide a car type</Form.Control.Feedback>
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
