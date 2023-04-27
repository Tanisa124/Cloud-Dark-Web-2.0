import { IProduct } from "@/models/Product";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "@/util/ApiUtil";
import ProductDetailContainer from "@/components/products/detail/ProductDetailContainer";

interface Props {}

const ProductDetailPage = ({}: Props) => {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct>();
  useEffect(() => {
    const { productId } = router.query;
    if (productId !== undefined) {
      AxiosInstance.get("product/" + productId).then((response) => {
        setProduct(response.data);
      });
    }
  }, [router.isReady, router.query]);

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
