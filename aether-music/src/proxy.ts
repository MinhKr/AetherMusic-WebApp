import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("localhost")) {
    const url = request.url.replace(/^http:\/\/localhost/, "http://127.0.0.1");
    return NextResponse.redirect(url, 308);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
