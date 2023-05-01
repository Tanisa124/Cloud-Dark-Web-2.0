import React from "react";
import ProductDetailForm from "./ProductDetailForm";
import { IProduct } from "@/models/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/CartSlice";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Props {
  product: IProduct;
}

const ProductDetailContainer = ({ product }: Props) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const handleBuyProduct = () => {
    if (session?.user) {
      dispatch(
        addToCart({
          _id: product._id,
          title: product.title,
          imageURL: product.imageURL,
          amount: 1,
          price: product.price,
        })
      );
      toast.success("Add to cart successfully!!!");
    } else {
      toast.error("Please login to buy product!!!");
    }
  };
  return (
    <ProductDetailForm product={product} handleBuyProduct={handleBuyProduct} />
  );
};

export default ProductDetailContainer;
