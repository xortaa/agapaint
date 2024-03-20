"use client";

import React from "react";
import Link from "@/components/Link";
import { Button, Card, Container, Row, Col, Image } from "react-bootstrap";
import GoogleButton from "react-google-button";

//scss
import signUpStyles from "@/styles/adminSignup.module.scss";

function SignIn() {
  return (
    <Container>
      {/* SIGNIN CARD */}
      <Card className={signUpStyles.custom_card}>
        <Card.Body>
          <Card.Title>
            <h1 className="mx-2 mt-1">Sign In</h1>
          </Card.Title>
          <Card.Text className="mx-2 mt-3 fw-normal fs-5">
            To access Agapaint Hub, please make sure your email is registered:
          </Card.Text>
          {/* Google Auth Button */}
          <div className="my-4 mx-2">
            <GoogleButton
              onClick={() => {
                console.log("Google button clicked");
              }}
            />
          </div>
          <hr className="my-4 mx-3" />
          <Link
            href="/"
            className="my-3 mx-3 text-end fw-normal text-decoration-none text-primary d-block"
            style={{
              fontSize: "18px",
            }}
          >
            Return Home
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignIn;
