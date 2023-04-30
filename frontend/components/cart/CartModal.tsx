import { Box, Button, List, Modal, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { modalStyle } from "@/constant/formStyle";
import { useSelector } from "react-redux";
import { selectCartState } from "@/store/CartSlice";
import CartItem from "./CartItem";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cartState = useSelector(selectCartState);

  function calculateTotal() {
    let total = 0;
    for (let item of cartState) {
      total += item.amount * item.price;
    }
    return total;
  }
  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            fontWeight="700"
          >
            รถเข็น
          </Typography>
          <Paper
            sx={{
              height: "30vh",
              width: 350,
              overflowY: "auto",
              overflowX: "inherit",
            }}
          >
            <List>
              {cartState.map((item) => {
                return (
                  <CartItem
                    id={item._id}
                    title={item.title}
                    imageURL={item.imageURL}
                    amount={item.amount}
                    key={item._id}
                    price={item.price}
                  />
                );
              })}
            </List>
          </Paper>
          <Typography
            variant="h6"
            gutterBottom
            textAlign="center"
            fontWeight="700"
          >
            รวม {calculateTotal()} BTC
          </Typography>
          <Link href="/order">
            <Button
              onClick={onClose}
              variant="contained"
              disabled={isLoading}
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                display: "flex",
                gap: "10px",
                width: "100%",
              }}
            >
              <span>สั่งซื้อ</span>
            </Button>
          </Link>
        </Box>
      </Modal>
    </>
  );
};

export default CartModal;
