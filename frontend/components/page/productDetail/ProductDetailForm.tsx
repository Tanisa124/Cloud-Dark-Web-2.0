import SearchAppBar from "@/components/AppBar";
import DarkWebAppBar from "@/components/darkWebAppBar";
import { IProduct } from "@/models/Product";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React from "react";

interface Props {
  product: IProduct;
  handleBuyProduct: () => void;
}

const ProductDetailForm = ({ product, handleBuyProduct }: Props) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <DarkWebAppBar pageName={"Product Detail"} />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding={5}
      >
        <Container>
          <Typography variant="h1" gutterBottom>
            {product.name}
          </Typography>
        </Container>

        <Container sx={{ display: "flex", height: "auto" }}>
          <Box
            component="img"
            sx={{
              height: "50%",
              width: "50%",
              flex: 1,
            }}
            alt="Product image"
            src={product.image}
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
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
