"use client";
// SCSS
import signupStyles from "@/styles/signup.module.scss";
// Bootstrap import for componenents
import { Container, Row, Col, Image } from "react-bootstrap";
// Assets
import signupbg from "@/public/assets/img/signupbg.png";
import logoFull from "@/public/assets/logo/logoFull.png";
// Components
import SignUpCard from "@/components/SignUpCard";

function signup() {
  return (
    <main className={signupStyles.background} style={{ backgroundImage: `url(${signupbg.src})` }}>
      <Container className="py-5 d-flex justify-content-around flex-column h-100">
        <Row className="g-0 justify-content-around">
          
          <Col lg={6}>
            <div className="d-flex flex-column justify-content-center h-100 mb-5">
              <Image src={logoFull.src} alt="Agapaint Logo" className={signupStyles.logo} />
            </div>
          </Col>

          <Col lg={6}>
            <SignUpCard />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default signup;
