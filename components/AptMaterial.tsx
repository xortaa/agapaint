import { Modal, Form, Row, Col, Button, ButtonGroup, Table } from "react-bootstrap";

import { XCircle } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Appointment, Material, MaterialUsed } from "../types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function AptMaterial({
  setActiveAppointments,
  appointment,
  show,
  hide,
}: {
  setActiveAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  appointment: Appointment;
  show: any;
  hide: any;
}) {
  // Material Used Modal
  const { data: session, status } = useSession();
  const [muShow, setMuShow] = useState(false);
  const [showAptMaterial, setShowAptMaterial] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const handleCloseModal = () => {
    setMuShow(false);
    setShowAptMaterial(false);
  };
  const [appointmentMaterials, setAppointmentMaterials] = useState<Material[]>([]);
  const [materialsUsed, setMaterialsUsed] = useState<MaterialUsed[]>([]);
  const [material, setMaterial] = useState<Material>();
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    axios.get(`/api/material`).then((res) => {
      setMaterials(res.data.filter((material: Material) => !material.isArchived));
    });

    axios.get(`/api/appointment/${appointment._id}`).then((res) => {
      setAppointmentMaterials(res.data.material);
    });

    setMaterialsUsed(appointment.materialUsed);
  }, []);

  const handleMaterialChange = (event) => {
    const selectedMaterialId = event.target.value;
    const selectedMaterial = materials.find((material) => material._id === selectedMaterialId);
    setMaterial(selectedMaterial);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  const handleUpdateAppointmentMaterial = () => {
    const data = { appointment: appointment._id, material: material._id, quantity };
    const addMaterialUsed = new Promise((resolve, reject) => {
      axios
        .post(`/api/materialUsed`, data)
        .then((res) => {
          console.log(res.data);
          const customizedData = {
            ...res.data,
            material: {
              ...res.data.material,
              name: res.data.material.name,
            },
          };
          setMaterialsUsed((prevMaterialsUsed) => {
            const existingMaterial = prevMaterialsUsed.find(
              (mu) => mu.material._id === material._id
            );

            if (existingMaterial) {
              // If the material already exists, update the quantity
              return prevMaterialsUsed.map((mu) =>
                mu.material._id === material._id
                  ? { ...mu, quantity: Number(mu.quantity) + Number(quantity) }
                  : mu
              );
            } else {
              // If the material doesn't exist, add a new entry
              return [...prevMaterialsUsed, customizedData];
            }
          });

          setActiveAppointments((prev) =>
            prev.map((apt) => {
              if (apt._id === appointment._id) {
                const existingMaterial = apt.materialUsed.find(
                  (mu) => mu.material._id === material._id
                );

                if (existingMaterial) {
                  // If the material already exists, update the quantity
                  return {
                    ...apt,
                    materialUsed: apt.materialUsed.map((mu) =>
                      mu.material._id === material._id
                        ? { ...mu, quantity: Number(mu.quantity) + Number(quantity) }
                        : mu
                    ),
                  };
                } else {
                  // If the material doesn't exist, add a new entry
                  return { ...apt, materialUsed: [...apt.materialUsed, customizedData] };
                }
              }
              return apt;
            })
          );
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

    toast.promise(addMaterialUsed, {
      pending: "Adding material used...",
      success: "Material used added successfully",
      error: "Failed to add material used",
    });

    const logData = {
      material: material._id,
      transactionType: "OUT",
      transactionQuantity: quantity,
      transactionDate: new Date(),
      notes: `Material used for APT#${appointment.nanoid}`,
      updatedBy: session.user.name,
      stock: material.quantity - quantity,
    };

    const addLog = new Promise((resolve, reject) => {
      axios
        .post(`/api/log`, logData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

    toast.promise(addLog, {
      pending: "Adding log...",
      success: "Log added successfully",
      error: "Failed to add log",
    });
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() => {
          setMuShow(hide);
          setShowAptMaterial(hide);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">{`Materials Used APT#${appointment.nanoid}`}</Modal.Title>{" "}
        </Modal.Header>
        <Form>
          <Modal.Body className="p-4">
            <p>Materials Used</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Material Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {materialsUsed.map((materialUsed) => (
                  <tr key={materialUsed._id}>
                    <td>{materialUsed.material.name}</td>
                    <td>{materialUsed.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>Material Name</Form.Label>
                <Form.Select aria-label="material-name-select" onChange={handleMaterialChange}>
                  <option value="" disabled selected>
                    Select a material
                  </option>
                  {materials.map((material) => (
                    <option key={material._id} value={material._id}>
                      {material.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>Quantity Used</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="0"
                  min={0}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hide}>
              Close
            </Button>
            <Button variant="warning" onClick={handleUpdateAppointmentMaterial}>
              Save Materials
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AptMaterial;
