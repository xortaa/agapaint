"use client";

import React from "react";
import AdminServiceStyles from "@/styles/AdminService.module.scss";
import { Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";

function AddService(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Service Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Service Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" accept=".jpg,.jpeg,.png" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Service Price</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Car Type</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className={AdminServiceStyles.addserviceformclose} onClick={props.onHide}>
          Close
        </Button>
        <Button className={AdminServiceStyles.addserviceformadd}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

function UpdateService(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Update Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Service Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Service Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" accept=".jpg,.jpeg,.png" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Service Price</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Car Type</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className={AdminServiceStyles.addserviceformclose} onClick={props.onHide}>
          Close
        </Button>
        <Button className={AdminServiceStyles.updateserviceformupdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ArchiveService(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Archive Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to archive?</p>
        <Row>
          <Col>
            <p>Service Name:</p>
          </Col>
          <Col>
            <p>placeholder</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Service Description:</p>
          </Col>
          <Col>
            <p>placeholder</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Upload Image:</p>
          </Col>
          <Col>
            <p>placeholder</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Service Price:</p>
          </Col>
          <Col>
            <p>placeholder</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Car Type:</p>
          </Col>
          <Col>
            <p>placeholder</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className={AdminServiceStyles.addserviceformclose} onClick={props.onHide}>
          Close
        </Button>
        <Button className={AdminServiceStyles.archiveserviceformarchive}>Archive</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AdminManageServicePage() {
  const [modalAddServiceShow, setAddServiceModalShow] = React.useState(false);
  const [modalUpdateServiceShow, setUpdateServiceModalShow] = React.useState(false);
  const [modalArchiveServiceShow, setArchiveServiceModalShow] = React.useState(false);
  return (
    <main className={AdminServiceStyles.headercontainer}>
      <Container>
        <Row>
          <Col className="col-7">
            <h1 className={AdminServiceStyles.headertitle}>Manage Services</h1>
            <h6 className={AdminServiceStyles.headersubtitle}>View all your services offered</h6>
          </Col>

          <Col className="col-3">
            <h1 className={AdminServiceStyles.admintitle}>Hi, AdminLuigi</h1>
            <h6 className={AdminServiceStyles.adminsubtitle}>{new Date().toLocaleString() + ""}</h6>
          </Col>

          <Col className="col-2">
            <img src="https://via.placeholder.com/256" alt="Admin" className={AdminServiceStyles.profilepic} />
          </Col>
        </Row>

        <Row>
          <Col>
            <input className={AdminServiceStyles.searchinput} type="text" placeholder="Search for a service" />
          </Col>
        </Row>
      </Container>

      <Container className={AdminServiceStyles.addservicecontainer}>
        <Row>
          <Col>
            <Button
              className={AdminServiceStyles.addservicebtn}
              variant="primary"
              onClick={() => setAddServiceModalShow(true)}
            >
              + Add Service
            </Button>

            <AddService show={modalAddServiceShow} onHide={() => setAddServiceModalShow(false)} />
          </Col>
        </Row>
      </Container>

      <Container className={AdminServiceStyles.table}>
        <Table hover className="align-middle text-left">
          <thead>
            <tr>
              <th className={AdminServiceStyles.tableheader}>ID</th>
              <th className={AdminServiceStyles.tableheader}>Image</th>
              <th className={AdminServiceStyles.tableheader}>Service Name</th>
              <th className={AdminServiceStyles.tableheader}>Description</th>
              <th className={AdminServiceStyles.tableheader}>Price</th>
              <th className={AdminServiceStyles.tableheader}>Car Type</th>
              <th className={AdminServiceStyles.tableheader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img className={AdminServiceStyles.tableimg} src="https://via.placeholder.com/72" alt="Service" />
              </td>
              <td>Car Wash</td>
              <td>Basic car wash</td>
              <td>₱200</td>
              <td>Sedan</td>
              <td>
                <Button
                  className={AdminServiceStyles.actionbuttons}
                  variant="info"
                  onClick={() => setUpdateServiceModalShow(true)}
                >
                  Edit
                </Button>
                <UpdateService show={modalUpdateServiceShow} onHide={() => setUpdateServiceModalShow(false)} />
                <Button
                  className={AdminServiceStyles.actionbuttons}
                  variant="danger"
                  onClick={() => setArchiveServiceModalShow(true)}
                >
                  Archive
                </Button>
                <ArchiveService show={modalArchiveServiceShow} onHide={() => setArchiveServiceModalShow(false)} />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <img className={AdminServiceStyles.tableimg} src="https://via.placeholder.com/72" alt="Service" />
              </td>
              <td>Car Wash</td>
              <td>Basic car wash</td>
              <td>₱200</td>
              <td>Sedan</td>
              <td>
                <Button
                  className={AdminServiceStyles.actionbuttons}
                  variant="info"
                  onClick={() => setUpdateServiceModalShow(true)}
                >
                  Edit
                </Button>
                <UpdateService show={modalUpdateServiceShow} onHide={() => setUpdateServiceModalShow(false)} />
                <Button
                  className={AdminServiceStyles.actionbuttons}
                  variant="danger"
                  onClick={() => setArchiveServiceModalShow(true)}
                >
                  Archive
                </Button>
                <ArchiveService show={modalArchiveServiceShow} onHide={() => setArchiveServiceModalShow(false)} />
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </main>
  );
}

export default AdminManageServicePage;
