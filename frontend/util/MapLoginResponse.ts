import { JWT } from "next-auth/jwt";
export const mapLoginResponseToJWT = (response: any): JWT => {
  return {
    accessToken: response.accessToken.jwtToken,
    refreshToken: response.refreshToken.token,
    user: {
      username: response.accessToken.payload["cognito:username"],
      email: response.accessToken.payload.email,
    },
    accessTokenExpires: response.accessToken.payload.exp,
  };
};
