import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { auth } from "auth";

// 创建 i18n 中间件
const intlMiddleware = createMiddleware(routing);

// 创建一个组合中间件的函数
function stackMiddlewares(middlewares) {
  return async (req, evt) => {
    for (const middleware of middlewares) {
      const result = await middleware(req, evt);
      if (result !== NextResponse.next()) {
        return result;
      }
    }
    return NextResponse.next();
  };
}

// 组合 auth 和 intl 中间件
const middleware = stackMiddlewares([intlMiddleware, (req) => auth(req)]);

export default middleware;

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(zh|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
