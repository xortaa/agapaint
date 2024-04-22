"use client";
import {
  Container,
  Row,
  Col,
  Image,
  Badge,
  InputGroup,
  Card,
  Button,
  ButtonGroup,
  Table,
  Pagination,
} from "react-bootstrap";
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
import Navbar2 from "@/components/CustomerNav2";
import Banner from "@/components/Banner";
import Link from "next/link";
import { List, Grid, Check2 } from "react-bootstrap-icons";
import AptList from "@/components/AptList";
import PlaceholderRow from "@/components/PlaceholderRow";
import PlaceholderCard from "@/components/PlaceholderCard";
import { getSession } from "next-auth/react";
import icon from "@/public/assets/img/iconApt.svg";
import { Messenger } from "react-bootstrap-icons";

function custAppointment() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  const handleRowClick = (appointment: Appointment) => {
    router.push(`appointment/payment?id=${appointment._id}`);
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

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setView(true);
      setIsListView(false);
    }
  }, []);

  const toggleHandler = (e) => {
    e.preventDefault();
    setView(true);
  };

  const toggleHandler1 = (e) => {
    e.preventDefault();
    setView(false);
  };

  // Logged in?
  const [isSignedIn, setIsSignedIn] = useState(false);

  const checkSignInStatus = async () => {
    const session = await getSession();
    return session ? true : false;
  };

  useEffect(() => {
    checkSignInStatus().then((isSignedIn) => setIsSignedIn(isSignedIn));
  }, []);

  // pagination
  // Add state variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); //set limit of items per page

  // Subtract 1 from currentPage before multiplying by itemsPerPage
  const indexOfLastItem = (currentPage - 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem;

  const reversedAppointments = user && user.appointment ? [...user.appointment].reverse() : [];
  const currentItems = reversedAppointments.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const totalPages = user ? Math.ceil(user.appointment.length / itemsPerPage) : 0;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    // Always render the first page, the last page, the current page, and two pages around the current page
    if (i === 1 || i === totalPages || i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
      pages.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i}
        </Pagination.Item>
      );
    } else if (i === 2 || i === currentPage + 2) {
      pages.push(<Pagination.Ellipsis key={i} />);
    }
  }

  return (
    <main className="agapaint-bg">
      {/* Navbar Here */}
      {isSignedIn ? <Navbar2 /> : <Navbar />}

      {/* My Profile Header */}
      {/* BreadCrumbs */}
      <Banner userFName={capitalizedFirstName} page="profile" />

      {/* Body */}
      <Container className="p-4 p-lg-5">
        <Row className="pt-1 pt-lg-3 gap-4 gap-lg-0">
          {/* Profile Column */}
          <Col lg={3}>
            <Card style={{ borderRadius: "15px" }}>
              <Card.Body className="p-4 pt-5 text-center">
                <Image src={session?.user?.image} roundedCircle width={110} />
                <p className="fs-5 fw-semibold mt-3 mb-1">{capitalizedFullName}</p>
                <p className="mb-0">
                  <Badge pill bg="success-subtle" className="mb-3 text-success-emphasis fw-normal">
                    Client
                  </Badge>
                </p>

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

            {/* Contact Support Card */}
            <Card style={{ borderRadius: "15px" }} className="mt-4">
              <Card.Body className="p-2 ps-4 pe-4">
                <p className="mt-3 mb-2 fw-semibold text-dark" >
                Have Queries? We're at your service! <span className="small fw-normal">You can usually expect a response within a day.</span>
                </p>
                {/* <p className="small text-secondary" style={{ textAlign: "justify" }}>
                 Our lines are open from 8:00 AM to 5:00 PM, Mondays to Fridays.
                </p> */}
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-dark"
                    className="mb-3"
                    href="https://m.me/agapaint"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Messenger className="me-2" />
                    Contact Us
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Appointment Card */}
          <Col lg={9}>
            <Card style={{ borderRadius: "15px" }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-1 fw-semibold text-dark fs-5">My Appointments</p>
                  <p className="small text-secondary mb-0 d-none d-sm-block responsive-text">
                    Click to see further details of your appointment, including your balance.
                  </p>
                  <ButtonGroup>
                    <Button
                      className="listButton btn-success-subtle"
                      size="sm"
                      variant={isListView ? "secondary" : "outline-secondary"}
                      style={
                        isListView
                          ? { backgroundColor: "var(--bs-warning-bg-subtle)", color: "var(--bs-secondary-color)" }
                          : {}
                      }
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
                      style={
                        !isListView
                          ? { backgroundColor: "var(--bs-warning-bg-subtle)", color: "var(--bs-secondary-color)" }
                          : {}
                      }
                      onClick={(e) => {
                        toggleHandler(e);
                        setIsListView(false);
                      }}
                    >
                      {!isListView && <Check2 className="slide-in" size={24} />}
                      <Grid size={18} />
                    </Button>
                  </ButtonGroup>
                </div>
                <hr className="mt-3" />

                {/* Appointments View */}
                <Row className="g-4">
                  {!view ? (
                    // List View
                    <Table responsive hover className="align-middle">
                      <thead>
                        <tr>
                          <th className="fw-semibold" style={{ width: "24px" }}>
                            ID
                          </th>
                          <th className="fw-semibold text-center" style={{ width: "90px" }}>
                            Date
                          </th>
                          <th className="fw-semibold">Appointment</th>
                          <th className="fw-semibold text-center" style={{ width: "200px" }}>
                            Service Status
                          </th>
                          <th className="fw-semibold text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody style={{ cursor: "pointer" }}>
                        {!user ? (
                          <PlaceholderRow col="5" />
                        ) : user.appointment.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center p-5">
                              <Image src={icon.src} fluid width={50} />
                              <p className="fs-3 text-secondary mt-3 mb-0">No appointments scheduled yet</p>
                              <p className="fs-3 text-secondary mb-0">Let's get started with your first one.</p>
                              <p className="text-secondary">
                                Kickstart your Agapaint adventure! Book your appointment now!
                              </p>
                            </td>
                          </tr>
                        ) : (
                          [...currentItems].map((apt: Appointment) => (
                            <AptList key={apt._id} appointment={apt} onClick={() => handleRowClick(apt)} />
                          ))
                        )}
                      </tbody>
                    </Table>
                  ) : // Card View
                  !user ? (
                    <PlaceholderCard />
                  ) : !user || user.appointment.length === 0 ? (
                    <div className="text-center p-5">
                      <Image src={icon.src} fluid width={50} />
                      <p className="fs-3 text-secondary mt-3 mb-0">No appointments scheduled yet</p>
                      <p className="fs-3 text-secondary mb-0">Let's get started with your first one.</p>
                      <p className="text-secondary">Kickstart your Agapaint adventure! Book your appointment now!</p>
                    </div>
                  ) : (
                    [...user.appointment]
                      .reverse()
                      .map((apt: Appointment) => (
                        <AptCard key={apt._id} appointment={apt} onClick={() => handleRowClick(apt)} />
                      ))
                  )}
                </Row>
                <div className="d-flex justify-content-end">
                  <Pagination className="secondary-pagination m-0 mt-2 me-1">
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                    {pages}
                    <Pagination.Next
                      disabled={currentPage === pages.length}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    />
                  </Pagination>
                </div>
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
