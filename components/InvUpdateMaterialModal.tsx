import React, { useState } from "react";
import { Button, Modal, Form, Row, Col} from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";

function InvUpdateMaterialModal() {
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
      <Pencil size={20} className="text-success me-2" onClick={handleShow}>
        <MdEdit /> Update Material
      </Pencil>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Material Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter material name" value={material} onChange={(e) => setMaterial(e.target.value)} isInvalid={!!error} />
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>                  
                    <Row>
                        <Col>
                        <Form.Label>Category Name</Form.Label>
                        <Form.Select aria-level={1}>
                        <option>Color Paint</option>
                        <option>Wood Paint</option>
                        <option>Other</option>
                    </Form.Select>
                        </Col>
                        <Col>
                        <Form.Label>Current Stock</Form.Label>
                    <Form.Control type="number" placeholder="Enter current stock" min="0" isInvalid={!!error} />
                    </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InvUpdateMaterialModal;