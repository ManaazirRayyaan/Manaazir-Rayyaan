import { NextRequest, NextResponse } from "next/server";

const STUDIO_USERNAME = process.env.STUDIO_USERNAME!;
const STUDIO_PASSWORD = process.env.STUDIO_PASSWORD!;

export function middleware(request: NextRequest) {
  // Only protect /studio routes
  if (!request.nextUrl.pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const base64 = authHeader.split(" ")[1];
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");

    if (username === STUDIO_USERNAME && password === STUDIO_PASSWORD) {
      return NextResponse.next();
    }
  }

  // Prompt browser to show login dialog
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Studio Access"',
    },
  });
}

export const config = {
  matcher: ["/studio/:path*"],
};
