"use client";

import homeStyles from '@/styles/home.module.scss';
import SigninButton from "@/components/auth/SigninButton";
import CheckSessionButton from "@/components/auth/CheckSessionButton";
import LogoutButton from "@/components/auth/LogoutButton";
import { Button, Card } from 'react-bootstrap';

export default function Home() {
  // for demonstation purposes only remove buttons afterwards
  return (
    <div>
      <SigninButton />
      <CheckSessionButton />
      <LogoutButton />

      {/* Testing react bootstrap */}
      <Button variant="primary" onClick={() => console.log("Primary")}>
         Primary
      </Button>

      <Card>
         <Card.Header>Header</Card.Header>
         <Card.Body>
            <Card.Text>
               Some quick example text to build the card out and make up the bulk of
               the card's content.
            </Card.Text>
         </Card.Body>
      </Card>

    </div>
  );
}
