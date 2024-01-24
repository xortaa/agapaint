"use client";
import { Container, Row, Col, Image, Table, Badge, InputGroup, Card } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";

import myProfileBg from "@/public/assets/img/myprofilebg.png";
import myAppointmentBg from "@/public/assets/img/myAppointmentBg.png";

function custAppointment() {
   const router = useRouter();

   const handleRowClick = () => {
     router.push('appointment/payment'); 
   };

  return (
    <main>
      {/* Navbar Here */}

      {/* My Profile Header */}
      <Header imgSrc={myProfileBg.src} headerText="My Profile" textColor="agapaint-yellow" />

      {/* My Profile Body */}
      <Container className="py-5 justify-content-around mb-5">
        <Row className="d-flex">
          <Col className="d-flex justify-content-end">
            <Image src="https://placekitten.com/171/180" roundedCircle />
          </Col>
          <Col className="px-5">
            <h1 className="fw-bold">Hello, Tsoknat!</h1>
            <p>Tsoknat Dimagiba</p>
            <p>tsoknat.dimagiba.cics@ust.edu.ph</p>
          </Col>
        </Row>
      </Container>

      {/* My Appointments Header */}
      <Header imgSrc={myAppointmentBg.src} headerText="My Appointment" textColor="agapaint-black" />

      {/* My Appointments Body */}
      <Container className="py-5 justify-content-around mb-5">
        <Row className="d-flex mb-5">
          <h1 className="agapaint-yellow fw-bold">Appointment Overview</h1>
          <p>Click a row to see further details of your appointment, including your balance.</p>

          <Card className="p-0 mb-5">
            <Card.Body className="p-0">
              <Table striped responsive hover className="m-0 ps-3">
                <thead>
                  <tr className="align-middle">
                    <th>Plate#</th>
                    <th>Car</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Payment Term</th>
                    <th>Total Service Amount</th>
                    <th>Service Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {data.map((item, index) => (
                    <tr key={index} onClick={() => handleRowClick(item)}>
                      <td>{item.plate}</td>
                      <td>{item.carModel}</td>
                      <td>{item.aptDate}</td>
                      <td>{item.aptTime}</td>
                      <td>{item.paymentTerm}</td>
                      <td>{item.totalService}</td>
                      <td>
                        <InputGroup>
                           <InputGroup.Text className="text-primary fw-bold">{item.totalService}</InputGroup.Text>
                        </InputGroup>
                      </td>
                    </tr>
                  ))} */}

                  {/* Placeholder */}
                  <tr className="align-middle" onClick={handleRowClick} >
                    <td>PLT 456</td>
                    <td>Sedan Kia Rio 2016</td>
                    <td>Nov 15, 2023</td>
                    <td>11:00 AM</td>
                    <td>Partial</td>
                    <td>7,800.00</td>
                    <td>
                      <InputGroup>
                        <InputGroup.Text className="text-primary fw-bold">For Release</InputGroup.Text>
                      </InputGroup>
                    </td>
                  </tr>

                  {/* Placeholder */}
                  <tr className="align-middle" onClick={handleRowClick} >
                    <td>SHJ 891</td>
                    <td>Honda Civic 2016</td>
                    <td>Nov 18, 2023</td>
                    <td>2:00 PM</td>
                    <td>Partial</td>
                    <td>20,300.00</td>
                    <td>
                      <InputGroup>
                        <InputGroup.Text className="text-success fw-bold">Complete</InputGroup.Text>
                      </InputGroup>
                    </td>
                  </tr>

                  {/* Placeholder */}
                  <tr className="align-middle" onClick={handleRowClick} >
                    <td>KAI 140</td>
                    <td>Honda Civic 2016</td>
                    <td>Nov 23, 2023</td>
                    <td>10:00 AM</td>
                    <td>Full</td>
                    <td>30,300.00</td>
                    <td>
                      <InputGroup>
                        <InputGroup.Text className="text-success fw-bold">Complete</InputGroup.Text>
                      </InputGroup>
                    </td>
                  </tr>

                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Row>
      </Container>

      {/* Footer Here */}
    </main>
  );
}

export default custAppointment;
