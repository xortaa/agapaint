import React, { useEffect, useRef, useState } from "react";
import Link from "@/components/Link";
import { Nav, Container, Image, Col, Row } from "react-bootstrap";
import { Grid, Calendar2Week, BoxArrowLeft, BoxSeam, Cart, CreditCard, QuestionSquare } from "react-bootstrap-icons";
import { signOut } from "next-auth/react";

//scss
import sidenavStyles from "@/styles/sidenav.module.scss";

const Sidenav = () => {
  const [expanded, setExpanded] = useState(false);
  const [activePage, setActivePage] = useState("");

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  useEffect(() => {
    const storedActivePage = localStorage.getItem("activePage");
    if (storedActivePage) {
      setActivePage(storedActivePage);
    }
  }, []);

  const handleItemClick = (itemName) => {
    setActivePage(itemName);
    localStorage.setItem("activePage", itemName);
  };

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/admin/signup"
    });
  };

  return (
    <Container
      className={`side-nav ${expanded ? "expanded" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Row>
        <Col>
          <div className={`${sidenavStyles.collapsed_sidebar} d-flex flex-column justify-content-between`}>
            <div>
              <Image
                src="/assets/logo/agapaintBlackLogo.png"
                width={70}
                height={80}
                alt="Collapsed Logo"
                className="mx-auto d-block"
                style={{ marginTop: "10px", marginBottom: "95px" }}
              />
              <ul className={sidenavStyles.custom_ul}>
                <li onClick={() => handleItemClick("dashboard")}>
                  <Link
                    href="admin/hub/dashboard"
                    className={`${sidenavStyles.sidebar_collapsed_link} ${
                      activePage === "dashboard" ? sidenavStyles.active_link : ""
                    }`}
                  >
                    <Grid size={28} className="mb-1" /> Dashboard
                  </Link>
                </li>
                <li onClick={() => handleItemClick("appointment")}>
                  <Link
                    href="/admin/hub/appointment"
                    className={`${sidenavStyles.sidebar_collapsed_link} ${
                      activePage === "appointment" ? sidenavStyles.active_link : ""
                    }`}
                  >
                    <Calendar2Week size={27} className="mb-1" /> Appointment
                  </Link>
                </li>
                <li onClick={() => handleItemClick("inventory")}>
                  <Link
                    href="/admin/hub/inventory"
                    className={`${sidenavStyles.sidebar_collapsed_link} ${
                      activePage === "inventory" ? sidenavStyles.active_link : ""
                    }`}
                  >
                    <BoxSeam size={27} className="mb-1" /> Inventory
                  </Link>
                </li>
                <li onClick={() => handleItemClick("service")}>
                  <Link
                    href="/admin/hub/service"
                    className={`${sidenavStyles.sidebar_collapsed_link} ${
                      activePage === "service" ? sidenavStyles.active_link : ""
                    }`}
                  >
                    <Cart size={27} className="mb-1" /> Service
                  </Link>
                </li>
                <li onClick={() => handleItemClick("sales")}>
                  <Link
                    href="/admin/hub/sales"
                    className={`${sidenavStyles.sidebar_collapsed_link} ${
                      activePage === "sales" ? sidenavStyles.active_link : ""
                    }`}
                  >
                    <CreditCard size={27} /> Revenue
                  </Link>
                </li>
                <li onClick={() => handleItemClick("faq")}>
                  <Link
                    href="/admin/hub/faq"
                    className={`${sidenavStyles.sidebar_collapsed_link} ${
                      activePage === "faq" ? sidenavStyles.active_link : ""
                    }`}
                  >
                    <QuestionSquare size={27} className="mb-1" /> FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <ul className={sidenavStyles.custom_ul}>
              <li onClick={() => handleItemClick("signout")}>
                <Link
                  href="/admin/signup"
                  className={`${sidenavStyles.sidebar_collapsed_link} ${
                    activePage === "signout" ? sidenavStyles.active_link : ""
                  }`}
                >
                  <BoxArrowLeft size={27} />
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          {expanded && (
            <div className={`${sidenavStyles.displayed_sidebar} d-flex flex-column justify-content-between`}>
              <div>
                <Image
                  src="/assets/logo/agapaintHubLogo.png"
                  width={155}
                  height={150}
                  alt="Collapsed Logo"
                  className="mx-auto d-block my-1"
                />
                <hr className={sidenavStyles.custom_hr}></hr>

                <ul className={sidenavStyles.custom_ul}>
                  <li onClick={() => handleItemClick("dashboard")}>
                    <Link
                      href="/admin/hub/dashboard"
                      className={`${sidenavStyles.sidebar_displayed_link} ${
                        activePage === "dashboard" ? sidenavStyles.active_link : ""
                      }`}
                    >
                      <Grid className="mx-2 mb-1" size={22} /> Dashboard
                    </Link>
                  </li>
                  <li onClick={() => handleItemClick("appointment")}>
                    <Link
                      href="/admin/hub/appointment"
                      className={`${sidenavStyles.sidebar_displayed_link} ${
                        activePage === "appointment" ? sidenavStyles.active_link : ""
                      }`}
                    >
                      <Calendar2Week className="mx-2 mb-1" size={20} /> Appointment
                    </Link>
                  </li>
                  <li onClick={() => handleItemClick("inventory")}>
                    <Link
                      href="/admin/hub/inventory"
                      className={`${sidenavStyles.sidebar_displayed_link} ${
                        activePage === "inventory" ? sidenavStyles.active_link : ""
                      }`}
                    >
                      <BoxSeam className="mx-2 mb-1" size={20} /> Inventory
                    </Link>
                  </li>
                  <li onClick={() => handleItemClick("service")}>
                    <Link
                      href="/admin/hub/service"
                      className={`${sidenavStyles.sidebar_displayed_link} ${
                        activePage === "service" ? sidenavStyles.active_link : ""
                      }`}
                    >
                      <Cart className="mx-2 mb-1" size={20} /> Services
                    </Link>
                  </li>
                  <li onClick={() => handleItemClick("sales")}>
                    <Link
                      href="/admin/hub/sales"
                      className={`${sidenavStyles.sidebar_displayed_link} ${
                        activePage === "sales" ? sidenavStyles.active_link : ""
                      }`}
                    >
                      <CreditCard className="mx-2 mb-1" size={20} /> Revenue
                    </Link>
                  </li>
                  <li onClick={() => handleItemClick("faq")}>
                    <Link
                      href="/admin/hub/faq"
                      className={`${sidenavStyles.sidebar_displayed_link} ${
                        activePage === "faq" ? sidenavStyles.active_link : ""
                      }`}
                    >
                      <QuestionSquare className="mx-2 mb-1" size={20} /> FAQs
                    </Link>
                  </li>
                </ul>
              </div>
              <ul className={sidenavStyles.custom_ul}>
                <li>
                  <Link href="/admin/signup" className={sidenavStyles.signout_displayed} onClick={handleSignOut}>
                    <BoxArrowLeft className="mx-2 mb-1" size={20} /> Sign out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Sidenav;
