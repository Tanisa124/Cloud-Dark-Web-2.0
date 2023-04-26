import ProductDetailContainer from "@/components/page/products/detail/ProductDetailContainer";
import { IProduct } from "@/models/Product";
import { useRouter } from "next/router";
import mock_data from "../../../data/mock_data.json";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "@/util/ApiUtil";

interface Props {}

const ProductDetailPage = ({}: Props) => {
  const router = useRouter();
  const [product,setProduct] = useState<IProduct>();
  // const product: IProduct | undefined = mock_data.find(
  //   (product) => product.id === productId
  // );
  useEffect(()=>{
    const { productId } = router.query;
    if(productId !== undefined){
      AxiosInstance.get('product/' + productId).then((response)=>{
        setProduct(response.data);
      });
    }
    
  },[router.isReady])

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
