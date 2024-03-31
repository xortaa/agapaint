import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaArchive } from "react-icons/fa";
import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";
import { Material, MaterialData } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";

function InvArchiveMaterialModal({
  materialData,
  setMaterials,
}: {
  materialData: Material;
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
}) {
  const [show, setShow] = useState(false);
  const [material, setMaterial] = useState<Material>();
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  const onDelete = (data: Material) => {
    const ArchiveMaterial = new Promise((resolve, reject) => {
      axios
        .delete(`/api/material/${materialData._id}`)
        .then((res) => {
          handleClose();
          setMaterials((prev) => prev.filter((material) => material._id !== materialData._id));
          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to archive material: ", error);
          reject(error);
        });
    });

    toast.promise(ArchiveMaterial, {
      pending: "Archiving Material...",
      success: "Material archived!",
      error: "Failed to archive Material, Please try again.",
    });
  };

  return (
    <>
      <InboxFill size={20} className="text-danger" onClick={handleShow}>
        <FaArchive /> Archive Material
      </InboxFill>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Archive Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to archive?
          <br />
          <br />
          Material Name: <em>{materialData.name}</em>
          <br />
          Current Stock: <em>{materialData.quantity}</em>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => onDelete(materialData)}>
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InvArchiveMaterialModal;
