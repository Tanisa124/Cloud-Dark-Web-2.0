import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import DarkWebBg from "../../public/darkWebBg.png";
import Link from "next/link";

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
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <Link href="/products">
            <Typography variant="h5" fontWeight="700">
              See Our Products
            </Typography>
          </Link>
        </Button>
      </Box>
    </>
  );
};

export default HomePage;
