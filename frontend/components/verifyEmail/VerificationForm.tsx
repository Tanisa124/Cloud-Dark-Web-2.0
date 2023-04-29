import React, { FormEvent, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { AxiosInstance } from "@/util/ApiUtil";
import toast from "react-hot-toast";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

type Props = {
  username: string;
  onClose: () => void;
};

const VerificationForm = ({ username, onClose }: Props) => {
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOtpChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await AxiosInstance.post("/auth/confirm", {
        username: username,
        confirmationCode: otp,
      }).then((response) => response);
      if (response.status === 201) {
        toast.success("Register Successfully!!!");
        onClose();
      } else {
        toast.error("Verification Failed!!!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Verification Failed!!!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h3" gutterBottom textAlign="center" fontWeight="700">
        Verification
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        textAlign="center"
        fontWeight="400"
      >
        <Typography
          display="flex"
          alignItems="center"
          justifyContent="center"
          columnGap="10px"
        >
          {" "}
          Please check your email <MailOutlineIcon />
        </Typography>
        <p>
          {" "}
          {
            "We've sent an verification code to your email address. Please enter it below to"
          }{" "}
        </p>
      </Typography>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="15px"
        padding="25px"
        borderRadius="10px"
        maxWidth="550px"
        width="auto"
      >
        <MuiOtpInput value={otp} onChange={handleOtpChange} length={6} />
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
          <span>Verify</span>
        </Button>
      </Box>
    </form>
  );
};

export default VerificationForm;
