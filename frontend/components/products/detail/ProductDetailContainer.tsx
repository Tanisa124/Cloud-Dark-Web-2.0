import React from "react";
import ProductDetailForm from "./ProductDetailForm";
import { IProduct } from "@/models/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/CartSlice";
import { toast } from "react-hot-toast";

interface Props {
  product: IProduct;
};

const ProductDetailContainer = ({ product }: Props) => {
  const dispatch = useDispatch();
  const handleBuyProduct = () => {
    dispatch(addToCart({_id : product._id, title : product.title, amount : 1, price: product.price}))
    toast.success("เพิ่มไปยังรถเข็นแล้ว")
  };
  return (
    <ProductDetailForm product={product} handleBuyProduct={handleBuyProduct} />
  );
};

export default ProductDetailContainer;
