import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";

function ApproveAptModal({ carryFunction, aptId, aptDate, aptTime, aptEndDate, totalAmount}) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Button variant="warning" className="text-white" onClick={handleShowModal}>
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
                <td className="fw-semibold">{aptId}</td>
              </tr>
              <tr>
                <td>Apt Date</td>
                <td className="fw-semibold">{aptDate}</td>
              </tr>
              <tr>
                <td>Apt Time</td>
                <td className="fw-semibold">{aptTime}</td>
              </tr>
              <tr className="table-warning">
                <td>Target End Date</td>
                <td className="fw-semibold">{aptEndDate}</td>
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
