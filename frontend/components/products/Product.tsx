import { Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";

export interface ProductProps {
  title: string;
  price: number;
  imageSrc: string;
  id: string;
}

export default function Product(props: ProductProps) {
  return (
    <Grid item xs={6} md={3}>
      <Link href={"/products/" + props.id}>
        <Stack direction={"column"}>
          <img
            src={props.imageSrc}
            style={{
              maxWidth: "100%",
              maxHeight: "180px",
              objectFit: "contain",
            }}
            alt={props.title}
          />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            marginTop={2}
          >
            <Typography color={"white"} maxWidth={"150px"}>
              {props.title}
            </Typography>
            <Typography color={"white"}>{props.price} BTC</Typography>
          </Stack>
        </Stack>
      </Link>
    </Grid>
  );
}
