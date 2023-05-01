import {
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { useSelector } from "react-redux";
import { CartItem, selectCartState } from "@/store/CartSlice";
import { AxiosInstance } from "@/util/ApiUtil";
import { OrderRequest } from "@/models/Order";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const OrderContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const cartState: CartItem[] = useSelector(selectCartState);
  const router = useRouter();

  const totalAmount = cartState.reduce(
    (total, cartItem) => total + cartItem.amount,
    0
  );

  const totalPrice = cartState.reduce(
    (total, cartItem) => total + cartItem.amount * cartItem.price,
    0
  );

  const isValidOrder = () => {
    if (!session) return false;
    return session.user.balance >= totalPrice;
  };

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const handleOrder = async () => {
    setIsLoading(true);

    if (!isValidOrder() || !session) {
      toast.error("Insufficient Balance");
      setIsLoading(false);
      return;
    }

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7);

    const orderRequest: OrderRequest = {
      username: session.user.username,
      products: cartState.map((cartItem) => ({
        _id: cartItem._id,
        title: cartItem.title,
        price: cartItem.price,
        imageURL: cartItem.imageURL,
        amount: cartItem.amount,
      })),
      createdAt: currentDate,
    };

    try {
      const res = await AxiosInstance.post("/order/request", orderRequest);
      if (res.status === 201) {
        reloadSession();
        toast.success("Order Successfully!!!");

        setTimeout(
          () => toast.success("Please check a receipt in your email."),
          1000
        );
        setTimeout(() => router.push("/products"), 2000);
      } else {
        toast.error("Order Failed");
      }
    } catch (error) {
      toast.error("Order Error");
    } finally {
      setIsLoading(false);
    }
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
        <Typography variant="h4" padding="100px">
          No orders
        </Typography>
      )}

      <Box
        textAlign="end"
        display="flex"
        flexDirection="row"
        justifyContent="end"
        columnGap="20px"
        alignItems="center"
        width="50vw"
      >
        <Box>
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
            type="submit"
            disabled={isLoading || cartState.length === 0}
            sx={{
              fontWeight: 600,
              fontSize: "20px",
              display: "flex",
              gap: "10px",
            }}
            onClick={handleOrder}
          >
            {isLoading && <CircularProgress size={20} />}
            <span>Place Order</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderContainer;
