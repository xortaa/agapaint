import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Pencil, InboxFill } from "react-bootstrap-icons";

function InvUpdateCategoryModal() {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState(""); // New state variable
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  const handleUpdate = () => {
    if (category.trim() === "" || newCategory.trim() === "") {
      setError("Please provide a category name");
    } else {
      // Update your category here
      console.log(category, newCategory);
      handleClose();
    }
  };

  return (
    <>
      <Pencil onClick={handleShow} size={20} className="text-success me-2" />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>New Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InvUpdateCategoryModal;
