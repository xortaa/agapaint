"use client";

import React from "react";
import Sidenav from "@/components/Sidenav";

const AdminLayout = ({ children }) => {
  const sidenavWidth = "75px";
  const contentWidth = `calc(100% - ${sidenavWidth})`;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* for the space dedicated to sidenav */}
      <div style={{ width: sidenavWidth, zIndex: 2 }}>
        <Sidenav />
      </div>

      {/* for the children or the main content */}
      <div style={{ width: contentWidth, overflowY: "auto", padding: "30px 40px 15px" }}>{children}</div>
    </div>
  );
};

export default AdminLayout;
