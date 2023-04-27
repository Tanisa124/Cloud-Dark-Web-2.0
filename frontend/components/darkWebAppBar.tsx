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
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
export interface AppBarProp {
  onRegisterModalOpen: () => void;
  pageName: string;
}

export default function DarkWebAppBar({
  onRegisterModalOpen,
  pageName,
}: AppBarProp) {

  const {register,handleSubmit} = useForm();
  const router = useRouter();

  function onSubmit(data:any){
    router.push("/search?keyword=" + data.keyword);
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageName}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems={"center"} direction={"row"}>
          <StyledTextField
            label="ค้นหา"
            variant="standard"
            sx={{
              padding: "5px",
            }}
            inputProps={{ style: { color: "white" } }}
            {...register('keyword')}
          ></StyledTextField>
          <IconButton type="submit">
            <SearchOutlinedIcon
              sx={{
                color: "white",
              }}
            ></SearchOutlinedIcon>
          </IconButton>
          </Stack>
          </form>
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
        
      </Toolbar>
    </AppBar>
  );
}
