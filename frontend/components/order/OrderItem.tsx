import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {
  product: any;
};

const OrderItem = ({ product }: Props) => {
  return (
    <Box
      display="flex"
      padding="20px"
      justifyContent="space-between"
      width="50vw"
    >
      <Box display="flex" columnGap="20px" alignItems="center">
        <Image
          src="https://i.ytimg.com/vi/dw7RsXajh8c/maxresdefault.jpg"
          alt="ปลาหมึกปีศาจ"
          //   fill
          width={200}
          height={100}
          style={{ borderRadius: "10px" }}
        />
        <Typography variant="h5">{product.name}</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        rowGap="10px"
        textAlign="end"
        justifyContent="center"
      >
        <Typography variant="h5" fontWeight="600">
          {product.price} BTC
        </Typography>
        <Typography variant="body1">Qty: {product.amount}</Typography>
      </Box>
    </Box>
  );
};

export default OrderItem;
