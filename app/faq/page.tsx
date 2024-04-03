"use client";

//scss
import faqStyles from "@/styles/faq.module.scss";

//bootsrap
import { Container, Accordion, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

//nav
import Navbar from "@/components/CustomerNav";
import Navbar2 from "@/components/CustomerNav2";
import axios from "axios";
import { Faq } from "@/types";
import Footer from "@/components/CustomerFooter";

const page = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const checkSignInStatus = async () => {
    const session = await getSession();
    return session ? true : false;
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      axios.get("/api/faq").then((res) => {
        setFaqs(res.data);
      });
    };
    fetchFaqs();
    checkSignInStatus().then((isSignedIn) => setIsSignedIn(isSignedIn));
  }, []);

  return (
    <main>
      <section className={faqStyles.background} style={{ backgroundImage: "url(/assets/img/faqbg.png)" }}>
      <Container className="justify-content-center">
        {/*    navbar here */}
        {isSignedIn ? <Navbar2 /> : <Navbar />}
        <h1 className={faqStyles.faqtitle}>Frequently Asked Questions</h1>

        <Row className="justify-content-center">
          <Col xl={10} xs={11}>
            <Accordion alwaysOpen>
              {faqs.map((faq) => (
                <Accordion.Item className={faqStyles.card} eventKey={faq._id} key={faq._id}>
                  <Accordion.Header className={faqStyles.cardtitle}>{faq.question}</Accordion.Header>
                  <Accordion.Body className={faqStyles.cardbody}>{faq.answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
      </section>

      {/* footer */}
      <Footer />
    </main>
  );
};

export default page;
