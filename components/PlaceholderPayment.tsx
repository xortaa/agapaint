import { Container, Col, Card, Row, Placeholder } from "react-bootstrap";

function PlaceholderPayment() {
  return (
    <section>
      <Container className="p-4 p-lg-5">
        <Row className="pt-1 pt-lg-3 gap-4 gap-lg-0">
          <Col lg={8}>
            <Card style={{ borderRadius: "15px" }}>
              <Card.Header className="p-3 ps-4 pe-4">
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />
                </Placeholder>
              </Card.Header>
              <Card.Body className="p-2 ps-4 pe-4">
                {/* Services View */}
                <Row>
                  {" "}
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                    <Placeholder xs={8} />
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                    <Placeholder xs={8} />
                  </Placeholder>
                </Row>

                <hr />

                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card style={{ borderRadius: "15px" }} className="mb-4">
              <Card.Body className="p-2 ps-4 pe-4 mt-3 mb-3">
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={9} /> <Placeholder xs={3} />
                  <Placeholder xs={9} /> <Placeholder xs={3} />
                  <Placeholder xs={9} /> <Placeholder xs={3} />
                  <Placeholder xs={9} /> <Placeholder xs={3} />
                  <Placeholder xs={9} /> <Placeholder xs={3} />
                </Placeholder>
              </Card.Body>
            </Card>

            {/* Contact Support Card */}
            <Card style={{ borderRadius: "15px" }}>
              <Card.Body className="p-2 ps-4 pe-4 text-center mt-3 mb-3">
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                  <Placeholder xs={8} />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PlaceholderPayment;
