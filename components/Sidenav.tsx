"use client";

import React, { useState } from "react";
import { Nav, Container, Image, Col, Row } from "react-bootstrap";
import { Grid, GridFill, Calendar2Week, BoxSeam, Cart, CreditCard } from "react-bootstrap-icons";

//scss
import sidenavStyles from "@/styles/sidenav.module.scss";

const Sidenav = () => {
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    <Container
      className={`side-nav${expanded ? "expanded" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* COLLAPSED SIDENAV */}
      <Row>
        <Col>
          <Nav className={sidenavStyles.collapsed_sidebar}>
            <Image
              src="/assets/logo/agapaintBlackLogo.png"
              width={70}
              height={80}
              alt="Collapsed Logo"
              className="mx-auto d-block mt-1 mb-5"
            />
            <Nav.Item className="mt-5">
              <Nav.Link href="dashboard" className={sidenavStyles.sidebar_collapsed_link}>
                <Grid size={28} />
              </Nav.Link>
              <Nav.Link href="appointment" className={sidenavStyles.sidebar_collapsed_link}>
                <Calendar2Week size={27} />
              </Nav.Link>
              <Nav.Link href="inventory" className={sidenavStyles.sidebar_collapsed_link}>
                <BoxSeam size={27} />
              </Nav.Link>
              <Nav.Link href="service" className={sidenavStyles.sidebar_collapsed_link}>
                <Cart size={27} />
              </Nav.Link>
              <Nav.Link href="sales" className={sidenavStyles.sidebar_collapsed_link}>
                <CreditCard size={27} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      {/* DISPLAYED SIDENAV */}
      <Row>
        <Col>
          {expanded && (
            <Nav className={sidenavStyles.displayed_sidebar}>
              <Image
                src="/assets/logo/agapaintHubLogo.png"
                width={155}
                height={150}
                alt="Collapsed Logo"
                className="mx-auto d-block my-1"
              />
              <hr className={sidenavStyles.custom_hr}></hr>

              <Nav.Item>
                <Nav.Link href="dashboard" className={sidenavStyles.sidebar_displayed_link}>
                  <Grid className="mx-2 mb-1" size={22} /> Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="appointment" className={sidenavStyles.sidebar_displayed_link}>
                  <Calendar2Week className="mx-2 mb-1" size={20} /> Appointment
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="inventory" className={sidenavStyles.sidebar_displayed_link}>
                  <BoxSeam className="mx-2 mb-1" size={20} /> Inventory
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="service" className={sidenavStyles.sidebar_displayed_link}>
                  <Cart className="mx-2 mb-1" size={20} /> Services
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="sales" className={sidenavStyles.sidebar_displayed_link}>
                  <CreditCard className="mx-2 mb-1" size={20} /> Revenue
                </Nav.Link>
              </Nav.Item>
            </Nav>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Sidenav;
