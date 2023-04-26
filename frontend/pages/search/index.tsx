import Product from "@/components/Product";
import DarkWebAppBar from "@/components/darkWebAppBar";
import Logo from "@/components/logo";
import { IProduct } from "@/models/Product";
import { AxiosInstance } from "@/util/ApiUtil";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {}

const SearchResultPage = ({}:Props) => {
    const [result,setResult] = useState<IProduct[]>([]);
    const router = useRouter();
    useEffect(()=>{
        const query = router.query;
        if(query.keyword !== undefined){
            AxiosInstance.get('product/search?keyword=' + query.keyword).then(res=>{
                setResult(res.data);
            })
        }
    },[router.isReady,router.query])

    return(
        <>
        <DarkWebAppBar pageName="ผลการค้นหา"></DarkWebAppBar>
        <Logo></Logo>
        <Container>
        <Grid container spacing={5} paddingTop={5} paddingBottom={10}>
          {result.map((element) => {
            return (
              <Product
                title={element.title}
                price={element.price}
                imageSrc={element.imageURL}
                key={element._id}
                id={element._id}
              ></Product>
            );
          })}
        </Grid>
      </Container>
        </>
    )
}

export default SearchResultPage;