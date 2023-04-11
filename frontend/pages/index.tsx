import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

export default function Home() {
  return (
    <AppBar position="static">
    <Toolbar variant="dense">
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      </IconButton>
      <Typography variant="h6" color="inherit" component="div">
        Home
      </Typography>
    </Toolbar>
  </AppBar>
  )
}
