import ProdcutDetail from "@/components/page/productDetail/ProdcutDetailContainer";
import { IProduct } from "@/models/Product";
import React from "react";

interface Props {}

const mockProduct: IProduct = {
  id: "1",
  name: "ซอยจุ๊",
  price: 999,
  description:
    "‘ซอยจุ๊’ คำว่า ‘ซอย’ แปลว่าหั่น ส่วนคำว่า ‘จุ๊’ แปลว่า จิ้ม เมื่อรู้แบบนี้คุณคงเดาได้ไม่ยากว่าซอยจุ๊จะมีลักษณะเป็นอย่างไร ซอยจุ๊คือการนำเนื้อวัวดิบและเครื่องในวัวอย่างตับ สไบนาง และขอบกระด้ง มาหั่นเป็นชิ้นพอดีคำโดยไม่ต้องปรุงรส แล้วจิ้มกินกับน้ำจิ้มที่เรียกว่า ‘แจ่วขม’",
  image:
    "https://static.thairath.co.th/media/Dtbezn3nNUxytg04aoZAOHCJRaNJpdwXBSwVaN8TdboHtU.jpg",
};

const ProductDetailPage = (props: Props) => {
  return <ProdcutDetail product={mockProduct} />;
};

export default ProductDetailPage;
