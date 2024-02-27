"use client";
import { Container, Row, Col, InputGroup, Dropdown, FormControl, Button, Badge, Table, Card } from "react-bootstrap";

import AdminHeader from "@/components/AdminHeader";
import LogModal from "@/components/InvLogModal";
import InvAddCatModal from "@/components/InvAddCatModal";
import InvUpdateCatModal from "@/components/InvUpdateCatModal";
import InvArchiveCategoryModal from "@/components/InvArchiveCategoryModal";
import { Search, Funnel, PlusLg, Pencil, InboxFill } from "react-bootstrap-icons";
import Link from "next/link";

function manageInventory() {
  return (
    <main className="agapaint-bg">
      <Container fluid className="p-4 min-vh-100">
        <Row>
          {/* Side Bar Nav */}

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
                  <InvAddCatModal />
                  <Button variant="info" onClick={() => console.log("Add Material")}>
                    <PlusLg className="me-2" />
                    Add Material
                  </Button>
                  {/* Add Log Modal */}
                  <LogModal />
                </div>
              </div>
            </Row>
          </Col>
        </Row>

        {/* Materials Table */}
        <Row className="mb-4">
          <Col>
            <h6 className="fw-bold agapaint-yellow mb-3">Materials</h6>
            <Card className="border-0 rounded">
              <Table striped hover className="align-middle responsive">
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
                  <tr>
                    <td>1</td>
                    <td>Weber Red</td>
                    <td>
                      <Badge bg="primary" pill>
                        Color Paint
                      </Badge>
                    </td>
                    <td>1 L</td>
                    <td>
                      <Pencil size={20} className="text-success me-2" onClick={() => console.log("Edit")} />

                      <InboxFill size={20} className="text-danger" onClick={() => console.log("Delete")} />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <Badge bg="success" pill>
                        In
                      </Badge>
                    </td>
                    <td>Weber Red</td>
                    <td>0</td>
                    <td>1 L</td>
                    <td>Nov 1, 2023</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <Pencil size={20} className="text-success me-2" onClick={() => console.log("Edit")} />

                      <InboxFill size={20} className="text-danger" onClick={() => console.log("Delete")} />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>

        {/* Modals */}
        <InvUpdateCatModal />
        <InvArchiveCategoryModal />
      </Container>
    </main>
  );
}

export default manageInventory;
