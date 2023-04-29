import { Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  txt: string | undefined;
};

const ErrorMessage = ({ txt }: Props) => {
  if (!txt) return null;

  return (
    <Typography
      display="flex"
      variant="body2"
      alignSelf="start"
      alignItems="center"
      color="#A0A0A0"
    >
      <CloseIcon color="error" /> {txt}
    </Typography>
  );
};

export default ErrorMessage;
