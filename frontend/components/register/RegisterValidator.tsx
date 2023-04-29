import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9._]{8,20}$/,
      "Username must be between 8 and 20 characters."
    )
    .matches(
      /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
      "Username must not start or end with a period or an underscore, and cannot contain consecutive periods or underscores."
    ),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password must be at most 32 characters.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/\d/, "Password must contain at least one digit."),
    // .matches(
    //   /[@$!%*?&]/,
    //   "Password must contain at least one special character (@, $, !, %, *, ?, &)."
    // ),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), undefined],
      "Confirm password doesn't match password"
    )
    .required("Confirm Password is required"),
});

export type RegisterForm = Yup.InferType<typeof registerSchema>;
