import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  export interface User {
    username: string;
    email: string;
  }
  export interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    user: User | undefined;
    accessTokenExpires: number | undefined;
  }
}
