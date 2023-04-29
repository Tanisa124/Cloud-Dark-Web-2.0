import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { BaseSyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginForm, loginSchema } from "./LoginValidator";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { modalStyle } from "@/constant/formStyle";
import ErrorMessage from "../ErrorMessage";

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

  const onSubmit: SubmitHandler<LoginForm> = async (
    data: LoginForm,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (event) event.preventDefault();

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success("Login Successfully!!!");
      } else {
        toast.error("Wrong Username or Password!!!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Error!!!");
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
                <ErrorMessage txt={errors.username?.message} />
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
                <ErrorMessage txt={errors.password?.message} />
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
                  display: "flex",
                  gap: "10px",
                }}
              >
                {isLoading && <CircularProgress size={20} />}
                <span>Login</span>
              </Button>
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={isLoading}
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
    </>
  );
};

export default LoginModal;
