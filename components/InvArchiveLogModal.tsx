import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaArchive } from "react-icons/fa";
import { InboxFill } from "react-bootstrap-icons";

function InvArchiveLogModal() {
  const [show, setShow] = useState(false);
  const [log, setLog] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  const handleAdd = () => {
    if (log.trim() === "") {
      setError("Please provide a log name");
    } else {
      console.log(log);
      handleClose();
    }
  };
  return (
    <>
      <InboxFill size={20} className="text-danger" onClick={handleShow}></InboxFill>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Archive Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are you sure you want to archive?</h6>
          <Form>
            <Form.Group className="mb-3">
              <Row>
                <Form.Label>
                  Transaction Type: <em>placeholder</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Material Name: <em>placeholder</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Category Name: <em>placeholder</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Current Stock: <em>placeholder</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Transaction Qty: <em>placeholder</em>
                </Form.Label>
              </Row>
              <Row>
                <Form.Label>
                  Transaction Date: <em>placeholder</em>
                </Form.Label>
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

export default InvArchiveLogModal;
