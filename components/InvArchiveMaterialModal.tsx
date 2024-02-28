import React, { useState } from "react";
import { Button, Modal, Form, Row, Col} from "react-bootstrap";
import { FaArchive } from "react-icons/fa";
import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";

function InvArchiveMaterialModal() {
  const [show, setShow] = useState(false);
  const [material, setMaterial] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  const handleAdd = () => {
    if (material.trim() === "") {
      setError("Please provide a material name");
    } else {
      console.log(material);
      handleClose();
    }
  };

  return (
    <>
      <InboxFill size={20} className="text-danger" onClick={handleShow}>
        <FaArchive /> Archive Material
      </InboxFill>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Archive Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>Are you sure you want to archive?</h6>
            <Form>
                <Form.Group className="mb-3">
                  <Row>
                  <Form.Label>Material Name: <em>placeholder</em></Form.Label>
                  </Row>
                  <Row>
                  <Form.Label>Category Name: <em>placeholder</em></Form.Label>
                  </Row>
                  <Row>
                  <Form.Label>Current Stock: <em>placeholder</em></Form.Label>
                  </Row> 
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleAdd}>
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InvArchiveMaterialModal;