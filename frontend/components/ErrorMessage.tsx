import { Typography } from "@mui/material";
import React from "react";

type Props = {
  txt: string | undefined;
};

const ErrorMessage = ({ txt }: Props) => {
  if (!txt) return null;

  return (
    <Typography variant="body2" alignSelf="start" color="#A0A0A0">
      ** {txt}
    </Typography>
  );
};

export default ErrorMessage;
