import React from "react";
import { Card, Breadcrumb, Button } from "react-bootstrap";
import BannerImg from "@/public/assets/img/myProfileBg.png";
import { ArrowLeft } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";

function Banner(props) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push("../appointment");
  };

  return (
    <Card
      className="border-0"
      style={{
        borderBottomLeftRadius: "35px",
        borderBottomRightRadius: "35px",
      }}
    >
      <Card.Body className="p-0">
        <Card.Img
          src={BannerImg.src}
          style={{
            height: "280px",
            borderBottomLeftRadius: "35px",
            borderBottomRightRadius: "35px",
            objectFit: "cover",
          }}
        />
        <Card.ImgOverlay
          className="ps-5"
          style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
        >
          <Breadcrumb className="text-white fw-light white-divider">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item
              href="/customer/appointment"
              active={props.page === "profile"}
              className={`text-white ${props.page === "profile" ? "fw-semibold" : ""}`}
            >
              My Profile
            </Breadcrumb.Item>
            {props.page === "payment" && (
              <Breadcrumb.Item active className="text-white fw-semibold">
                Payment
              </Breadcrumb.Item>
            )}
          </Breadcrumb>

          {/* Profile Page */}
          {props.page === "profile" && (
            <p className="display-6 fw-medium text-white pb-2">
              Welcome to Your Account, <span className="text-warning">{props.userFName}</span>
            </p>
          )}

          {props.page === "payment" && (
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
              <Button className="mt-2 pt-1 pb-1" variant="outline-light" onClick={handleRowClick}>
                <span>
                  <ArrowLeft size={20} />
                </span>
              </Button>
              <p className="fs-2 fw-medium text-white pb-2" style={{ marginLeft: "10px" }}>
                Your Appointment <span className="text-warning">#{props.aptId}</span>
              </p>
            </div>
          )}
        </Card.ImgOverlay>
      </Card.Body>
    </Card>
  );
}

export default Banner;
