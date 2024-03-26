"use client";
import { Modal, Row, Col, Button, Form, InputGroup, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState } from "react";

import { FaPlus } from "react-icons/fa";

import logStyles from "@/styles/logModal.module.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { LogData, Material, Log } from "@/types";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { set } from "mongoose";

function LogModal({
  disabled,
  materials,
  setLogs,
}: {
  disabled: boolean;
  materials: Material[];
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
}) {
  const { data: session } = useSession();
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false); // Add this line
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [currentStock, setCurrentStock] = useState<number | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LogData>();

  const onSubmit = (data: LogData) => {
    const newData = { ...data, updatedBy: session.user.name };

    const AddLog = new Promise((resolve, reject) => {
      axios
        .post("/api/log", newData)
        .then((res) => {
          const newLog: Log = { ...res.data, material: selectedMaterial };
          setShow(false);
          setLogs((prevLogs) => [...prevLogs, newLog]);

          setTimeout(() => {
            resolve("Success");
          }, 1000);
        })
        .catch((error) => {
          console.error("Failed to add new log: ", error);
          reject(error);
        });
    });

    toast.promise(AddLog, {
      pending: "Adding log...",
      success: "New log added!",
      error: "Failed to add log, Please try again.",
    });
  };

  //  Trans Type
  type OptionType = "IN" | "OUT";
  const [selectedOption, setSelectedOption] = useState<OptionType>("IN");

  const handleOptionChange = (option: OptionType) => {
    setSelectedOption(option);
    setValue("transactionType", option);
  };

  const handleClose = () => setShow(false); // Add this function
  const handleShow = () => setShow(true); // Add this function

  return (
    <main>
      {disabled ? (
        <OverlayTrigger overlay={<Tooltip id="button-tooltip">Add a material first!</Tooltip>} placement="bottom">
          <span className="d-inline-block">
            <Button
              disabled={disabled}
              style={{ backgroundColor: "#084298", border: "none", pointerEvents: "none" }}
              onClick={handleShow}
            >
              <FaPlus className="me-2" />
              Add Log
            </Button>
          </span>
        </OverlayTrigger>
      ) : (
        <Button disabled={disabled} style={{ backgroundColor: "#084298", border: "none" }} onClick={handleShow}>
          <FaPlus className="me-2" />
          Add Log
        </Button>
      )}

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Log</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="p-4">
            {/* Transaction Type */}
            <Row className="mb-3">
              <Form.Label>Transaction Type</Form.Label>
              <ButtonGroup>
                <Button
                  variant={selectedOption === "IN" ? "success" : "outline-danger"}
                  onClick={() => handleOptionChange("IN")}
                  className={logStyles.inBtn}
                >
                  In
                </Button>
                <Button
                  variant={selectedOption === "OUT" ? "danger" : "outline-success"}
                  onClick={() => handleOptionChange("OUT")}
                  className={logStyles.outBtn}
                >
                  Out
                </Button>
              </ButtonGroup>
              <input type="hidden" defaultValue="IN" {...register("transactionType")} />
            </Row>

            {/* Material Name Select */}
            <Row className="mb-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label>Material Name</Form.Label>
                <Form.Select
                  aria-label="material-name-select"
                  required
                  {...register("material")}
                  onChange={(e) => {
                    const selected = materials.find((material) => material._id === e.target.value);
                    setSelectedMaterial(selected || null);
                    setCurrentStock(selected ? selected?.quantity : null);
                  }}
                >
                  <option value="" disabled selected>
                    Select a Material
                  </option>
                  {materials.map((material) => (
                    <option key={material._id} value={material._id}>
                      {material.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select a material name</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Category and Current Stock from DB */}
            <Row className="mb-3">
              <Col>
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" value={selectedMaterial ? selectedMaterial?.category?.name : ""} disabled />
              </Col>
              <Col>
                <Form.Label>Current Stock</Form.Label>
                <Form.Control type="number" value={currentStock || ""} disabled />
              </Col>
            </Row>

            {/* Transaction Quantity and Date */}
            <Row className="mb-3">
              <Col>
                <Form.Label>Transaction Quantity</Form.Label>
                <Form.Control type="number" required min={0} {...register("transactionQuantity")} />
                <Form.Control.Feedback type="invalid">Please provide a quantity</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label>Transaction Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  {...register("transactionDate")}
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
                <Form.Control.Feedback type="invalid">Please provide a date</Form.Control.Feedback>
              </Col>
            </Row>

            {/* Notes */}
            <Row className="mb-3 p-3 pb-0">
              <Form.Label className="p-0">Notes (Optional)</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("notes")} />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" style={{ backgroundColor: "#084298", border: "none" }}>
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </main>
  );
}

export default LogModal;
