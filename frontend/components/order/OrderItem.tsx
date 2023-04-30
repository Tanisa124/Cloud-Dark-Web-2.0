import { CartItem } from "@/store/CartSlice";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {
  cartItem: CartItem;
};

const OrderItem = ({ cartItem }: Props) => {
  return (
    <Box
      display="flex"
      padding="20px"
      justifyContent="space-between"
      width="50vw"
    >
      <Box display="flex" columnGap="20px" alignItems="center">
        <Image
          src={cartItem.imageURL}
          alt={cartItem.title}
          //   fill
          width={200}
          height={100}
          style={{ borderRadius: "10px", width: "auto" }}
        />
        <Typography variant="h5">{cartItem.title}</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        rowGap="10px"
        textAlign="end"
        justifyContent="center"
      >
        <Typography variant="h5" fontWeight="600">
          {cartItem.price} BTC
        </Typography>
        <Typography variant="body1">Qty: {cartItem.amount}</Typography>
      </Box>
    </Box>
  );
};

export default OrderItem;
