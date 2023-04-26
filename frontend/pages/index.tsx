import Product from "@/components/Product";
import DarkWebAppBar from "@/components/darkWebAppBar";
import Logo from "@/components/logo";
import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/util/ApiUtil";
import { IProduct } from "@/models/Product";

export default function Home() {

  const [products,setProducts] = useState<IProduct[]>([]);

  useEffect(()=>{
    AxiosInstance.get('product').then(response=>{
      setProducts(response.data)
    })
  },[])
  

  return (
    <>
      <DarkWebAppBar pageName="หน้าหลัก"></DarkWebAppBar>
      <Logo></Logo>
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
