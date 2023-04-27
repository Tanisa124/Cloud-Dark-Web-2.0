import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(8).max(32).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), undefined],
      "Confirm password doesn't match password"
    )
    .required("Confirm Password is required"),
});

export type RegisterForm = Yup.InferType<typeof registerSchema>;
