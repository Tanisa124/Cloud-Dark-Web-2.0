import { User } from "next-auth";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  user: User;
  balance: number;
  accessToken: string;
  refreshToken: string;
}

// export interface LoginResponse {
//   accessToken: any;
//   idToken: any;
//   refreshToken: any;
//   clockDrift: any;
// }
