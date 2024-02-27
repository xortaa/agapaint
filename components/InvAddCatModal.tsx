import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

function InvAddCategoryModal() {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  const handleAdd = () => {
    if (category.trim() === "") {
      setError("Please provide a category name");
    } else {
      console.log(category);
      handleClose();
    }
  };

  return (
    <>
      <Button style={{ backgroundColor:  "#8540F5", border: "none"  }} onClick={handleShow}>
        <FaPlus /> Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name" value={category} onChange={(e) => setCategory(e.target.value)} isInvalid={!!error} />
              <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InvAddCategoryModal;