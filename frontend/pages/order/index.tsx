import Product from "@/components/products/Product";
import { Container, Grid } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { AxiosInstance } from "@/util/ApiUtil";
import { IProduct } from "@/models/Product";
import OrderContainer from "@/components/order/OrderContainer";

type Props = {};

// const mockProducts: IProduct[] = [
//     {
//         _id: "1",
//         title: "Product 1",
//         description: "This is a product ",
//         price: 100,
//         imageURL: "https://picsum.photos/200/300"
//     },
// ]

const OrderPage = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  return (
    <>
      <OrderContainer />
    </>
  );
};

export default OrderPage;
