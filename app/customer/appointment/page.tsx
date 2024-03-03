"use client";
import { Container, Row, Col, Image, Table, Badge, InputGroup, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import AptCard from "@/components/AptCard";

import myProfileBg from "@/public/assets/img/myprofilebg.png";
import myAppointmentBg from "@/public/assets/img/myAppointmentBg.png";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";



function custAppointment() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState({})

  const handleRowClick = () => {
    router.push("appointment/payment");
  };

  useEffect(() => {
    axios.get(`api/users/${session?.user?._id}`)
  }, [session?.user?._id])

  

  return (
    <main>
      {/* Navbar Here */}

      {/* My Profile Header */}
      <Header img={myProfileBg.src} text="My Profile" color="agapaint-yellow" />

      {/* My Profile Body */}
      <Container className="p-5 justify-content-around">
        <Row className="d-flex justify-content-center">
          <Col xl={3} lg={2} />
          <Col xl={6} lg={8}>
            <Card className="mx-auto shadow border-0">
              <Card.Body>
                <Row>
                  <Col md={4} className="d-flex justify-content-center">
                    <Image src={session?.user?.image} roundedCircle fluid />
                  </Col>
                  <Col md={8} className="align-self-center text-center text-lg-left mt-3 mt-lg-0 mt-md-0">
                    <h3 className="fw-bold">{session?.user?.name}</h3>
                    <Card.Text>{session?.user?.email}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3} lg={2} />
        </Row>
      </Container>

      {/* My Appointments Header */}
      <Header img={myAppointmentBg.src} text="My Appointment" color="agapaint-black" />

      {/* My Appointments Body */}
      <Container className="p-5 justify-content-around mb-5">
        <Row className="d-flex mb-2">
          <h1 className="agapaint-yellow fw-bold">Appointment Overview</h1>
          <p>Click a card to see further details of your appointment, including your balance.</p>
        </Row>
        <Row className="g-4">
          

          <AptCard
            onClick={handleRowClick}
            aptId="APT #001"
            aptDate="January, 6, 2024"
            aptTime="12:30 PM"
            carInfo="Sedan Kia Rio 2016"
            plateNo="PLT 456"
            paymentTerm="Partial"
            totalServiceAmount="7,800.00"
            serviceStatus="Complete"
          />
          {/* Placeholder */}
          <AptCard
            onClick={handleRowClick}
            aptId="APT #002"
            aptDate="November 18, 2023"
            aptTime="10:00 AM"
            carInfo="Honda Civic 2016"
            plateNo="SHJ 891"
            paymentTerm="Partial"
            totalServiceAmount="20,000.00"
            serviceStatus="Ongoing"
          />
          <AptCard
            onClick={handleRowClick}
            aptId="APT #003"
            aptDate="October 22, 2023"
            aptTime="4:00 PM"
            carInfo="Honda Civic 2016"
            plateNo="KAI 140"
            paymentTerm="Full"
            totalServiceAmount="30,000.00"
            serviceStatus="Pending"
          />
        </Row>
      </Container>

      {/* Footer Here */}
    </main>
  );
}

export default custAppointment;
