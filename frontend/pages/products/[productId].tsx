import ProductDetailContainer from "@/components/page/products/detail/ProductDetailContainer";
import { IProduct } from "@/models/Product";
import { useRouter } from "next/router";
import mock_data from "../../../data/mock_data.json";
import React from "react";

interface Props {}

const ProductDetailPage = ({}: Props) => {
  const router = useRouter();
  const { productId } = router.query;
  const product: IProduct | undefined = mock_data.find(
    (product) => product.id === productId
  );

  return (
    <div>
      {product ? (
        <div>
          <ProductDetailContainer product={product} />
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
};

export default ProductDetailPage;
