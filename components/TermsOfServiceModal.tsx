"use client";
import { useState } from "react";
import { Modal, Image } from "react-bootstrap";
import logoSecondary from "@/public/assets/logo/logoSecondaryBlack.png";

function TermsOfServiceModal() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <a className="login-card-footer-nav me-2" onClick={() => setModalShow(true)}>
        Terms Of Service
      </a>

      <TOSModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

function TOSModal(props) {
  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered size="xl" scrollable>
        <Modal.Body className="p-5">
          <div className="d-flex justify-content-center">
            <Image src={logoSecondary.src} fluid style={{width: "35%"}} />
          </div>
          <h4 className="fw-semibold">Terms of Service</h4>
          <p>
            These Terms of Service ("Terms") outline the guidelines and agreements between{" "}
            <strong>Agapaint - Automotive Restoration Service ("Agapaint," "we," "us," or "our")</strong> and Customers
            ("Customers," "Users," "Individuals") regarding the use of our website and related services (collectively,
            the "Services"). By accessing or using the Services, Customers agree to comply with these Terms.
          </p>
          <h6>1. User Responsibilities and Appointment Service Agreements</h6>
          <p>
            Customers are expected to responsibly manage appointments with Agapaint, ensuring punctuality and adherence
            to scheduled appointment times. Any changes or cancellations to appointments should be communicated promptly
            to Agapaint. Efficient management of appointments and clear communication are essential priorities for
            Agapaint. Users agree to schedule appointments responsibly and communicate promptly with Agapaint regarding
            any changes or cancellations.
          </p>

          <h6>2. Professional Conduct</h6>
          <p>
            Agapaint is committed to delivering excellent service and professionalism in all customer interactions.
            Customers agree to conduct themselves in a professional manner when using our Services. This includes
            maintaining respectful communication and cooperation throughout the service process.
          </p>

          <h6>3. Payment Responsibility</h6>
          <p>
            Transparent invoicing and payment processes are maintained by Agapaint, aligning consistently with
            agreed-upon service terms to ensure clarity for all parties involved. Users agree to adhere to the
            agreed-upon payment terms and promptly settle any outstanding invoices.
          </p>

          <h6>4. Confidentiality</h6>
          <p>
            The confidentiality of customer information and business data is paramount for Agapaint. Users agree to
            respect the confidentiality of all sensitive information provided to or obtained through the use of our
            Services.
          </p>

          <h6>5. Compliance with Safety Protocols</h6>
          <p>
            Users are expected to comply with all safety protocols and regulations implemented by Agapaint to ensure a
            secure environment for owners, customers, and employees. This entails following safety instructions and
            guidelines provided by Agapaint's staff during service appointments.
          </p>

          <h6>6. Adherence to Terms and Policies</h6>
          <p>
            Upon accessing this website, individuals agree to comply with the Terms of Service, Privacy Policy, and any
            other policies or guidelines laid out by Agapaint. Failure to adhere to these terms may result in the
            termination of their access to Agapaint's services.
          </p>

          <p>
            By utilizing Agapaint's services, individuals acknowledge and agree to abide by the aforementioned terms
            concerning the use of the services provided. Failure to comply with these terms may lead to the termination
            of their access to Agapaint's services and may also incur additional consequences as deemed necessary by
            Agapaint.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-dark ps-3 pe-3" onClick={props.onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TermsOfServiceModal;
