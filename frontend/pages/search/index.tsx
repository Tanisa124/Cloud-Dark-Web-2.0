import Product from "@/components/products/Product";
import DarkWebAppBar from "@/components/darkWebAppBar";
import Logo from "@/components/logo";
import { IProduct } from "@/models/Product";
import { AxiosInstance } from "@/util/ApiUtil";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {}

const SearchResultPage = ({}: Props) => {
  const [result, setResult] = useState<IProduct[]>([]);
  const [finding, setFinding] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setFinding(true);
    setResult([]);
    const query = router.query;
    if (router.isReady && query.keyword !== undefined) {
      AxiosInstance.get("product/search?keyword=" + query.keyword).then(
        (res) => {
          console.log("search");
          setResult(res.data);
          setFinding(false);
        }
      );
    }
  }, [router.isReady, router.query]);

  return (
    <>
      <DarkWebAppBar></DarkWebAppBar>
      <Logo></Logo>
      <Container>
        {finding == true ? (
          <Box textAlign={"center"} paddingTop={15}>
            <CircularProgress color="secondary" size={80}></CircularProgress>
            <Typography variant="h6">กำลังค้นหาสินค้า</Typography>
          </Box>
        ) : (
          <Grid container spacing={5} paddingTop={5} paddingBottom={10}>
            {result.map((element) => {
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
        )}
      </Container>
    </>
  );
};

export default SearchResultPage;
