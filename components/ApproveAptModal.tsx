import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

function ApproveAptModal({ carryFunction, aptId, aptDate, aptTime, aptEndDate, totalAmount, setShowEndDateError }) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    if (!aptEndDate) {
      setShowEndDateError(true);
      return;
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Button variant="warning" className="text-white" onClick={handleShowModal} style={{fontSize: "14px"}}>
        Approve Appointment
      </Button>

      <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-4">
          <Modal.Title className="pb-3">Approve this appointment?</Modal.Title>
          <p className="mb-1">Finalize the target end date and total service amount.</p>
          <p className="small text-secondary">You can't undo and edit this after approving the appointment.</p>
          <Table bordered responsive size="sm">
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
                <td className="fw-semibold">{new Date(`1970-01-01T${aptTime}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
              </tr>
              <tr className="table-warning">
                <td>Target End Date</td>
                <td className="fw-semibold">{aptEndDate && new Date(aptEndDate).toISOString().split('T')[0]}</td>
              </tr>
              <tr className="table-warning">
                <td>Total Service Amount</td>
                <td className="fw-semibold">{totalAmount}</td>
              </tr>
            </tbody>
          </Table>
          <Row className="ps-3 pe-3 mt-2 mb-2">
            <Button
              variant="warning"
              onClick={() => {
                carryFunction();
                handleCloseModal();
              }}
            >
              Approve Appointment
            </Button>
          </Row>
          <p className="small text-secondary mb-0">
            By clicking this button, it will automatically send a confirmation email to the customer
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ApproveAptModal;
