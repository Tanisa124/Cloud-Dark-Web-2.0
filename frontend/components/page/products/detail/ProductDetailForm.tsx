import SearchAppBar from "@/components/AppBar";
import DarkWebAppBar from "@/components/darkWebAppBar";
import { IProduct } from "@/models/Product";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React from "react";
import Logo from "@/components/logo";

interface Props {
  product: IProduct;
  handleBuyProduct: () => void;
}

const ProductDetailForm = ({ product, handleBuyProduct }: Props) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <DarkWebAppBar pageName={"Product Detail"} />
      <Logo></Logo>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign={"center"}
        padding={5}
      >
        <Container>
          <Typography variant="h2" sx={{ textAlign: "center" }} gutterBottom>
            {product.title}
          </Typography>
        </Container>

        <Container sx={{ display: "flex", height: "auto" }}>
          <Box
            component="img"
            sx={{
              height: "50%",
              width: "50%",
            }}
            alt="Product image"
            src={product.img}
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding={5}
          >
            <Typography variant="h5" width={500} gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h5" sx={{ paddingRight: 0 }} gutterBottom>
              ราคา {product.price} BTC
            </Typography>
            <Button
              size="large"
              variant="contained"
              onClick={() => handleBuyProduct()}
            >
              <ShoppingCartOutlinedIcon
                sx={{
                  color: "white",
                }}
              ></ShoppingCartOutlinedIcon>
              <Typography sx={{ color: "white" }}>เพิ่มไปยังรถเข็น</Typography>
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductDetailForm;
