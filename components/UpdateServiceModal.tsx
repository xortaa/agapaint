"use client";
import React from "react";
import AdminServiceStyles from "@/styles/AdminService.module.scss";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Dropdown, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";
import { Service } from "@/types";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import UploadButton from "./UploadButton";
import ImageUploadPreview from "./ImageUploadPreview";
import { toast } from "react-toastify";

function UpdateServiceModal({
  setServices,
  serviceData,
}: {
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  serviceData: Service;
}) {
  const [show, setShow] = useState(false);
  const [service, setService] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Service>();

  useEffect(() => {
    axios.get(`/api/service/${serviceData._id}`).then((res) => {
      setService(res.data.name); // set the service state with the name property of the response data
      for (const [key, value] of Object.entries(res.data)) {
        setValue(key as keyof Service, value as string | number); // Explicitly type the value as string or number
      }
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const handleShow = () => setShow(true);

  function handleUploadSuccess(result: any) {
    setImageUrl(result.info.secure_url);
  }

  const onSubmit = (data: Service) => {
    let newData = { ...data };
    if (imageUrl) {
      newData.image = imageUrl;
    }
    if (!newData.carType) {
      setError("Please choose a car type");
      return;
    }
    const UpdateService = new Promise((resolve, reject) => {
      axios
        .patch(`/api/service/${serviceData._id}`, newData)
        .then((res) => {
          handleClose();
          setServices((prev) => prev.map((service) => (service._id === serviceData._id ? newData : service)));
          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to update service: ", error);
          reject(error);
        });
    });

    toast.promise(UpdateService, {
      pending: "Updating service...",
      success: "Service updated!",
      error: "Failed to update service, Please try again.",
    });
  };

  return (
    <>
      <Pencil size={20} className="text-success me-2" onClick={handleShow}>
        <MdEdit />
      </Pencil>

      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Update Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setService(e.target.value)}
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
                isInvalid={!!errors.description}
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
                  {/* <Form.Control type="file" accept=".jpg,.jpeg,.png" isInvalid={!!error} required 
                  />
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
                    <Controller
                      control={control}
                      name="carType"
                      render={({ field }) => (
                        <Form.Check
                          inline
                          label={carType}
                          name={carType}
                          type="checkbox"
                          id={carType}
                          checked={field.value && field.value.includes(carType)}
                          onChange={(e) => {
                            let selectedCarTypes;
                            if (e.target.checked) {
                              selectedCarTypes = [...(field.value ? field.value.split(", ") : []), carType];
                            } else {
                              selectedCarTypes = field.value
                                ? field.value.split(", ").filter((value) => value !== carType)
                                : [];
                            }
                            const carTypeString = selectedCarTypes.join(", ");
                            field.onChange(carTypeString);
                          }}
                        />
                      )}
                    />
                  </div>
                ))}
              </div>
              <Form.Control.Feedback type="invalid">Please provide a car type</Form.Control.Feedback>
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
              <Button className={AdminServiceStyles.updateserviceformupdate} variant="success" type="submit">
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateServiceModal;
