import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { StyledTextField } from "./StyledTextField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import RegisterModal from "./register/RegisterModal";
import LoginModal from "./login/LoginModal";
import Logo from "./logo";
import CartModal from "./cart/CartModal";
import Link from "next/link";
export interface AppBarProp {}

export default function DarkWebAppBar({}: AppBarProp) {
  const { data: session, status } = useSession();

  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

  const onToggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };
  const onToggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const onToggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
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
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          transform: "translateX(-80px)",
        }}
      >
        <Link href="/products">
          <Logo />
        </Link>
      </div>
      <Toolbar variant="dense">
        {status !== "authenticated" ? (
          <div style={{ display: "flex", columnGap: "15px" }}>
            <Button
              variant="outlined"
              sx={{ fontWeight: 500 }}
              onClick={onToggleLoginModal}
            >
              Login
            </Button>
            <Button variant="outlined" onClick={onToggleRegisterModal}>
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
          <div style={{ display: "flex", alignItems: "center" }}>
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
                onClick={onToggleCartModal}
              ></ShoppingCartOutlinedIcon>
            </IconButton>
            {isCartModalOpen ? (
              <CartModal isOpen onClose={onToggleCartModal} />
            ) : null}
            <Box display="flex" columnGap="10px">
              <Typography
                display="flex"
                columnGap="10px"
                fontWeight="700"
                // border="1px solid white"
                padding="7px"
                borderRadius="5px"
              >
                <p>{session.user.username}</p>
              </Typography>
              <Typography
                display="flex"
                columnGap="10px"
                fontWeight="700"
                border="1px solid white"
                padding="7px"
                borderRadius="5px"
              >
                <p>ยอดเงินคงเหลือ : 99999 BTC</p>
              </Typography>
              <Button
                variant="outlined"
                sx={{ fontWeight: 500 }}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            </Box>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
