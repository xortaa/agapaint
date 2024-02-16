import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import navStyles from "@/styles/navbar.module.scss";
import Image from "next/image";

function Navbar() {

  // for sticky navbar
  const navbarRef = useRef(null);
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        navbarRef.current.classList.toggle(
          navStyles.sticky,
          window.scrollY > 0
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBarsClick = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>
      <div ref={navbarRef} className={navStyles.navbar1}>
        <Link href="/">
          <Image src="/assets/img/icon.png" alt="logo" width={70} height={70} />
        </Link>

        {/* for clickable bar */}
        <FaBars color="#ffc72c" className={navStyles.bars} onClick={handleBarsClick}/> 
        <div className={`${navStyles.navbar} ${isNavVisible ? navStyles.open : ''}`}>
          <ul className={navStyles.ul}>
            <li>
              <Link href="/" className={navStyles.ulItem}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className={navStyles.ulItem}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/" className={navStyles.ulItem}>
                Appointment
              </Link>
            </li>
            <li>
              <Link href="/" className={navStyles.ulItem}>
                FAQ
              </Link>
            </li>
            <li>
              <Button className={navStyles.btnSign}>Sign Up</Button>
            </li>
            <li>
              <Button className={navStyles.btnLog}>Log In</Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;