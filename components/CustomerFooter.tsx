import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import footerStyles from "@/styles/footer.module.scss";
import Image from 'next/image';
import footerbg from "@/public/assets/img/footerbg.png";
import horilogo from "@/public/assets/img/horilogo.png";
import { Row, Col, Container } from 'react-bootstrap';
import { GeoAlt, Envelope, Telephone, Facebook, Instagram } from 'react-bootstrap-icons';

function CustomFooter() {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${footerbg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container className={footerStyles.pad}>

        {/* logo */}
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex justify-content-center">
            <Image src={horilogo} alt="Horizontal Logo" height={116} width={363}/>
          </Col>
        </Row><br />

        {/* contact details */}
        <Row className="d-flex text-center align-items-center">
          <Col lg={3}>
            <p className={footerStyles.footerWhite}><GeoAlt color="#FFC72C" /> &nbsp; Caloocan, Philippines, 1400</p>
          </Col>

          <Col lg={3}>
            <p className={footerStyles.footerWhite}><Envelope color="#FFC72C"/> &nbsp; luigicayetano@gmail.com</p>
          </Col>

          <Col lg>
            <p className={footerStyles.footerWhite}><Telephone color="#FFC72C" /> &nbsp; 0927 416 6562</p>
          </Col>

          <Col lg>
            <p className={footerStyles.footerWhite}><Facebook color="#FFC72C" /> &nbsp; Agapaint</p>
          </Col>

          <Col lg>
            <p className={footerStyles.footerWhite}><Instagram color="#FFC72C"/> &nbsp; agapaintph</p>
          </Col>
        </Row><br />

        {/* copy right */}
        <Row>
          <Col lg={12} className="text-center">
              <p className={footerStyles.footerYellow}>Copyright &copy; 2020 All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default CustomFooter

