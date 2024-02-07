import React from "react";
import AdminServiceStyles from "@/styles/AdminService.module.scss";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

function AdminManageServicePage() {
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
            <Button className={AdminServiceStyles.addservicebtn} variant="primary">
              + Add Service
            </Button>
          </Col>
        </Row>
      </Container>

      <Container className={AdminServiceStyles.table}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Car Type</th>
              <th>Actions</th>
            </tr>
          </thead>
        </Table>
      </Container>
    </main>
  );
}

export default AdminManageServicePage;
