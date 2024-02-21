"use client";

//scss
import faqStyles from "@/styles/faq.module.scss";

//bootsrap
import { Container, Accordion, Row } from "react-bootstrap";

import React, { useState } from "react";

const page = () => {
  return (
    <main className={faqStyles.background} style={{ backgroundImage: "url(/assets/img/faqbg.png)" }}>
      <Container className="justify-content-center">
        {/*    navbar here */}
        <h1 className={faqStyles.faqtitle}>Frequently Asked Questions</h1>
      </Container>

      <Accordion>
        <Accordion.Item className={faqStyles.card} eventKey="0">
          <Accordion.Header className={faqStyles.cardtitle}>Question 1</Accordion.Header>
          <Accordion.Body className={faqStyles.cardbody}>
            Lorem ipsum dolor sit amet. Aut fuga deleniti sed quae repellat et impedit aliquid ea praesentium pariatur.
            Quo debitis galisum ad mollitia illum sit deserunt beatae qui sint velit id nulla commodi At ullam iusto et
            ullam temporibus. Ad magni quisquam aut culpa voluptas non earum labore sit ipsum laudantium ad natus fugit
            qui placeat dolores. Vel sapiente itaque 33 officia dolor a nihil voluptates aut quam omnis aut enim
            consequatur et tempore eius.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item className={faqStyles.card} eventKey="1">
          <Accordion.Header className={faqStyles.cardtitle}>Question 2</Accordion.Header>
          <Accordion.Body className={faqStyles.cardbody}>
            Lorem ipsum dolor sit amet. Aut fuga deleniti sed quae repellat et impedit aliquid ea praesentium pariatur.
            Quo debitis galisum ad mollitia illum sit deserunt beatae qui sint velit id nulla commodi At ullam iusto et
            ullam temporibus. Ad magni quisquam aut culpa voluptas non earum labore sit ipsum laudantium ad natus fugit
            qui placeat dolores. Vel sapiente itaque 33 officia dolor a nihil voluptates aut quam omnis aut enim
            consequatur et tempore eius.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item className={faqStyles.card} eventKey="2">
          <Accordion.Header className={faqStyles.cardtitle}>Question 3</Accordion.Header>
          <Accordion.Body className={faqStyles.cardbody}>
            Lorem ipsum dolor sit amet. Aut fuga deleniti sed quae repellat et impedit aliquid ea praesentium pariatur.
            Quo debitis galisum ad mollitia illum sit deserunt beatae qui sint velit id nulla commodi At ullam iusto et
            ullam temporibus. Ad magni quisquam aut culpa voluptas non earum labore sit ipsum laudantium ad natus fugit
            qui placeat dolores. Vel sapiente itaque 33 officia dolor a nihil voluptates aut quam omnis aut enim
            consequatur et tempore eius.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item className={faqStyles.card} eventKey="3">
          <Accordion.Header className={faqStyles.cardtitle}>Question 4</Accordion.Header>
          <Accordion.Body className={faqStyles.cardbody}>
            Lorem ipsum dolor sit amet. Aut fuga deleniti sed quae repellat et impedit aliquid ea praesentium pariatur.
            Quo debitis galisum ad mollitia illum sit deserunt beatae qui sint velit id nulla commodi At ullam iusto et
            ullam temporibus. Ad magni quisquam aut culpa voluptas non earum labore sit ipsum laudantium ad natus fugit
            qui placeat dolores. Vel sapiente itaque 33 officia dolor a nihil voluptates aut quam omnis aut enim
            consequatur et tempore eius.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item className={faqStyles.card} eventKey="4">
          <Accordion.Header className={faqStyles.cardtitle}>Question 5</Accordion.Header>
          <Accordion.Body className={faqStyles.cardbody}>
            Lorem ipsum dolor sit amet. Aut fuga deleniti sed quae repellat et impedit aliquid ea praesentium pariatur.
            Quo debitis galisum ad mollitia illum sit deserunt beatae qui sint velit id nulla commodi At ullam iusto et
            ullam temporibus. Ad magni quisquam aut culpa voluptas non earum labore sit ipsum laudantium ad natus fugit
            qui placeat dolores. Vel sapiente itaque 33 officia dolor a nihil voluptates aut quam omnis aut enim
            consequatur et tempore eius.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* footer */}
    </main>
  );
};

export default page;
