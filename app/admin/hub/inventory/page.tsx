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
  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [matLoading, setMatLoading] = useState(true);

  useEffect(() => {
    const getMaterials = () => {
      axios.get("/api/material").then((res) => {
        setMaterials(res.data);
        setMatLoading(false);
      });
    };

    const getCategories = () => {
      axios.get("/api/category").then((res) => {
        setCategories(res.data);
        setCatLoading(false);
      });
    };

    const getLogs = () => {
      axios.get("/api/log").then((res) => {
        setLogs(res.data);
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
                  <InvAddCatModal setCategories={setCategories} />
                  {/* Add Material Modal */}
                  <InvAddMaterialModal
                    setMaterials={setMaterials}
                    disabled={!categories.length}
                    categories={categories}
                  />
                  {/* Add Log Modal */}
                  <InvAddLogModal disabled={!materials.length} materials={materials} setLogs={setLogs}/>
                </div>
              </div>
            </Row>
          </Col>
        </Row>

        {/* Inventory Log */}
        <Row className="mb-4">
          <Col>
            <h6 className="fw-bold agapaint-yellow mb-3">Inventory Logs</h6>
            <Card className="border-0 rounded">
              <Table striped hover className="align-middle responsive">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>TransType</th>
                    <th>Material Name</th>
                    <th>TranQty</th>
                    <th>Curent Stock</th>
                    <th>Notes</th>
                    <th>Update Date</th>
                    <th>Update By</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={log._id}>
                      <td>{index + 1}</td>
                      <td>
                        <Badge bg={log.transactionType === "IN" ? "success" : "danger"} pill>
                          {log.transactionType}
                        </Badge>
                      </td>
                      <td>{log.material.name}</td>
                      <td>{log.transactionQuantity}</td>
                      <td>{log.material.quantity}</td>
                      <td>{log.notes}</td>
                      <td>{new Date(log.transactionDate).toDateString()}</td>
                      <td>{log.updatedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>

        {/* Materials Table */}
        <Row className="mb-4">
          <Col xs={8}>
            <h6 className="fw-bold agapaint-yellow mb-3">Current Materials Stock</h6>
            <Card className="border-0" style={{ borderRadius: "10px" }}>
              <Card.Body className="p-2 pb-0 pt-0">
                <Table hover className="align-middle responsive">
                  <thead>
                    <tr>
                      <th>ID</th>
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
                      materials.map((material: Material, index) => (
                        <tr key={material._id}>
                          <td>{index + 1}</td>
                          <td>{material.name}</td>
                          <td>
                            <Badge pill bg="warning" text="dark">
                              {categories.find((category) => category._id === String(material.category))?.name ||
                                "Uncategorized"}
                            </Badge>
                          </td>
                          <td>{material.quantity}</td>
                          <td>
                            <InvUpdateMaterialModal
                              setMaterials={setMaterials}
                              materialData={material}
                              id={material._id}
                              categories={categories}
                            />
                            <InvArchiveMaterialModal setMaterials={setMaterials} materialData={material} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Categories Table */}
          <Col xs={4}>
            <h6 className="fw-bold agapaint-yellow mb-3">Categories</h6>
            <Card className="border-0" style={{ borderRadius: "10px" }}>
              <Card.Body className="p-2 pb-0 pt-0">
                <Table hover className="align-middle responsive">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catLoading ? (
                      // Placeholder Component
                      <PlaceholderRow col="3" />
                    ) : (
                      categories.map((category: Category, index) => (
                        <tr key={category._id}>
                          <td>{index + 1}</td>
                          <td>{category.name}</td>
                          <td>
                            <InvUpdateCatModal
                              setCategories={setCategories}
                              categoryData={category}
                              id={category._id}
                            />
                            <InvArchiveCategoryModal setCategories={setCategories} categoryData={category} />
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
      </Container>
    </main>
  );
}

export default manageInventory;
