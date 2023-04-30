import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import OrderItem from "./OrderItem";
import { useSelector } from "react-redux";
import { CartItem, selectCartState } from "@/store/CartSlice";

const OrderContainer = () => {
  const cartState: CartItem[] = useSelector(selectCartState);

  const totalAmount = cartState.reduce(
    (total, cartItem) => total + cartItem.amount,
    0
  );

  const totalPrice = cartState.reduce(
    (total, cartItem) => total + cartItem.amount * cartItem.price,
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
      {cartState.length !== 0 ? (
        <List
          sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
          component="nav"
        >
          {cartState.map((cartItem) => (
            <>
              <ListItem key={cartItem._id}>
                <OrderItem cartItem={cartItem} />
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
