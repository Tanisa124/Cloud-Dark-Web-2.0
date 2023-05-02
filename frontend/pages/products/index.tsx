import Product from "@/components/products/Product";
import { CircularProgress, Container, Grid } from "@mui/material";
import { AxiosInstance } from "@/util/ApiUtil";
import { IProduct } from "@/models/Product";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";

type Props = {
  products: IProduct[];
};

const ProductListPage = ({ products }: Props) => {
  return (
    <>
      <Container>
        <Grid container spacing={5} paddingTop={5} paddingBottom={10}>
          {products.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100vw"
              height="80vh"
            >
              <CircularProgress size={40} />
            </Box>
          ) : (
            <>
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
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await AxiosInstance.get("/product");

    return {
      props: {
        products: res.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default ProductListPage;
