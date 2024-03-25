import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import footerStyles from "@/styles/footer.module.scss";
import Image from "next/image";
import footerbg from "@/public/assets/img/footerbg.png";
import horilogo from "@/public/assets/img/horilogo.png";
import { Row, Col, Container } from "react-bootstrap";
import { GeoAlt, Envelope, Telephone, Facebook, Instagram } from "react-bootstrap-icons";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import TermsOfServiceModal from "@/components/TermsOfServiceModal";
import { color } from "chart.js/helpers";

function CustomFooter() {
  return (
    <footer
      className="footer"
      style={{
        backgroundImage: `url(${footerbg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container className={footerStyles.pad}>
        {/* logo */}
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex justify-content-center">
            <Image src={horilogo} alt="Horizontal Logo" height={116} width={363} />
          </Col>
        </Row>
        <br />

        {/* contact details */}
        <Row className="d-flex text-center align-items-center">
          <Col lg={3}>
            <p className={footerStyles.footerWhite}>
              <GeoAlt color="#f1b038" /> &nbsp; Caloocan, Philippines, 1400
            </p>
          </Col>

          <Col lg={3}>
            <p className={footerStyles.footerWhite}>
              <Envelope color="#f1b038" /> &nbsp; luigicayetano@gmail.com
            </p>
          </Col>

          <Col lg>
            <p className={footerStyles.footerWhite}>
              <Telephone color="#f1b038" /> &nbsp; 0927 416 6562
            </p>
          </Col>

          <Col lg>
            <p className={footerStyles.footerWhite}>
              <Facebook color="#f1b038" /> &nbsp; Agapaint
            </p>
          </Col>

          <Col lg>
            <p className={footerStyles.footerWhite}>
              <Instagram color="#f1b038" /> &nbsp; agapaintph
            </p>
          </Col>
        </Row>
        <br />

        {/* terms of services and privacy policy */}
        <Row>
          <Col lg={12} className="text-center">
            <style type="text/css">
              {`
                a {
                  color: #fff;
                  cursor: pointer;
                }
              `}
            </style>
            <TermsOfServiceModal />
            <PrivacyPolicyModal />
          </Col>
        </Row>
        <br />

        {/* copy right */}
        <Row>
          <Col lg={12} className="text-center">
            <p className={footerStyles.footerYellow}>Copyright &copy; 2020 All Rights Reserved </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default CustomFooter;
