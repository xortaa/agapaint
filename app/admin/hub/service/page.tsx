"use client";

import React from "react";
import AdminServiceStyles from "@/styles/AdminService.module.scss";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Dropdown, FormControl } from "react-bootstrap";
import AdminHeader from "@/components/AdminHeader";
import { Funnel, Search } from "react-bootstrap-icons";
import AddService from "@/components/AddServiceModal";
import EditService from "@/components/UpdateServiceModal";
import ArchiveServiceModal from "@/components/ArchiveServiceModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { Service } from "@/types";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Zoom from "next-auth/providers/zoom";

function AdminManageServicePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // const notify = () => {
  //   toast.success("🦄 Wow so easy!", {
  //     position: "bottom-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //     transition: Bounce,
  //   });
  // };

  // const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 2000));
  // toast.promise(resolveAfter3Sec, {
  //   pending: "Promise is pending",
  //   success: "Promise resolved 👌",
  //   error: "Promise rejected 🤯",
  // });

  const toastPromise = () => new Promise((resolve) => setTimeout(resolve, 3000));
  toast.promise(toastPromise, {
    pending: "Promise is pending",
    success: "Promise resolved 👌",
    error: "Promise rejected 🤯",
  });

  useEffect(() => {
    axios.get("/api/service").then((res) => {
      setServices(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="agapaint-bg">
      <Container fluid className="p-4 min-vh-100">
        <Row>
          {/* Toast */}
          <button onClick={toastPromise}>Notify !</button>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            limit={5}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />

          {/* Header Row */}
          <AdminHeader title="Manage Services" subtitle="View all your services offered" />

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

                <div className="ms-auto d-flex gap-2">
                  <AddService setServices={setServices} />
                </div>
              </div>
            </Row>
          </Col>
        </Row>

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
            {loading ? (
              <tr>
                <td colSpan={7}>Loading...</td>
              </tr>
            ) : (
              services.map((service: Service, index) => (
                <tr key={service._id}>
                  <td>{service._id}</td>
                  <td>
                    <img className={AdminServiceStyles.tableimg} src={service.image} alt="Service" />
                  </td>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>₱{service.price}</td>
                  <td>{service.carType}</td>
                  <td>
                    <EditService setServices={setServices} serviceData={service} />
                    <ArchiveServiceModal setServices={setServices} serviceData={service} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </main>
  );
}

export default AdminManageServicePage;
