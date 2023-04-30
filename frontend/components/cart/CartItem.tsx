import { addToCart, removeFromCart } from "@/store/CartSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Box,
  Button,
  IconButton,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Image from "next/image";

export type CartItemProps = {
  id: string;
  title: string;
  imageURL: string;
  amount: number;
  price: number;
};

const CartItem = ({ id, title, imageURL, amount, price }: CartItemProps) => {
  const dispatch = useDispatch();
  return (
    <ListItem>
      <Box
        sx={{ display: "inline-flex", justifyContent: "space-between" }}
        alignItems={"center"}
        width={"100%"}
        padding="10px"
      >
        <Box display="flex" columnGap="10px" alignItems="center">
          <Image src={imageURL} alt={title} width={80} height={80} />
          <Box
            component="div"
            sx={{ whiteSpace: "unset", wordBreak: "break-all" }}
          >
            {title}
          </Box>
        </Box>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton
            onClick={() => {
              dispatch(removeFromCart(id));
            }}
          >
            <RemoveCircleOutlineIcon
              sx={{
                color: "white",
              }}
            ></RemoveCircleOutlineIcon>
          </IconButton>
          <Typography variant="body1">{amount}</Typography>
          <IconButton
            onClick={() => {
              dispatch(
                addToCart({
                  _id: id,
                  title,
                  imageURL,
                  amount: 1,
                  price: price,
                })
              );
            }}
          >
            <AddCircleOutlineIcon
              sx={{
                color: "white",
              }}
            ></AddCircleOutlineIcon>
          </IconButton>
        </Stack>
      </Box>
    </ListItem>
  );
};

export default CartItem;
