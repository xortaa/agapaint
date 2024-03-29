"use client";
// SCSS
import signupStyles from "@/styles/signup.module.scss";
// Bootstrap import for componenents
import { Container, Row, Col, Image, Card, Form, Button } from "react-bootstrap";
// Assets
import signupbg from "@/public/assets/img/about3.png";
import logoFull from "@/public/assets/logo/logoFullHd.png";
import logoSecondary from "@/public/assets/logo/logoSecondaryBlack.png";
import logoDark from "@/public/assets/logo/logoDark.png";
import logoWordSlogan from "@/public/assets/logo/logoWordSlogan.png";
// Components
import SignUpCard from "@/components/SignUpCard";
import Link from "@/components/Link";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import TermsOfServiceModal from "@/components/TermsOfServiceModal";

function signup() {
  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0 agapaint-bg">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} xl={10}>
            <Card className="login-card" style={{ borderRadius: "20px" }}>
              <Row>
                <Col md={5} className="d-none d-md-block">
                  <Card.Img
                    src={signupbg.src}
                    alt="login"
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "35% 0",
                      borderRadius: "13px",
                      filter: "brightness(80%)",
                    }}
                  />
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <div className="brand-wrapper">
                      <Image src={logoDark.src} alt="logo" className="logo" />
                    </div>
                    <p className="login-card-description">Create and Sign In into your account</p>
                    <p>Your Agapaint journey begins here. Access all appointment features using your Google Account.</p>
                    <SignUpCard role="customer"/>
                    <Link href="/" className="forgot-password-link">
                      Return to Home
                    </Link>
                    <p className="login-card-footer-text">
                      Explore Agapaint quality at its best!
                      {/* <a href="#!" className="text-reset">
                    Register here
                  </a> */}
                    </p>
                    <div className="login-card-footer-nav">
                      <TermsOfServiceModal />
                      <PrivacyPolicyModal />
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default signup;
