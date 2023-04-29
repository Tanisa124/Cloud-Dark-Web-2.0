import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import OrderItem from "./OrderItem";

const products = [
  {
    id: 1,
    name: "Product 1",
    amount: 2,
    price: 10,
  },
  {
    id: 2,
    name: "Product 2",
    amount: 1,
    price: 5,
  },
  {
    id: 3,
    name: "Product 3",
    amount: 3,
    price: 15,
  },
  {
    id: 4,
    name: "Product 4",
    amount: 4,
    price: 15,
  },
  {
    id: 5,
    name: "Product 5",
    amount: 5,
    price: 15,
  },
];

const OrderContainer = () => {
  const totalAmount = products.reduce(
    (total, product) => total + product.amount,
    0
  );

  const totalPrice = products.reduce(
    (total, product) => total + product.amount * product.price,
    0
  );

  const handleOrder = () => {
    // Handle order button click
    console.log("Order button clicked");
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "20px",
        padding: "20px",
        // backgroundColor: "#696969",
        // borderRadius: "20px",
        // margin: "40px",
      }}
    >
      <Typography variant="h4" component="h1" fontWeight="700">
        Your Orders
      </Typography>
      {products.length !== 0 ? (
        <List
          sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
          component="nav"
        >
          {products.map((product) => (
            <>
              <ListItem key={product.id}>
                <OrderItem product={product} />
              </ListItem>
              <Divider sx={{ borderWidth: "2px" }} />
            </>
          ))}
        </List>
      ) : (
        <Typography variant="h4">No orders</Typography>
      )}

      <Box
        textAlign="end"
        display="flex"
        flexDirection="column"
        justifyContent="end"
        rowGap="10px"
        width="50vw"
      >
        <Typography variant="h5" component="h2">
          Total Amount: {totalAmount}
        </Typography>
        <Typography variant="h5" component="h2" fontWeight="600">
          Total Payment: {totalPrice} BTC
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold", fontSize: 24, borderRadius: "10px" }}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default OrderContainer;
