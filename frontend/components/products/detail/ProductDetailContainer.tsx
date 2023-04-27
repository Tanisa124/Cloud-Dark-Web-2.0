import React from "react";
import ProductDetailForm from "./ProductDetailForm";
import { IProduct } from "@/models/Product";

interface Props {
  product: IProduct;
};

const ProductDetailContainer = ({ product }: Props) => {
  const handleBuyProduct = () => {
    console.log("Buy product");
  };
  return (
    <ProductDetailForm product={product} handleBuyProduct={handleBuyProduct} />
  );
};

export default ProductDetailContainer;
