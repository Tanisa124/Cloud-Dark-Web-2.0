import { IProduct } from "@/models/Product";
import React from "react";
import { AxiosInstance } from "@/util/ApiUtil";
import ProductDetailContainer from "@/components/products/detail/ProductDetailContainer";
import { Box, CircularProgress } from "@mui/material";
import { GetServerSideProps } from "next";

interface Props {
  product: IProduct;
}

const ProductDetailPage = ({ product }: Props) => {
  return (
    <div>
      {product ? (
        <div>
          <ProductDetailContainer product={product} />
        </div>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="80vh"
        >
          <CircularProgress size={40} />
        </Box>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.query;
  try {
    const res = await AxiosInstance.get(`/product/${productId}`);

    return {
      props: {
        product: res.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default ProductDetailPage;
