import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { InboxFill } from "react-bootstrap-icons";

function InvArchiveCategoryModal() {
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
        <InboxFill size={20} className="text-danger" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Archive Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to archive?
          <br /><br />
          Category Name: {category}
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InvArchiveCategoryModal;
