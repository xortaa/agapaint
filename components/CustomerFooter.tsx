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
        backgroundColor: 'black'
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
        <Row className="d-flex text-center align-items-center" style={{paddingTop: '20px'}}>
          <Col lg={3}>
            <p className={footerStyles.footerWhite}>
              <GeoAlt color="#f1b038" /> &nbsp; Manila, Philippines, 1000
            </p>
          </Col>

          <Col lg={3}>
            <p className={footerStyles.footerWhite} onClick={() => window.location.href = `mailto:support@jisucar.com`} style={{cursor: "pointer"}}>
              <Envelope color="#f1b038" /> &nbsp; support@jisucar.com
            </p>
          </Col>

          <Col lg>
            <p className={footerStyles.footerWhite} onClick={() => window.location.href = `tel:09274166562`} style={{cursor: "pointer"}}>
              <Telephone color="#f1b038" /> &nbsp; 0923 456 7890
            </p>
          </Col>

          <Col lg>
            <p className={footerStyles.footerWhite} onClick={() => window.open('https://www.facebook.com/', '_blank')} style={{cursor: "pointer"}}>
              <Facebook color="#f1b038" /> &nbsp; Jisucar Philippines
            </p>
          </Col>

          <Col lg>
            <p className={footerStyles.footerWhite} onClick={() => window.open('https://www.instagram.com/', '_blank')} style={{cursor: "pointer"}}>
              <Instagram color="#f1b038" /> &nbsp; jisucarph
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
            <p className={footerStyles.footerYellow}>Copyright &copy; 2024 All Rights Reserved </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default CustomFooter;
