import { Card, Placeholder, Col } from "react-bootstrap";
import custaptStyles from "@/styles/custapt.module.scss";
import StatusBadge from "@/components/StatusBadge";

function PlaceholderCard() {
  return (
    <Col lg={4} md={6} sm={12}>
      <Card className={`${custaptStyles.card} p-2`} style={{ borderRadius: "18px" }}>
        <Card.Body className="lh-sm">
          <div className="d-flex justify-content-between mb-3">
            <Placeholder.Button variant="secondary" xs={6} />
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />
            </Placeholder>
          </div>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
            <Placeholder xs={8} />
          </Placeholder>
          <hr />
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} />  <Placeholder xs={6} />{" "}
            <Placeholder xs={8} />
          </Placeholder>
          <hr />
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> 
          </Placeholder>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PlaceholderCard;
