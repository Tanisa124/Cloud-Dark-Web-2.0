import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginForm, loginSchema } from "./LoginValidator";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { modalStyle } from "@/constant/formStyle";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      console.log(data);
      // await signIn("credentials", {
      //   ...data,
      //   redirect: false,
      // }).then((res) => {
      //   if (res?.ok) {
      //     toast.success("Login Successfully!!!");
      //     onClose();
      //   }
      //   if (res?.error) {
      //     toast.error("Login Failed!!!");
      //   }
      // });
      // toast.success("Login Successfully!!!");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed!!!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={modalStyle}>
            <Typography
              variant="h3"
              gutterBottom
              textAlign="center"
              fontWeight="700"
            >
              Login
            </Typography>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="20px"
              padding="25px"
              borderRadius="10px"
              width="500px"
            >
              <TextField
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
                autoComplete="off"
                required
                {...register("username", { required: true })}
                error={errors.username ? true : false}
              />
              {errors.username && (
                <Typography variant="body2" alignSelf="start">
                  ** {errors.username?.message}
                </Typography>
              )}

              <TextField
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                required
                {...register("password", { required: true })}
                error={errors.password ? true : false}
              />
              {errors.password && (
                <Typography variant="body2" alignSelf="start">
                  ** {errors.password?.message}
                </Typography>
              )}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="10px"
              marginX="10px"
            >
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
      )
    </>
  );
};

export default LoginModal;
