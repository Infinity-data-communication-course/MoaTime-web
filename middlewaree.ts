// import { NextRequest, NextResponse } from "next/server";
// import getToken from "./lib/client/get-token";

// interface Routes {
//   [key: string]: boolean;
// }

// const publicOnlyUrls: Routes = {
//   "/": true,
//   "/login": true,
//   "/sign-up": true,
// };

// export async function middleware(request: NextRequest) {


//   const isPublic = publicOnlyUrls[request.nextUrl.pathname];

//   console.log("refreshToken!!", request.cookies.get("refreshToken")?.value);
//   console.log("pathname", request.nextUrl.pathname);
//   console.log("isPublic", isPublic);

//   if (request.cookies.get("refreshToken")?.value) {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`!,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "",
//         },
//         credentials: "include",
//       }
//     );
//     const token = await res.json();
//     console.log("토큰!!", token);

//     if (token && isPublic) {
//       console.log("token is valid. redirect to /board.");
//       return NextResponse.redirect(new URL("/board", request.url));
//     } else if (!(token || isPublic)) {
//       console.log("token is not valid. redirect to /login.");
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   } else {
//     if (!isPublic) {
//       console.log("No token. redirect to /login.");
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
