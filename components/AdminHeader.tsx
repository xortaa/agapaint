import { Row, Col } from "react-bootstrap";
import adminHeaderStyles from "@/styles/adminHeader.module.scss";

function AdminHeader(aHProps) {
  return (
    <header>
      <Row>
        <Col>
          <h4 className="fw-bold mb-1">{aHProps.title}</h4>
          <p className="lh-1">{aHProps.subtitle}</p>
        </Col>

        <Col className="text-end d-flex align-items-center justify-content-end align-self-baseline ms-auto">
          <div>
            <h6 className="fw-bold mb-1">Hi, {aHProps.userName}</h6>
            <p className="lh-1 small fst-italic m-0">{aHProps.dateTime}</p>
          </div>
          <img
            src={aHProps.userPhoto}
            alt="Profile"
            className={`rounded-circle ms-2 ${adminHeaderStyles.customImage}`}
          />
        </Col>
      </Row>
    </header>
  );
}

export default AdminHeader;
