import DarkWebAppBar from '@/components/darkWebAppBar'
import Logo from '@/components/logo'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

export default function Home() {
  return (
    <>
    <DarkWebAppBar pageName='หน้าหลัก'></DarkWebAppBar>
  <Logo></Logo>
  </>
  )
}
