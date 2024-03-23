"use client";
import { useState } from "react";
import { Modal, Image } from "react-bootstrap";
import logoSecondary from "@/public/assets/logo/logoSecondaryBlack.png";

function PrivacyPolicyModal() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <a className="login-card-footer-nav" onClick={() => setModalShow(true)}>
        Privacy Policy
      </a>

      <PPModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

function PPModal(props) {
  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered size="xl" scrollable>
        <Modal.Body className="p-5">
          <div className="d-flex justify-content-center">
            <Image src={logoSecondary.src} fluid style={{width: "35%"}} />
          </div>
          <h4 className="fw-semibold">Privacy Policy</h4>
          <p>
            This Privacy Policy is in compliance with the{" "}
            <strong>Data Privacy Act of the Philippines (Republic Act No. 10173)</strong> and governs the collection,
            use, and disclosure of personal information by <strong>Agapaint - Automotive Restoration Service ("Agapaint," "we,"
            "us," or "our")</strong>. We are committed to protecting the privacy and security of your personal information. This
            Privacy Policy describes how we collect, use, disclose, and protect the information we collect through our
            website and any related services (collectively, the "Services").
          </p>
          <h6>1. Information We Collect</h6>

          <p>We may collect personal information about you when you use our website or interact with us, including:</p>

          <ul>
            <li>Contact information (such as name, email address, phone number, and mailing address)</li>
            <li>Vehicle information (such as make, model, year, and plate number)</li>
            <li>Other information you provide to us voluntarily</li>
          </ul>

          <p>We may also collect certain information automatically when you visit our website, including:</p>

          <ul>
            <li>Log data (such as your IP address, browser type, operating system, and referring/exiting pages)</li>
            <li>Device information (such as device type, unique device identifier, and mobile network information)</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <p>
            We do not collect any payment information (such as credit card details and other bank information) when
            using our website
          </p>

          <p>
            We do not collect sensitive personal information unless it is provided voluntarily and with your consent.
          </p>

          <h6>2. How We Use Your Information</h6>

          <p>We may use the information we collect for various purposes, including to:</p>

          <ul>
            <li>Provide and improve our Services</li>
            <li>Process transactions and fulfill orders</li>
            <li>Communicate with you about our Services and promotions</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Personalize your experience and tailor content and advertisements to your interests</li>
            <li>Detect, investigate, and prevent fraud and other illegal activities</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>

          <h6>3. Information Sharing</h6>

          <p>We may share your personal information with third parties for the following purposes:</p>

          <ul>
            <li>
              Service providers: We may share your information with third-party service providers who help us operate
              our website, process payments, and perform other functions related to the Services.
            </li>
            <li>
              Business partners: We may share your information with our business partners to offer you products or
              services that may be of interest to you.
            </li>
            <li>
              Legal compliance: We may disclose your information to comply with applicable laws, regulations, or legal
              processes, or to respond to lawful requests from governmental authorities.
            </li>
          </ul>

          <p>
            We do not sell or rent your personal information to third parties for their marketing purposes without your
            explicit consent.
          </p>

          <h6>4. Data Security</h6>

          <p>
            We take reasonable measures to protect the security of your personal information and prevent unauthorized
            access, disclosure, alteration, or destruction. However, please be aware that no method of transmission over
            the internet or electronic storage is completely secure, and we cannot guarantee the absolute security of
            your information.
          </p>

          <h6>6. Children's Privacy</h6>

          <p>
            Our Services are not directed to children under the age of 13, and we do not knowingly collect personal
            information from children under the age of 13. If you are a parent or guardian and believe that your child
            has provided personal information to us, please contact us so that we can delete the child's information.
          </p>

          <h6>7. Updates to this Privacy Policy</h6>

          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.
            We will notify you of any material changes by posting the updated policy on our website or through other
            appropriate channels. Your continued use of our website after the effective date of the revised policy
            constitutes your acceptance of the changes.
          </p>

          <h6>8. Contact Us</h6>

          <p>
            If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us
            at Agapaint's Official Facebook Page.
          </p>

          <p>Thank you for choosing Agapaint - Automotive Restoration Service.</p>
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

export default PrivacyPolicyModal;
