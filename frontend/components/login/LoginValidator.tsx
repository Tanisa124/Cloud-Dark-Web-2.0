import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(32).required(),
});

export type LoginForm = Yup.InferType<typeof loginSchema>;
