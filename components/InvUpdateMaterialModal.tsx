import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";
import axios from "axios";
import { Material, MaterialData, Category } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function InvUpdateMaterialModal({
  setActiveMaterials,
  materialData,
  id,
  activeCategories,
}: {
  setActiveMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
  materialData: Material;
  id: string;
  activeCategories: Category[];
}) {
  const [show, setShow] = useState(false);
  const [material, setMaterial] = useState<Material>();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MaterialData>();

  useEffect(() => {
    axios.get(`/api/material/${materialData._id}`).then((res) => {
      setMaterial(res.data.name);
      for (const [key, value] of Object.entries(res.data)) {
        setValue(key as keyof MaterialData, value as string);
      }
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);

  const onUpdate = (data: Material) => {
    const category = activeCategories.find((category) => category._id === String(data.category));

    const UpdateMaterial = new Promise((resolve, reject) => {
      axios
        .patch(`/api/material/${materialData._id}`, data)
        .then((res) => {
          const updatedMaterial = { ...res.data, category: category ? category : res.data.category };
          handleClose();
          setActiveMaterials((prev) =>
            prev.map((material) => (material._id === materialData._id ? updatedMaterial : material))
          );
          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to update material: ", error);
          reject(error);
        });
    });

    toast.promise(UpdateMaterial, {
      pending: "Updating Material...",
      success: "Material updated!",
      error: "Failed to update Material, Please try again.",
    });
  };

  return (
    <>
      <Pencil size={20} className="text-success me-2" onClick={handleShow}>
        <MdEdit /> Update Material
      </Pencil>

      <Modal show={show} onHide={handleClose} centered>
        <Form onSubmit={handleSubmit(onUpdate)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Material</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Material Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter material name"
                isInvalid={!!errors.name}
                required
                {...register("name", { required: "Please provide a material name" })}
              />
              <Form.Control.Feedback type="invalid">{errors.name && errors.name.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Category Name</Form.Label>
                  <Form.Select aria-label="Select category" required {...register("category")}>
                    {activeCategories.map((category: Category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Current Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter current stock"
                    min="0"
                    {...register("quantity", { required: true })}
                    isInvalid={!!errors.quantity}
                    disabled
                  />
                  {errors.quantity && (
                    <Form.Control.Feedback type="invalid">Current stock is required</Form.Control.Feedback>
                  )}
                </Col>
              </Row>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default InvUpdateMaterialModal;
