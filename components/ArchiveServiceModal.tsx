import React from "react";
import AdminServiceStyles from "@/styles/AdminService.module.scss";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { FaArchive } from "react-icons/fa";
import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";

function ArchiveServiceModal(props) {
  const [show, setShow] = useState(false);
  const [service, setService] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  const handleAdd = () => {
    if (service.trim() === "") {
      setError("Please provide a service name");
    } else {
      console.log(service);
      handleClose();
    }
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
                  Service Name: <em>placeholder</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Service Description: <em>placeholder</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Uploaded Image: <em>placeholder</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Service Price: <em>placeholder</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Car Type: <em>placeholder</em>
                </Form.Label>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className={AdminServiceStyles.addserviceformclose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className={AdminServiceStyles.archiveserviceformarchive} variant="danger" onClick={handleAdd}>
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ArchiveServiceModal;
