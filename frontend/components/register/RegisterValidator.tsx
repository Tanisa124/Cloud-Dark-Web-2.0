import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstname: Yup.string().min(2).max(32).required(),
  lastname: Yup.string().min(2).max(32).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(32).required(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), undefined]),
});

export type RegisterForm = Yup.InferType<typeof registerSchema>;