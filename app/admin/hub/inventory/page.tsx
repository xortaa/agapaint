"use client";
import { Container, Row, Col, InputGroup, Dropdown, FormControl, Button, Badge, Table, Card } from "react-bootstrap";

import AdminHeader from "@/components/AdminHeader";
import InvAddLogModal from "@/components/InvAddLogModal";
import InvAddCatModal from "@/components/InvAddCatModal";
import InvUpdateCatModal from "@/components/InvUpdateCatModal";
import InvArchiveCategoryModal from "@/components/InvArchiveCategoryModal";
import InvAddMaterialModal from "@/components/InvAddMaterialModal";
import InvUpdateMaterialModal from "@/components/InvUpdateMaterialModal";
import InvArchiveMaterialModal from "@/components/InvArchiveMaterialModal";
import PlaceholderRow from "@/components/PlaceholderRow";

import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import Link from "@/components/Link";

import { Category, Material, Log } from "@/types";
import axios from "axios";
import ToastPromise from "@/components/ToastPromise";

function manageInventory() {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [activeMaterials, setActiveMaterials] = useState<Material[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [matLoading, setMatLoading] = useState(true);
  const [logLoading, setLogLoading] = useState(true);

  useEffect(() => {
    const getMaterials = () => {
      axios.get("/api/material").then((res) => {
        setAllMaterials(res.data);
        setActiveMaterials(res.data.filter((material: Material) => material.isArchived === false));
        setMatLoading(false);
      });
    };

    const getCategories = () => {
      axios.get("/api/category").then((res) => {
        setActiveCategories(res.data.filter((category: Category) => category.isArchived === false));
        setAllCategories(res.data);
        setCatLoading(false);
      });
    };

    const getLogs = () => {
      setLogLoading(true);
      axios.get("/api/log").then((res) => {
        setLogs(res.data);
        setLogLoading(false);
      });
    };

    getMaterials();
    getCategories();
    getLogs();
  }, []);

  return (
    <main className="agapaint-bg">
      <Container fluid className="p-4 min-vh-100">
        <Row>
          {/* Toast Component */}
          <ToastPromise />

          {/* Header Row */}
          <AdminHeader title="Manage Inventory" subtitle="View and track your inventory materials" />

          {/* Search Row */}
          <Col>
            <Row className="mt-2 mb-4" sm={8}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <InputGroup className="w-25">
                  <InputGroup.Text id="basic-addon1">
                    <Search size={20} />
                  </InputGroup.Text>
                  <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                </InputGroup>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <Funnel />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Add Category Modal */}
                <div className="ms-auto d-flex gap-2">
                  <InvAddCatModal setActiveCategories={setActiveCategories} />
                  {/* Add Material Modal */}
                  <InvAddMaterialModal
                    setActiveMaterials={setActiveMaterials}
                    disabled={!activeCategories.length}
                    activeCategories={activeCategories}
                  />
                  {/* Add Log Modal */}
                  <InvAddLogModal
                    disabled={!activeMaterials.length}
                    activeMaterials={activeMaterials}
                    setLogs={setLogs}
                    setActiveMaterials={setActiveMaterials}
                    setAllMaterials={setAllMaterials}
                  />
                </div>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className="mb-4">
          {/* Categories Table */}
          <Col xs={4}>
            <h6 className="fw-bold agapaint-yellow mb-3">Categories</h6>
            <Card className="border-0" style={{ borderRadius: "10px" }}>
              <Card.Body className="p-2 pb-0 pt-0">
                <Table hover className="align-middle responsive">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catLoading ? (
                      // Placeholder Component
                      <PlaceholderRow col="3" />
                    ) : (
                      [...activeCategories].reverse().map((category: Category, index) => (
                        <tr key={category._id}>
                          <td>{activeCategories.length - index}</td>
                          <td>{category.name}</td>
                          <td>
                            <InvUpdateCatModal
                              setActiveCategories={setActiveCategories}
                              categoryData={category}
                              id={category._id}
                            />
                            <InvArchiveCategoryModal
                              setActiveCategories={setActiveCategories}
                              categoryData={category}
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          {/* Materials Table */}
          <Col xs={8}>
            <h6 className="fw-bold agapaint-yellow mb-3">Current Materials Stock</h6>
            <Card className="border-0" style={{ borderRadius: "10px" }}>
              <Card.Body className="p-2 pb-0 pt-0">
                <Table hover className="align-middle responsive">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Material Name</th>
                      <th>Category</th>
                      <th>Current Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Placeholder Component */}
                    {matLoading ? (
                      <PlaceholderRow col="5" />
                    ) : (
                      [...activeMaterials].reverse().map((material: Material, index) => (
                        <tr key={material._id}>
                          <td>{activeMaterials.length - index}</td>
                          <td>{material.name}</td>
                          <td>
                            <Badge pill bg="warning" text="dark">
                              {material.category.name}
                            </Badge>
                          </td>
                          <td>{material.quantity}</td>
                          <td>
                            <InvUpdateMaterialModal
                              setActiveMaterials={setActiveMaterials}
                              materialData={material}
                              id={material._id}
                              activeCategories={activeCategories}
                            />
                            <InvArchiveMaterialModal setMaterials={setActiveMaterials} materialData={material} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Inventory Log */}
        <Row className="mb-4">
          <Col>
            <h6 className="fw-bold agapaint-yellow mb-3">Inventory Logs</h6>
            <Card className="border-0 rounded">
              <Table hover className="align-middle responsive">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Material Name</th>
                    <th>Qty</th>
                    <th>Current Stock</th>
                    <th>Notes</th>
                    <th>Date</th>
                    <th>Log By</th>
                  </tr>
                </thead>
                <tbody>
                  {logLoading ? (
                    <PlaceholderRow col="8" />
                  ) : (
                    [...logs].reverse().map((log, index) => {
                      const mergedMaterials = [
                        ...allMaterials,
                        ...activeMaterials.filter(
                          (activeMaterial) => !allMaterials.some((material) => material._id === activeMaterial._id)
                        ),
                      ];
                      const material = mergedMaterials.find((material) => material._id === log.material._id);
                      return (
                        <tr key={log._id}>
                          <td>{logs.length - index}</td>
                          <td>
                            <Badge bg={log.transactionType === "IN" ? "success" : "danger"} pill>
                              {log.transactionType}
                            </Badge>
                          </td>
                          <td>{material ? material.name : "Material not found"}</td>
                          <td>{log.transactionQuantity}</td>
                          <td>{log.stock}</td>
                          <td>{log.notes}</td>
                          <td>
                            {new Date(log.transactionDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </td>
                          <td>{log.updatedBy}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default manageInventory;
