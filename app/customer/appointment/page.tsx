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
import { User } from "@/types";

function custAppointment() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  const handleRowClick = () => {
    router.push("appointment/payment");
  };

  useEffect(() => {
    if (session?.user?._id) {
      console.log(session);
      axios
        .get(`/api/users/${session?.user?._id}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [session?.user?._id]);

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
          {!user ? (
            <p>Loading...</p>
          ) : (
            user.appointment.map((apt) => {
              const date = new Date(apt.date);
              const formattedDate = `${date.toLocaleString("default", {
                month: "long",
              })} ${date.getDate()}, ${date.getFullYear()}`;
              return (
                <AptCard
                  key={apt._id}
                  onClick={handleRowClick}
                  aptId={apt._id}
                  aptDate={formattedDate}
                  aptTime={apt.time}
                  carInfo={`${apt.carManufacturer} ${apt.carModel}`}
                  plateNo={apt.plateNumber}
                  paymentTerm={apt.paymentTerm}
                  totalServiceAmount={apt.servicesId.reduce((acc, service) => acc + service.price, 0)}
                  serviceStatus={apt.status}
                />
              );
            })
          )}
        </Row>
      </Container>

      {/* Footer Here */}
    </main>
  );
}

export default custAppointment;
