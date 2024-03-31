import { Button, Card } from "react-bootstrap";
import Link from "@/components/Link";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";

const SignUpCard = ({role}) => {
  return (
    <section>
      {/* Google Auth Button */}
      <div className="my-4">
        <GoogleButton
          style={{ fontFamily: "", borderRadius: "5px", color: "#000", border: "1px solid #A9A9A9" }}
          className="w-100 fw-medium d-flex justify-content-center align-items-center my-google-button"
          type="light"
          onClick={() => {
            signIn("google", { callbackUrl: role === "admin" ? "/admin/hub/appointment" : "/customer/appointment" });
          }}
          label="Continue with Google"
        />
      </div>
    </section>
  );
};
export default SignUpCard;
