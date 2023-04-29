import { AxiosInstance } from "@/util/ApiUtil";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await AxiosInstance.post("/auth/authenticate", {
            username: credentials?.username,
            password: credentials?.password,
          });
          return response.data as any;
        } catch (error) {
          console.log("error: ", error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user, account }) {
      if (user && account) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      if (token.user) {
        let payload = token.user.idToken.payload as any;
        session.user = {
          id: payload.sub,
          username: payload["cognito:username"],
          email: payload.email,
        };
        session.accessToken = token.user.accessToken.jwtToken;
        session.refreshToken = token.user.refreshToken.token;
      }
      return session;
    },
  },
});
