import React from "react";
import DarkWebAppBar from "./darkWebAppBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <DarkWebAppBar></DarkWebAppBar>
      <div
        style={{
          paddingTop: "100px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
