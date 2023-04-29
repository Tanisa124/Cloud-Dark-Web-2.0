import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import DarkWebBg from "../../public/darkWebBg.png";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {};

const homePagestyle = {
  display: "flex",
  position: "relative",
  alignItems: "center",
  flexDirection: "column",
  gap: "50px",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
};

const HomePage = (props: Props) => {
  // const { data: session, status } = useSession();
  return (
    <>
      <Box sx={homePagestyle}>
        <Image
          src={DarkWebBg}
          alt="Dark Web Background Image"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "32%",
          }}
        />
        <Button
          variant="outlined"
          sx={{
            padding: "15px",
            borderRadius: "10px",
            // backgroundColor: "white",
            fontSize: 20,
            fontWeight: "semibold",
          }}
        >
          <Link href="/products">{"Let's see our product"}</Link>
        </Button>
      </Box>
    </>
  );
};

export default HomePage;
