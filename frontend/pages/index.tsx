import Product from "@/components/Product";
import DarkWebAppBar from "@/components/darkWebAppBar";
import Logo from "@/components/logo";
import { Container, Grid } from "@mui/material";
import mock_data from "../../data/mock_data.json";
import RegisterModal from "@/components/register/RegisterModal";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onRegisterModalClose = () => {
    setIsOpen(false);
  };

  const onRegisterModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <DarkWebAppBar
        pageName="หน้าหลัก"
        onRegisterModalOpen={onRegisterModalOpen}
      ></DarkWebAppBar>
      <Logo></Logo>
      {isOpen ? (
        <RegisterModal isOpen onClose={onRegisterModalClose}></RegisterModal>
      ) : null}
      <Container>
        <Grid container spacing={5} paddingTop={5} paddingBottom={10}>
          {mock_data.map((element) => {
            return (
              <Product
                title={element.title}
                price={element.price}
                imageSrc={element.img}
                key={element.id}
                id={element.id}
              ></Product>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
