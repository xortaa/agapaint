"use client";
import { Container, Row, Col, Image, Table, Badge, InputGroup, Card, Button, ButtonGroup } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import AptCard from "@/components/AptCard";

import myProfileBg from "@/public/assets/img/myprofilebg.png";
import myAppointmentBg from "@/public/assets/img/myAppointmentBg.png";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Appointment, User } from "@/types";
import Footer from "@/components/CustomerFooter";
import Navbar from "@/components/CustomerNav";
import Banner from "@/components/Banner";
import Link from "next/link";
import { List, Grid, Check2 } from "react-bootstrap-icons";

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

  // Format the name to be capitalized
  let capitalizedFullName = "";
  let capitalizedFirstName = "";
  if (session && session.user && session.user.name) {
    const nameParts = session.user.name.split(" ");
    const firstName = nameParts[0].toLowerCase();
    capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    capitalizedFullName = nameParts
      .map((namePart) => {
        const lowerCaseNamePart = namePart.toLowerCase();
        return lowerCaseNamePart.charAt(0).toUpperCase() + lowerCaseNamePart.slice(1);
      })
      .join(" ");
  }
  // View Option: List View or Card View
  const [isListView, setIsListView] = useState(true); // add a state variable to track the active view
  const [view, setView] = useState(false);
  const toggleHandler = (e) => {
    e.preventDefault();
    setView(true);
  };
  const toggleHandler1 = (e) => {
    e.preventDefault();
    setView(false);
  };

  return (
    <main className="agapaint-bg">
      {/* Navbar Here */}
      <Navbar />

      {/* My Profile Header */}
      {/* BreadCrumbs */}
      <Banner userFName={capitalizedFirstName} page="profile" />

      {/* Body */}
      <Container className="p-5">
        <Row className="pt-3">
          {/* Profile Column */}
          <Col lg={3}>
            <Card style={{ borderRadius: "15px" }}>
              <Card.Body className="p-4 pt-5 text-center">
                <Image src={session?.user?.image} roundedCircle width={110} />
                <p className="fs-5 fw-semibold mt-3 mb-1">{capitalizedFullName}</p>
                <Badge pill bg="success-subtle" className="mb-3 text-success-emphasis fw-normal">
                  Client
                </Badge>
                {/* Book Appointment */}
                <Link href="/booking">
                  <Button variant="warning" className="mb-3" style={{ padding: "0.50rem 1rem", fontSize: "0.85rem" }}>
                    Book New Appointment
                  </Button>
                </Link>
                {/* Email */}
                <Card style={{ borderRadius: "18px", backgroundColor: "#f6f8f9" }}>
                  <Card.Body>
                    <p className="text-start text-secondary mb-1" style={{ fontSize: "0.8rem" }}>
                      Google Email
                    </p>
                    <Card.Text className="text-start" style={{ fontSize: "0.8rem" }}>
                      {session?.user?.email}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={9}>
            <Card style={{ borderRadius: "15px" }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between">
                  <p className="mb-1 fw-semibold text-dark text-start fs-5">My Appointments</p>
                  <p className="small text-end text-secondary">
                    Click to see further details of your appointment, including your balance.
                  </p>
                </div>
                <hr className="mt-2" />
                <ButtonGroup>
                  <Button
                    className="listButton btn-success-subtle"
                    size="sm"
                    variant={isListView ? "success" : "outline-secondary"}
                    onClick={(e) => {
                      toggleHandler1(e);
                      setIsListView(true);
                    }}
                  >
                    {isListView && <Check2 className="slide-in" size={24} />}
                    <List size={20} />
                  </Button>
                  <Button
                    className="cardButton"
                    size="sm"
                    variant={!isListView ? "secondary" : "outline-secondary"}
                    onClick={(e) => {
                      toggleHandler(e);
                      setIsListView(false);
                    }}
                  >
                    {!isListView && <Check2 className="slide-in" size={24} />}
                    <Grid size={20} />
                  </Button>
                </ButtonGroup>

                <Row className="g-4">
                  {!view ? (
                    <h1></h1>
                  ) : !user ? (
                    <p>Loading...</p>
                  ) : (
                    user.appointment.map((apt: Appointment) => (
                      <AptCard key={apt._id} appointment={apt} onClick={handleRowClick} />
                    ))
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Footer Here */}
      <Footer />
    </main>
  );
}

export default custAppointment;
