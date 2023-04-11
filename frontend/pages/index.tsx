import Product from '@/components/Product'
import DarkWebAppBar from '@/components/darkWebAppBar'
import Logo from '@/components/logo'
import {Container, Grid} from '@mui/material'

export default function Home() {
  return (
    <>
    <DarkWebAppBar pageName='หน้าหลัก'></DarkWebAppBar>
    <Logo></Logo>
    <Container>
    <Grid container spacing={10} marginTop={'8px'}>
      <Product name={'asdf'} price={0}></Product>
      <Product name={'asdf'} price={0}></Product>
      <Product name={'asdf'} price={0}></Product>
      <Product name={'asdf'} price={0}></Product>
      <Product name={'asdf'} price={0}></Product>
    </Grid>
    </Container>
  </>
  )
}
