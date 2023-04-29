import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "react-hot-toast";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session === null) {
    const url = request.nextUrl.clone();
    console.log("url: ", url);
    toast.error("You must be signed in to view this page");
    return NextResponse.redirect(url.origin);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/products"] };
