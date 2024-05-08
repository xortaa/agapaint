import React, { useEffect, useRef, useState } from "react";
import Link from "@/components/Link";
import { Button, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import navStyles from "@/styles/navbar.module.scss";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import process from "process";

function Navbar2() {
  const navbarRef = useRef(null);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: `${window.location.origin}/`,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        navbarRef.current.classList.toggle(navStyles.sticky, window.scrollY > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedActiveItem = localStorage.getItem("activeItem");
    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    }
  }, []);

  const handleBarsClick = () => {
    setIsNavVisible(!isNavVisible);
    document.body.classList.toggle(navStyles.bodyOverlay, isNavVisible);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    localStorage.setItem("activeItem", itemName);
  };

  return (
    <>
      <div
        className={navStyles.overlay}
        onClick={handleBarsClick}
        style={{ display: isNavVisible ? "block" : "none" }}
      />
      <div ref={navbarRef} className={navStyles.navbar1}>
        <Link href="/">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/assets/img/icon.png"
              alt="logo"
              width={70}
              height={70}
              onClick={() => handleItemClick("home")}
            />
            <span className={navStyles.spanText} style={{ marginLeft: "10px" }} onClick={() => handleItemClick("home")}>
              AGAPAINT
            </span>
          </div>
        </Link>

        {/* hamburger for smaller screen sizes */}
        <FaBars color="#ffc72c" className={navStyles.bars} onClick={handleBarsClick} />

        <div className={`${navStyles.navbar} ${isNavVisible ? navStyles.open : ""}`}>
          <ul className={navStyles.ul}>
            <li onClick={() => handleItemClick("home")}>
              <Link href="/" className={`${navStyles.ulItem} ${activeItem === "home" ? navStyles.active : ""}`}>
                Home
              </Link>
            </li>
            <li onClick={() => handleItemClick("services")}>
              <Link
                href="/customer/service"
                className={`${navStyles.ulItem} ${activeItem === "services" ? navStyles.active : ""}`}
              >
                Services
              </Link>
            </li>
            <li onClick={() => handleItemClick("faq")}>
              <Link href="/faq" className={`${navStyles.ulItem} ${activeItem === "faq" ? navStyles.active : ""}`}>
                FAQ
              </Link>
            </li>
            <li onClick={() => handleItemClick("booking")}>
              <Link
                href="/booking"
                className={`${navStyles.ulItem} ${activeItem === "booking" ? navStyles.active : ""}`}
              >
                <button className={navStyles.btnLog}>Book Now</button>
              </Link>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="0" id="dropdown-basic" className={navStyles.dropdown}>
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className={`rounded-circle ms-2 ${navStyles.customImage}`}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href={session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? "/admin/hub/dashboard" : "/customer/appointment"}>
                    {session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? "Admin Dashboard" : "My Profile"}
                  </Dropdown.Item>

                  <Dropdown.Item className={navStyles.dropdownItem} onClick={handleSignOut}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar2;
