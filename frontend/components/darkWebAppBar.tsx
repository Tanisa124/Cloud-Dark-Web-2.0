import {
  AppBar,
  Button,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { StyledTextField } from "./StyledTextField";
export interface AppBarProp {
  onRegisterModalOpen: () => void;
  pageName: string;
}

export default function DarkWebAppBar({
  onRegisterModalOpen,
  pageName,
}: AppBarProp) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageName}
        </Typography>
        <Stack alignItems={"center"} direction={"row"}>
          <StyledTextField
            label="ค้นหา"
            variant="standard"
            sx={{
              padding: "5px",
            }}
            inputProps={{ style: { color: "white" } }}
          ></StyledTextField>
          <IconButton>
            <SearchOutlinedIcon
              sx={{
                color: "white",
              }}
            ></SearchOutlinedIcon>
          </IconButton>
          <IconButton>
            <ShoppingCartOutlinedIcon
              sx={{
                color: "white",
              }}
            ></ShoppingCartOutlinedIcon>
          </IconButton>
          <Button color="inherit">Login</Button>
          <Button color="inherit" onClick={onRegisterModalOpen}>
            Register
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
