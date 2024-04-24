import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

function ApproveAptModal({ carryFunction, aptId, aptDate, aptTime, customer }) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="danger"
          className="text-white mt-4 mb-2 fw-bold"
          onClick={handleShowModal}
          style={{ fontSize: "14px", width: "90%" }}
        >
          CANCEL APPOINTMENT
        </Button>
      </div>

      <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-4">
          <Modal.Title className="pb-3">Cancel this appointment?</Modal.Title>
          <p className="mb-1">"Are you certain you wish to cancel this scheduled appointment?"</p>
          <p className="small text-secondary">
            Please note, once this appointment is cancelled, it cannot be restored or edited
          </p>
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
                <td className="fw-semibold">
                  {new Date(`1970-01-01T${aptTime}:00`).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
              </tr>
              <tr className="table-warning">
                <td>Customer</td>
                <td className="fw-semibold">{customer}</td>
              </tr>
            </tbody>
          </Table>
          <Row className="ps-3 pe-3 mt-2 mb-2">
            <Button
              variant="danger"
              onClick={() => {
                carryFunction();
                handleCloseModal();
              }}
            >
              Cancel Appointment
            </Button>
          </Row>
          <p className="small text-secondary mb-0">
            By clicking this button, it will automatically send a cancellation email to the customer and the appointment
            will be archived.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ApproveAptModal;
