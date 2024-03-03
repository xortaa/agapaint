"use client";

import React from "react";
import SignInCard from "@/components/AdminSignupCard";
import signInBg from "@/public/assets/img/adminSignInBg.png";
import adminSignUpStyle from "@/styles/adminSignup.module.scss";
import { Row, Col, Container } from "react-bootstrap";

//ADMIN TO PLS LANG WAG KA MALITO

function SignUpPage() {
  return (
    <main className={adminSignUpStyle.background} style={{ backgroundImage: `url(${signInBg.src})` }}>
      <Container className="py-5 d-flex justify-content-around flex-column h-100">
        <Row className="justify-content-around">
          {/* welcome message in signin */}
          <Col className={adminSignUpStyle.welcome_col_custom}>
            <h1 className="fw-bold m-0 p-0" style={{ color: "#f1b038", fontSize: "115px" }}>
              AGAPAINT
            </h1>
            {/* STYLES FOR HUB */}
            <h1 className="fw-medium m-0 p-0" style={{ fontSize: "100px", color: "white" }}>
              Hub
            </h1>
            {/* STYLES FOR SIGN IN DESC BELOW TITLE */}
            <p className="fw-light mt-1 p-0" style={{ fontSize: "36px", color: "white" }}>
              Paint | Body Repair | Detailing
            </p>
          </Col>

          <Col className="me-5 mb-2">{<SignInCard />}</Col>
        </Row>
      </Container>
    </main>
  );
}

export default SignUpPage;
