import React from "react";
import AdminServiceStyles from "@/styles/AdminService.module.scss";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { FaArchive } from "react-icons/fa";
import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";
import { Service } from "@/types";
import axios from "axios";
import ImageUploadPreview from "./ImageUploadPreview";
import { toast } from "react-toastify";

function ArchiveServiceModal({
  setServices,
  serviceData,
}: {
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  serviceData: Service;
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    const DeleteService = new Promise((resolve, reject) => {
      axios
        .delete(`/api/service/${serviceData._id}`)
        .then((res) => {
          handleClose();
          setServices((prev) => prev.filter((service) => service._id !== serviceData._id));
          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to delete service: ", error);
          reject(error);
        });
    });

    toast.promise(DeleteService, {
      pending: "Archiving service...",
      success: "Service Archived!",
      error: "Failed to archive service, Please try again.",
    });
  };

  return (
    <>
      <InboxFill size={20} className="text-danger" onClick={handleShow}>
        <FaArchive /> Archive Material
      </InboxFill>

      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Archive Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to archive?</p>
          <Form>
            <Form.Group className="mb-3">
              <Row>
                <Form.Label>
                  Service Name: <em>{serviceData.name}</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Service Description: <em>{serviceData.description}</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Uploaded Image:
                  <ImageUploadPreview imageUrl={serviceData.image} width={75} height={75} alt="preview" />
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Service Price: <em>{serviceData.price}</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Car Type: <em>{serviceData.carType}</em>
                </Form.Label>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className={AdminServiceStyles.addserviceformclose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className={AdminServiceStyles.archiveserviceformarchive} variant="danger" onClick={handleDelete}>
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ArchiveServiceModal;
