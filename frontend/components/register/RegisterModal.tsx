import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterForm, registerSchema } from "./RegisterValidator";
import { yupResolver } from "@hookform/resolvers/yup";

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

  const onSubmit: SubmitHandler<RegisterForm> = (data: RegisterForm) => {
    setIsLoading(true);

    try {
      console.log(data);
      <Snackbar autoHideDuration={3000} message="Register Successfully!!!" />;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading ? (
        <FormControl onSubmit={handleSubmit(onSubmit)}>
          <Dialog open={isOpen}>
            <DialogTitle textAlign="center">
              <Typography variant="h3" gutterBottom>
                Register
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap="10px"
                // border="2px solid white"
                padding="25px"
                borderRadius="10px"
                width="500px"
              >
                <TextField
                  fullWidth
                  color="primary"
                  id="firstname"
                  label="Firstname"
                  variant="outlined"
                  required
                  {...register("firstname", { required: true })}
                  error={errors.firstname ? true : false}
                  sx={{
                    color: "white",
                  }}
                />
                <p>{errors.firstname?.message}</p>
                <TextField
                  fullWidth
                  id="lastname"
                  label="Lastname"
                  variant="outlined"
                  required
                  {...register("lastname", { required: true })}
                  error={errors.lastname ? true : false}
                />
                <p>{errors.lastname?.message}</p>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  required
                  {...register("email", { required: true })}
                  error={errors.email ? true : false}
                />
                <p>{errors.email?.message}</p>

                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  variant="outlined"
                  required
                  {...register("password", { required: true })}
                  error={errors.password ? true : false}
                />
                <p>{errors.password?.message}</p>

                <TextField
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  required
                  {...register("confirmPassword", { required: true })}
                  error={errors.confirmPassword ? true : false}
                />
                <p>{errors.confirmPassword?.message}</p>
              </Box>
            </DialogContent>
            <DialogActions>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained">Register</Button>
              </Box>
            </DialogActions>
          </Dialog>
        </FormControl>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default RegisterModal;
