"use client";
import { Modal, Row, Col, Button, Form, InputGroup, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, useEffect } from "react";

import { FaPlus } from "react-icons/fa";

import logStyles from "@/styles/logModal.module.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { LogData, Material, Log } from "@/types";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function LogModal({
  disabled,
  activeMaterials,
  setLogs,
  setActiveMaterials,
  setAllMaterials,
}: {
  disabled: boolean;
  activeMaterials: Material[];
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
  setActiveMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
  setAllMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
}) {
  const { data: session } = useSession();
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false); // Add this line
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [currentStock, setCurrentStock] = useState<number | null>(null);
  const [error, setError] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogData>();

  const onSubmit = (data: LogData) => {
    const AddLog = new Promise((resolve, reject) => {
      const selectedMaterialQuantity = selectedMaterial.quantity;
      const transactionQuantity = Number(data.transactionQuantity);
      const newQuantity =
        data.transactionType === "IN"
          ? selectedMaterialQuantity + transactionQuantity
          : selectedMaterialQuantity - transactionQuantity;

      const newData = { ...data, updatedBy: session.user.name, stock: newQuantity };

      axios
        .post("/api/log", newData)
        .then((res) => {
          return axios.get("/api/log");
        })
        .then((res) => {
          setLogs(res.data);
          return axios.get("/api/material");
        })
        .then((res) => {
          setAllMaterials(res.data);
          setActiveMaterials((prev) =>
            prev.map((material) =>
              material._id === selectedMaterial._id ? { ...material, quantity: newQuantity } : material
            )
          );
          const updatedSelectedMaterial = res.data.find((material: Material) => material._id === selectedMaterial._id);
          setSelectedMaterial(updatedSelectedMaterial || null);
          setCurrentStock(updatedSelectedMaterial ? updatedSelectedMaterial.quantity : null);
          handleClose();
          resolve("Success");
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

  type OptionType = "IN" | "OUT";
  const [selectedOption, setSelectedOption] = useState<OptionType>("IN");

  const handleOptionChange = (option: OptionType) => {
    setSelectedOption(option);
    setValue("transactionType", option);
  };

  const handleClose = () => {
    setShow(false);
    setError("");
    reset();
  };
  const handleShow = () => setShow(true);

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
                  isInvalid={!!errors.material}
                  {...register("material", { required: "Please select a material name" })}
                  onChange={(e) => {
                    const selected = activeMaterials.find((material) => material._id === e.target.value);
                    setSelectedMaterial(selected || null);
                    setCurrentStock(selected ? selected?.quantity : null);
                  }}
                >
                  <option value="" disabled selected>
                    Select a Material
                  </option>
                  {activeMaterials.map((material) => (
                    <option key={material._id} value={material._id}>
                      {material.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.material && errors.material.message}</Form.Control.Feedback>
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
                <Form.Control type="number" min={0} isInvalid={!!errors.transactionQuantity} {...register("transactionQuantity", { required: "Please provide a quantity" }) } />
                <Form.Control.Feedback type="invalid">{errors.transactionQuantity && errors.transactionQuantity.message}</Form.Control.Feedback>
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
