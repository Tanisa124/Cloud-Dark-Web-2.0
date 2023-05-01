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
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user.user;
        session.accessToken = token.user.accessToken;
        session.refreshToken = token.user.refreshToken;
        const res = await AxiosInstance.get(
          `/auth/${token.user.user.username}`
        );
        session.user.balance = res.data.balance;
      }
      console.log("session: ", session);
      return session;
    },
  },
});
