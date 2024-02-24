import { Row, Col } from "react-bootstrap";
import adminHeaderStyles from "@/styles/adminHeader.module.scss";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AdminHeaderProps } from "@/types";


function AdminHeader({title, subtitle}: AdminHeaderProps) {
  const { data: session } = useSession();
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000); 

  }, [])
  return (
    <header>
      <Row>
        <Col>
          <h4 className="fw-bold mb-1">{title}</h4>
          <p className="lh-1">{subtitle}</p>
        </Col>

        <Col className="text-end d-flex align-items-center justify-content-end align-self-baseline ms-auto">
          <div>
            <h6 className="fw-bold mb-1">Hi, {session.user.name}</h6>
            <p className="lh-1 small fst-italic m-0">{dateTime}</p>
          </div>
          <img
            src={session.user.image}
            alt="Profile"
            className={`rounded-circle ms-2 ${adminHeaderStyles.customImage}`}
          />
        </Col>
      </Row>
    </header>
  );
}

export default AdminHeader;
