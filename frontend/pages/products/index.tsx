import Product from "@/components/Product";
import DarkWebAppBar from "@/components/darkWebAppBar";
import Logo from "@/components/logo";
import { Container, Grid } from "@mui/material";
import mock_data from "../../../data/mock_data.json";

type Props = {};

const ProductListPage = (props: Props) => {
  return (
    <>
      <DarkWebAppBar pageName="หน้าหลัก"></DarkWebAppBar>
      <Logo></Logo>
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
};

export default ProductListPage;
