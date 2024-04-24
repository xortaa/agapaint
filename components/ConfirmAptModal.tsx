import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

function ConfirmAptModal({ carryFunction, aptId, aptDate, aptTime, aptEndDate, totalAmount }) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
    
  return (
    <>
      <Button variant="success" onClick={handleShowModal} style={{fontSize: "14px"}}>
        Confirm Appointment
      </Button>

      <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-4">
          <Modal.Title className="pb-3">Confirm this appointment?</Modal.Title>
          <p className="mb-1">Are you sure that you have verified the initial payment of the customer?</p>
          <p className="small text-secondary">You can't undo this step after confirming the appointment.</p>
          
          <Table bordered striped responsive size="sm">
            <tbody>
              <tr>
                <td>ID</td>
                <td className="fw-semibold">#{aptId}</td>
              </tr>
              <tr>
                <td>Apt Date</td>
                <td className="fw-semibold">{aptDate}</td>
              </tr>
              <tr>
                <td>Apt Time</td>
                <td className="fw-semibold">{aptTime}</td>
              </tr>
              <tr>
                <td>Target End Date</td>
                <td className="fw-semibold">{aptEndDate}</td>
              </tr>
              <tr>
                <td>Total Service Amount</td>
                <td className="fw-semibold">{totalAmount}</td>
              </tr>
            </tbody>
          </Table>
          <Row className="ps-3 pe-3 mt-2 mb-2">
            <Button
              variant="success"
              onClick={() => {
                carryFunction();
                handleCloseModal();
              }}
            >
              Verified & Confirmed Appointment
            </Button>
          </Row>
          <p className="small text-secondary mb-0">
            By clicking this button, you are confirming the appointment and the service status will be reflected as 'Ongoing'.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmAptModal;
