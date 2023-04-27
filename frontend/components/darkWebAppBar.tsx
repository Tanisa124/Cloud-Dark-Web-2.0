import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { StyledTextField } from "./StyledTextField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import RegisterModal from "./register/RegisterModal";
import LoginModal from "./login/LoginModal";
import Logo from "./logo";
export interface AppBarProp {}

export default function DarkWebAppBar({}: AppBarProp) {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const onToggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };
  const onToggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  function onSubmit(data: any) {
    router.push("/search?keyword=" + data.keyword);
  }

  return (
    <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      position="fixed"
      color="primary"
    >
      <Logo />
      <Toolbar variant="dense">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack alignItems={"center"} direction={"row"}>
            <StyledTextField
              label="ค้นหา"
              variant="standard"
              sx={{
                padding: "5px",
              }}
              inputProps={{ style: { color: "white" } }}
              {...register("keyword")}
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
        {!session?.user ? (
          <div>
            <Button color="inherit" onClick={onToggleLoginModal}>
              Login
            </Button>
            <Button color="inherit" onClick={onToggleRegisterModal}>
              Register
            </Button>
            {isRegisterModalOpen ? (
              <RegisterModal isOpen onClose={onToggleRegisterModal} />
            ) : null}
            {isLoginModalOpen ? (
              <LoginModal isOpen onClose={onToggleLoginModal} />
            ) : null}
          </div>
        ) : (
          <div>
            <p>Signed in as {session.user.username}</p>
            <Button color="inherit">Logout</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
