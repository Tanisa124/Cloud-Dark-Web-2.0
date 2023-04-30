import { addToCart, removeFromCart } from '@/store/CartSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Button, IconButton,ListItem, Stack, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';

export type CartItemProps = {
    id: string;
    title: string;
    amount : number;
    price : number;
};

const CartItem = ({id,title,amount,price} : CartItemProps) => {
    const dispatch = useDispatch();
    return (
        <ListItem>
                  <Box sx={{ display: 'inline-flex' , justifyContent: 'space-between' }} alignItems={'center'} width={'100%'}>
                  <Box component="div" sx={{  whiteSpace: "unset", wordBreak: "break-all"}}>
                      {title}
                    </Box>
                    <Stack direction={'row'} alignItems={'center'} >
                    <IconButton onClick={()=>{
                        dispatch(removeFromCart(id));
                    }}>
                    <RemoveCircleOutlineIcon
                      sx={{
                        color: "white",
                      }}
                    ></RemoveCircleOutlineIcon>
                    </IconButton>
                    <Typography
                      variant="body1"
                    >{amount}</Typography>
                    <IconButton onClick={()=>{
                        dispatch(addToCart({_id : id, title : title, amount : 1, price: price}));
                    }}>
                    <AddCircleOutlineIcon
                      sx={{
                        color: "white",
                      }}
                    ></AddCircleOutlineIcon>
                  </IconButton>
                  </Stack>
                  </Box>
        </ListItem>
    )
}

export default CartItem;