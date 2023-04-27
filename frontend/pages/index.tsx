import Product from "@/components/Product";
import DarkWebAppBar from "@/components/darkWebAppBar";
import Logo from "@/components/logo";
import { Container, Grid } from "@mui/material";
import mock_data from "../../data/mock_data.json";
import RegisterModal from "@/components/register/RegisterModal";
import { SetStateAction, useEffect, useState } from "react";
import { AxiosInstance } from "@/util/ApiUtil";
import { IProduct } from "@/models/Product";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onRegisterModalClose = () => {
    setIsOpen(false);
  };

  const onRegisterModalOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    AxiosInstance.get("product").then(
      (response: { data: SetStateAction<IProduct[]> }) => {
        setProducts(response.data);
      }
    );
  }, []);

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
          {products.map((element) => {
            return (
              <Product
                title={element.title}
                price={element.price}
                imageSrc={element.imageURL}
                key={element._id}
                id={element._id}
              ></Product>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
