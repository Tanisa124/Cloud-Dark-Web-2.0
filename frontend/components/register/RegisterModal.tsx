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
import { RegisterForm, registerSchema } from "./RegisterValidator";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosInstance } from "@/util/ApiUtil";
import toast from "react-hot-toast";
import { modalStyle } from "@/constant/formStyle";
import ErrorMessage from "../ErrorMessage";
import VerificationForm from "../verifyEmail/VerificationForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const RegisterModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterForm> = async (
    data: RegisterForm,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (event) event.preventDefault();

    setIsLoading(true);

    const { confirmPassword, ...rest } = data;

    try {
      const response = await AxiosInstance.post("/auth/register", {
        ...rest,
      }).then((response) => response);
      if (response.status === 201) {
        toast.success("Send verification code successfully!!!");
        setIsRegistered(true);
        setUsername(data.username);
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

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.username && <ErrorMessage txt={errors.username?.message} />}
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
          {errors.password && <ErrorMessage txt={errors.password?.message} />}

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
            <span>Register</span>
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
      </form>
    );
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={modalStyle}>
          {isRegistered && username !== "" ? (
            <div>
              <VerificationForm username={username} onClose={onClose} />
            </div>
          ) : (
            registerForm()
          )}
        </Box>
      </Modal>
    </>
  );
};

export default RegisterModal;
