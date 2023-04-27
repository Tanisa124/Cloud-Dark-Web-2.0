import Product from "@/components/products/Product";
import { Container, Grid } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { AxiosInstance } from "@/util/ApiUtil";
import { IProduct } from "@/models/Product";

type Props = {};

const ProductListPage = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    AxiosInstance.get("product").then(
      (response: { data: SetStateAction<IProduct[]> }) => {
        setProducts(response.data);
      }
    );
  }, []);
  return (
    <>
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
};

export default ProductListPage;
