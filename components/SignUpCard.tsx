import { Button, Card } from "react-bootstrap";
import Link from "@/components/Link";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import axios from "axios";

const SignUpCard = ({ role }) => {
  const [token, setToken] = useState<String | null>();

  const recaptchaOnchange = (token: String) => {
    axios
      .post("/api/validateRecaptcha", { recaptchaResponse: token })
      .then((response) => {
        if (response.data.success) {
          setToken(token);
        } else {
          console.error("Recaptcha failed");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section>
      {/* Google Auth Button */}
      <div className="my-4">
        <GoogleButton
          style={{
            fontFamily: "",
            borderRadius: "5px",
            color: "#000",
            border: "1px solid #A9A9A9",
            marginBottom: "20px",
          }}
          className="w-100 fw-medium d-flex justify-content-center align-items-center my-google-button"
          type="light"
          onClick={() => {
            signIn("google", { callbackUrl: role === "admin" ? "/admin/hub/appointment" : "/customer/appointment" });
          }}
          label="Continue with Google"
          disabled={!token}
        />

        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={recaptchaOnchange} />
      </div>
    </section>
  );
};
export default SignUpCard;
