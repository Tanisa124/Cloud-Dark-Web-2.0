import { Grid, Stack, Typography } from "@mui/material"

export interface ProductProps{
    name: string,
    price : number
}

export default function Product(props: ProductProps){
    return (
        <Grid item xs={6} md={3}>
            <Stack direction={'column'}>
            <img src='https://thestandard.co/wp-content/uploads/2021/01/5-45.jpg'
                style={{ maxWidth: "100%" }}
                />
            <Stack direction={'row'} justifyContent={'space-between'} marginTop={2}>
                <Typography color={'white'}>ซอยจุ๊</Typography>
                <Typography color={'white'}>11 BTC</Typography>
            </Stack>
            </Stack>
            
        </Grid>
    )

} 