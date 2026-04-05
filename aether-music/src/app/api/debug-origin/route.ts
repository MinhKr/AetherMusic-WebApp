import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const info = {
    // Đây là thứ NextAuth dùng để build redirect_uri
    "nextUrl.origin": req.nextUrl.origin,
    "nextUrl.href": req.nextUrl.href,

    // Header gốc từ browser/proxy
    "headers.host": req.headers.get("host"),
    "headers.x-forwarded-host": req.headers.get("x-forwarded-host"),
    "headers.x-forwarded-proto": req.headers.get("x-forwarded-proto"),
    "headers.x-forwarded-for": req.headers.get("x-forwarded-for"),

    // URL raw
    url: req.url,

    // Dự đoán redirect_uri mà NextAuth sẽ gửi
    predicted_callback:
      req.nextUrl.origin + "/api/auth/callback/guest",
  };

  // In ra terminal để dễ đọc
  console.log("=== DEBUG ORIGIN ===");
  console.table(info);
  console.log("====================");

  return NextResponse.json(info, { status: 200 });
}
