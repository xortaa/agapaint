"use client";

import Sidenav from "@/components/Sidenav";
import { Next13NProgress, Link } from "nextjs13-progress";

const AdminLayout = ({ children }) => {
  const sidenavWidth = "75px";
  const contentWidth = `calc(100% - ${sidenavWidth})`;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* for the space dedicated to sidenav */}
      <div style={{ width: sidenavWidth, zIndex: 2 }}>
        <Sidenav />
      </div>
      <Next13NProgress color="#f1b038" height={5} />
      {/* for the children or the main content */}
      <div style={{ width: contentWidth, overflowY: "auto", padding: "0px" }}>
        <Next13NProgress color="#f1b038" height={5} />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
