import { Card } from "react-bootstrap";
import Link from "next/link";
import GoogleButton from "react-google-button";

const SignUpCard = () => {
  return (
    <Card className="shadow" style={{ borderTop: "10px solid #fdc601" }}>
      <Card.Body className="p-5">
        <h2 className="mb-4 fw-bold">Sign Up</h2>
        <Card.Text className="text-dark fs-6">To access Agapaint Customer Account, please sign up:</Card.Text>

        {/* Google Auth Button */}
        <div className="my-5">
          <GoogleButton
            onClick={() => {
              console.log("Google button clicked");
            }}
          />
        </div>

        <hr className="my-4" />

        <Card.Text className="text-end medium">
          <Link href="/">Return Home</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default SignUpCard;
