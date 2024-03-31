"use client";
import { Card, Col, Container, Row } from "react-bootstrap";

import React from "react";
import pagenotfound from "@/public/assets/img/pagenotfound.gif";
import { BiFontSize } from "react-icons/bi";

function NotFoundPage() {
  return (
    <Container
      fluid
      className="px-3 d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f2f6f9", overflow: "auto" }}
    >
      <Row className="px-5 pb-4 pt-3 d-flex align-items-center justify-content-center">
        <Col sm={12} md={5} className="m-1 text-center order-md-1 order-lg-1 order-xl-1 order-2">
          <p className="p-0 m-0" style={{ fontSize: "55px", fontWeight: "610", color: "#189AB4" }}>
            PAGE NOT FOUND
          </p>
          <p className="mb-4" style={{ fontSize: "25px" }}>
            Seems like you went off the radar...
          </p>
          <p className="text-muted" style={{ fontSize: "19px" }}>
            The page you are looking for does not exist. It might have been removed, had its name changed, or is
            temporarily unavailable. For now, let's get you back on track:
          </p>
          <div className="my-4 d-flex flex-column flex-sm-row align-items-center justify-content-center">
            <button
              className="p-3 my-1 bg-warning border-0"
              style={{ fontSize: "18px", borderRadius: "14px" }}
              onClick={() => window.history.back()}
            >
              Previous Page
            </button>
            <button
              className="p-3 ms-sm-3 bg-warning border-0"
              style={{ fontSize: "18px", borderRadius: "14px" }}
              onClick={() => (window.location.href = "/home")}
            >
              Home Page
            </button>
          </div>
        </Col>
        <Col
          sm={12}
          md={6}
          className="m-1 align-items-center justify-content-center order-md-2 order-lg-2 order-xl-2 order-1"
        >
          <img
            src={pagenotfound.src}
            alt="Page Not Found"
            className="img-fluid d-none d-sm-block"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default NotFoundPage;
