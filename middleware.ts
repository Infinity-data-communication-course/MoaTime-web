import { NextRequest } from "next/server";
import getToken from "./lib/client/get-token";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sign-up": true,
};

export async function middleware(request: NextRequest) {
  const token = await getToken();
  const isPublic = publicOnlyUrls[request.nextUrl.pathname];
  console.log("token", token);
  console.log("isPublic", isPublic);

  // if (!token) {
  //   if (!isPublic) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // } else {
  //   if (isPublic) {
  //     return NextResponse.redirect(new URL("/board", request.url));
  //   }
  // }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
