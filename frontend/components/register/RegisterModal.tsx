import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterForm, registerSchema } from "./RegisterValidator";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosInstance } from "@/util/ApiUtil";
import toast from "react-hot-toast";
import { modalStyle } from "@/constant/formStyle";
import ErrorMessage from "../ErrorMessage";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const RegisterModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterForm> = async (data: RegisterForm) => {
    setIsLoading(true);

    try {
      console.log(data);
      const response = await AxiosInstance.post(
        "/auth/register",
        JSON.stringify({ ...data })
      ).then((response) => response);
      if (response.status === 200) {
        toast.success("Register Successfully!!!");
        onClose();
      } else {
        toast.error("Register Failed!!!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Register Failed!!!");
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
              Register
            </Typography>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="15px"
              padding="25px"
              borderRadius="10px"
              width="500px"
            >
              <TextField
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
                required
                {...register("username", { required: true })}
                error={errors.username ? true : false}
              />
              {errors.username && (
                <ErrorMessage txt={errors.username?.message} />
              )}
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                required
                {...register("email", { required: true })}
                error={errors.email ? true : false}
              />
              {errors.email && <ErrorMessage txt={errors.email?.message} />}
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

              <TextField
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                type="password"
                required
                {...register("confirmPassword", { required: true })}
                error={errors.confirmPassword ? true : false}
              />
              {errors.confirmPassword && (
                <ErrorMessage txt={errors.confirmPassword?.message} />
              )}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              // alignItems="center"
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
                Register
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
    </>
  );
};

export default RegisterModal;
